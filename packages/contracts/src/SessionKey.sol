// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SessionKey
 * @notice Allows users to grant limited, time-bound permissions to Aku (the agent)
 */
contract SessionKey is Ownable {
    struct Permission {
        address agent;          // Aku's address or contract
        uint256 expiresAt;
        uint256 maxValuePerTx;
        bool active;
    }

    mapping(address => Permission) public permissions;

    event PermissionGranted(address indexed user, address indexed agent, uint256 expiresAt, uint256 maxValue);
    event PermissionRevoked(address indexed user);

    constructor() Ownable(msg.sender) {}

    function grantPermission(
        address agent,
        uint256 durationSeconds,
        uint256 maxValuePerTx
    ) external {
        permissions[msg.sender] = Permission({
            agent: agent,
            expiresAt: block.timestamp + durationSeconds,
            maxValuePerTx: maxValuePerTx,
            active: true
        });

        emit PermissionGranted(msg.sender, agent, block.timestamp + durationSeconds, maxValuePerTx);
    }

    function revokePermission() external {
        permissions[msg.sender].active = false;
        emit PermissionRevoked(msg.sender);
    }

    function isPermissionValid(address user) external view returns (bool) {
        Permission memory p = permissions[user];
        return p.active && block.timestamp < p.expiresAt;
    }
}
