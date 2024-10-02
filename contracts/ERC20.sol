// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BEEBToken is ERC20("BEEBToken", "BTK")  {
    address public owner;

    constructor() {
        owner = msg.sender;  // Set the contract deployer as the owner

        // Mint 10,000 tokens with 18 decimals to the owner
        _mint(msg.sender, 10000000 * 10 ** decimals());
    }
}

// contract address 0xcD6a42782d230D7c13A74ddec5dD140e55499Df9;