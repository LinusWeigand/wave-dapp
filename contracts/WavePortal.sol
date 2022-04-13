// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    address[] wavers;
    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;
    
    constructor() payable {
        console.log("I'm a smart contract. POGCHAMP");

        seed = (block.timestamp + block.difficulty) % 100;

        console.log("Random # generated: ", seed);
    }

    function wave(string memory _message) public {
        ++totalWaves;
        wavers.push(msg.sender);
        console.log("%s waved w/ message &s", msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        emit NewWave(msg.sender, block.timestamp, _message);

        if (seed <= 50) {
            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
                );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");   
        }
         
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }

    function getTotalWavers() public  view returns (address[] memory) {
        console.log("All wavers:");
        for(uint i = 0; i < wavers.length; i++) {
            console.log(wavers[i]);
        }
        return wavers;
    }
}