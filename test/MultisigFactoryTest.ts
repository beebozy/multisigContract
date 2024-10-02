import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Testthe factory multisig contract", () => {

    async function deployContract() {

        const [owner, account1, account2, account3, account4] = await ethers.getSigners();

        const multiSifFactory = await ethers.getContractFactory("MultisigFactory");

        const deployedContract = await multiSifFactory.deploy();

        return {deployedContract, owner, account1, account2, account3, account4}
    }

    describe("Try to intract with the multisig contract", () => {

        it("Should be able to createa new multisig contract", async () => {
            const { deployedContract, owner, account1, account2, account3, account4 } = await loadFixture(deployContract);

            await deployedContract.createMultisigContract(3, [account1, account2, account3, account4]);

            const newContract = await deployedContract.getMultisigAddress(0);

            console.log(newContract);

            expect(newContract).to.be(owner.address);
        });

    });

});