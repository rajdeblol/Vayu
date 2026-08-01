// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract VayuRouter is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    address public immutable USDC;

    event SwapExecuted(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut
    );

    constructor(address _usdc) Ownable(msg.sender) {
        USDC = _usdc;
    }

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address tokenIn,
        address tokenOut,
        address to
    ) external nonReentrant returns (uint256 amountOut) {
        require(amountIn > 0, "Zero amount");
        require(to != address(0), "Invalid recipient");

        IERC20(tokenIn).safeTransferFrom(msg.sender, address(this), amountIn);

        // Placeholder logic (1:1 for testing)
        amountOut = amountIn;
        require(amountOut >= amountOutMin, "Insufficient output");

        IERC20(tokenOut).safeTransfer(to, amountOut);

        emit SwapExecuted(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
    }

    function rescueTokens(address token, uint256 amount) external onlyOwner {
        IERC20(token).safeTransfer(owner(), amount);
    }
}
