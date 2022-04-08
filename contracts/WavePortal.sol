// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] wavers;
    
    constructor() {
        console.log("Yoo I'm a smart contract");

    }

    function wave() public {
        totalWaves++;
        wavers.push(msg.sender);
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    function getTotalWavers() public  view returns (address[] memory) {
        return wavers;
    }
}