// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PermissionManager is Ownable {
    struct Permission {
        address agent;
        uint256 maxAmount;
        uint256 expiresAt;
        bool active;
    }

    mapping(address => mapping(bytes32 => Permission)) public permissions;

    event PermissionGranted(address indexed user, address indexed agent, bytes32 permissionId, uint256 maxAmount, uint256 expiresAt);
    event PermissionRevoked(address indexed user, bytes32 permissionId);

    constructor() Ownable(msg.sender) {}

    function grantPermission(
        address agent,
        uint256 maxAmount,
        uint256 duration
    ) external returns (bytes32 permissionId) {
        permissionId = keccak256(abi.encode(msg.sender, agent, block.timestamp, maxAmount));
        
        permissions[msg.sender][permissionId] = Permission({
            agent: agent,
            maxAmount: maxAmount,
            expiresAt: block.timestamp + duration,
            active: true
        });

        emit PermissionGranted(msg.sender, agent, permissionId, maxAmount, block.timestamp + duration);
    }

    function revokePermission(bytes32 permissionId) external {
        require(permissions[msg.sender][permissionId].active, "Not active");
        permissions[msg.sender][permissionId].active = false;
        emit PermissionRevoked(msg.sender, permissionId);
    }

    function isValidPermission(
        address user,
        address agent,
        bytes32 permissionId,
        uint256 amount
    ) external view returns (bool) {
        Permission memory p = permissions[user][permissionId];
        return (
            p.active &&
            p.agent == agent &&
            p.expiresAt > block.timestamp &&
            amount <= p.maxAmount
        );
    }
}
