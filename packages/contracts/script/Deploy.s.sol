// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {PermissionManager} from "../src/PermissionManager.sol";
import {StrategyVault} from "../src/StrategyVault.sol";
import {VayuRouter} from "../src/VayuRouter.sol";

contract DeployVayu is Script {
    // Arc Testnet USDC
    address constant ARC_USDC = 0x3600000000000000000000000000000000000000;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        PermissionManager permissionManager = new PermissionManager();
        VayuRouter router = new VayuRouter(ARC_USDC);
        StrategyVault vault = new StrategyVault(ARC_USDC, address(permissionManager));

        console.log("PermissionManager deployed at:", address(permissionManager));
        console.log("VayuRouter deployed at:", address(router));
        console.log("StrategyVault deployed at:", address(vault));

        vm.stopBroadcast();
    }
}
