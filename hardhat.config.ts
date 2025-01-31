import { HardhatUserConfig } from "hardhat/config";
import { vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";




const SEPOLIA_PRIVATE_KEY = vars.get("SEPOLIA_PRIVATE_KEY")


const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    // for testnet
    //url: 'https://rpc.sepolia-api.lisk.com
    "lisk-sepolia": {
      url: "https://rpc.sepolia-api.lisk.com",
      accounts: [SEPOLIA_PRIVATE_KEY],
      gasPrice: 1000000000,
    },
  },
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "lisk-sepolia": "123",
    },
    customChains: [
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com/",
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};

//BEEBTokenModule#BEEBToken - 0x936a1A55175daADc15221912F6d192F2e65424Ed
//MultisigModule#Multisig - 0x8182393eEa85469356d83cC6F755984a255D0a4A

export default config;
