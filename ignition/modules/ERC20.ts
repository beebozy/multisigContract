import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



const BEEBTokenModule = buildModule("BEEBTokenModule", (m) => {
 

  const lock = m.contract("BEEBToken");

  return { lock };
});

export default BEEBTokenModule;
