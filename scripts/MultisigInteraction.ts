import hre, { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

async function main() {
    // Address declarations
    const ownerAddress = "0x99c1F432D8E297CB6d85c7441BD7BCb924175B03";
    const account1Address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const account2Address = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const account3Address = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
    
    const addressArray = [account1Address, account2Address, account3Address, ownerAddress];
    
    // Deployed contract addresses
    const tokenAddress = "0x936a1A55175daADc15221912F6d192F2e65424Ed";
    const contractAddress = "0x8182393eEa85469356d83cC6F755984a255D0a4A";
    
    // Connect to deployed contracts
    const token = await hre.ethers.getContractAt("BEEBToken", tokenAddress);
    const multiSigInteraction = await hre.ethers.getContractAt("Multisig", contractAddress);

    // Get signers
    const [owner, account1, account2] = await hre.ethers.getSigners();
   // const deployMultisig= await multiSigInteraction.deploy()
    // Define transfer amount
    const trfAmount = await hre.ethers.parseUnits("1000", 18);

    // Interact with the contract (likely a transfer call)
    await token.transfer(contractAddress, trfAmount);
multiSigInteraction.connect(owner).transfer(trfAmount,account1,tokenAddress);

const ownerBalance=token.balanceOf(owner);

console.log("Contract balance after :::", ownerBalance);

    console.log(`Transferred ${trfAmount} tokens to ${contractAddress}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
