import hre, { ethers } from "hardhat";

async function main() {
  // Define the deployed contract addresses
  const tokenAddress = "0x936a1A55175daADc15221912F6d192F2e65424Ed"; // Replace with your actual ERC20 token address
  const multiSigAddress = "0x8182393eEa85469356d83cC6F755984a255D0a4A"; // Replace with your actual Multisig contract address

  // Define the accounts/signers
  const [owner, account1, account2, account3] = await ethers.getSigners();

  // Interact with the deployed ERC20 token contract
  const token = await ethers.getContractAt("BEEBToken", tokenAddress);

  // Interact with the deployed Multisig contract
  const multiSig = await ethers.getContractAt("Multisig", multiSigAddress);

  // Transfer tokens to Multisig contract
  const transferAmount = ethers.parseUnits("1000", 18);
  await token.connect(owner).transfer(multiSigAddress, transferAmount);
  console.log(`Transferred ${transferAmount} tokens to Multisig contract`);

  // Propose a transfer from Multisig contract
  const recipient = account1.address; // Address to receive tokens
  const amount = ethers.parseUnits("100", 18);

  await multiSig.connect(owner).transfer(amount, recipient, tokenAddress);
  console.log(`Proposed transfer of ${amount} tokens to ${recipient}`);

  // Approve the transfer
  await multiSig.connect(account2).approveTx(1); // Assuming this is the first transaction (ID = 1)
  console.log(`Approved transfer by account2`);

  // Check the transaction status
  const transaction = await multiSig.transactions(1);
  console.log(`Transaction status: Completed = ${transaction.isCompleted}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
