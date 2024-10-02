// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./MultiSig.sol";

contract MultisigFactory{

Multisig[] multisig;

    function createMutisig(uint _quorum, address[] memory _validSigners)external{
       Multisig newMultisig = new Multisig(_quorum,_validSigners);
       multisig.push(newMultisig);
    }

    function returnMultisig(uint _index) returns(Multisig){
        
    }
}
