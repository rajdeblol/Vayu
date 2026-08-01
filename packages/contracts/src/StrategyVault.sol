// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {PermissionManager} from "./PermissionManager.sol";

/**
 * @title StrategyVault
 * @notice Users deposit funds. Aku can execute strategies only within the guardrails
 *         and permissions granted by the user.
 */
contract StrategyVault is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    struct Strategy {
        address owner;
        address targetToken;
        uint256 totalDeposited;
        uint256 maxSlippageBps;     // 50 = 0.5%
        uint256 maxPositionSize;
        bool active;
    }

    IERC20 public immutable usdc;
    PermissionManager public permissionManager;

    mapping(uint256 => Strategy) public strategies;
    mapping(address => uint256[]) public userStrategies;
    uint256 public nextStrategyId = 1;

    bool public paused;

    event StrategyCreated(uint256 indexed id, address indexed owner, address targetToken);
    event Deposited(uint256 indexed strategyId, address indexed user, uint256 amount);
    event StrategyExecuted(uint256 indexed strategyId, address indexed executor, uint256 amountIn, uint256 amountOut);
    event StrategyClosed(uint256 indexed strategyId);

    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }

    constructor(address _usdc, address _permissionManager) Ownable(msg.sender) {
        usdc = IERC20(_usdc);
        permissionManager = PermissionManager(_permissionManager);
    }

    function setPaused(bool _paused) external onlyOwner {
        paused = _paused;
    }

    function createStrategy(
        address targetToken,
        uint256 maxSlippageBps,
        uint256 maxPositionSize
    ) external returns (uint256 strategyId) {
        strategyId = nextStrategyId++;
        
        strategies[strategyId] = Strategy({
            owner: msg.sender,
            targetToken: targetToken,
            totalDeposited: 0,
            maxSlippageBps: maxSlippageBps,
            maxPositionSize: maxPositionSize,
            active: true
        });

        userStrategies[msg.sender].push(strategyId);
        emit StrategyCreated(strategyId, msg.sender, targetToken);
    }

    function deposit(uint256 strategyId, uint256 amount) external nonReentrant whenNotPaused {
        Strategy storage s = strategies[strategyId];
        require(s.active, "Strategy not active");
        require(s.owner == msg.sender, "Not owner");

        usdc.safeTransferFrom(msg.sender, address(this), amount);
        s.totalDeposited += amount;

        emit Deposited(strategyId, msg.sender, amount);
    }

    function executeStrategy(
        uint256 strategyId,
        bytes32 permissionId,
        uint256 amountIn,
        address target,
        bytes calldata data
    ) external nonReentrant whenNotPaused {
        Strategy storage s = strategies[strategyId];
        require(s.active, "Inactive");
        require(amountIn <= s.maxPositionSize, "Exceeds max position");
        require(
            permissionManager.isValidPermission(s.owner, msg.sender, permissionId, amountIn),
            "Invalid permission"
        );

        // Placeholder for real execution logic
        emit StrategyExecuted(strategyId, msg.sender, amountIn, 0);
    }

    function closeStrategy(uint256 strategyId) external {
        Strategy storage s = strategies[strategyId];
        require(s.owner == msg.sender, "Not owner");
        s.active = false;
        emit StrategyClosed(strategyId);
    }
}
