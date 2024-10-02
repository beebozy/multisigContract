import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const address1= "";
const address2="0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC";
const address3= "0x90F79bf6EB2c4f870365E785982E1f101E93b906";
const quorum=2;
const MultisigkModule = buildModule("MultisigModule", (m) => {
  
  const lock = m.contract("Multisig",[quorum,[address1, address2, address3]]);

  return { lock };
});

export default MultisigkModule;

// contract address 0x8182393eEa85469356d83cC6F755984a255D0a4A
// verify contract  - https://sepolia-blockscout.lisk.com//address/0x8182393eEa85469356d83cC6F755984a255D0a4A#code
// 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
//0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d

// 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC (10000 ETH)
//0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a

// 0x90F79bf6EB2c4f870365E785982E1f101E93b906 (10000 ETH)
// 0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6