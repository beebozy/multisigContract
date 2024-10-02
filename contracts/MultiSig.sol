// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Multisig {
    uint8 public quorum;
    uint8 public noOfValidSigners;
    uint256 public txCount;
    uint8 public count;

    struct Transaction {
        uint256 id;
        uint256 amount;
        address sender;
        address recipient;
        bool isCompleted;
        uint256 timestamp;
        uint256 noOfApproval;
        address tokenAddress;
        address[] transactionSigners;
    }

    mapping(address => mapping(uint256 => bool)) public hasSigned; // signer -> transactionId -> bool (checking if an address has signed)
    mapping(address => bool) public isValidSigner;
    mapping(uint256 => Transaction) public transactions; // txId -> Transaction
    mapping(uint256 => mapping(address => bool)) public quorumApprovals; // txId -> signer -> bool

    uint256 public updateQuorumTxId;
    bool public quorumUpdatePending;

    constructor(uint8 _quorum, address[] memory _validSigners) {
        quorum = _quorum;

        for (uint256 i = 0; i < _validSigners.length; i++) {
            require(_validSigners[i] != address(0), "zero address not allowed");
            require(!isValidSigner[_validSigners[i]], "Can't sign twice");
            isValidSigner[_validSigners[i]] = true;
        }

        noOfValidSigners = uint8(_validSigners.length);

        if (!isValidSigner[msg.sender]) {
            isValidSigner[msg.sender] = true;
            noOfValidSigners += 1;
        }
    }

    function transfer(
        uint256 _amount,
        address _recipient,
        address _tokenAddress
    ) external {
        require(msg.sender != address(0), "address zero found");
        require(isValidSigner[msg.sender], "invalid signer");
        require(_amount > 0, "can't send zero amount");
        require(_recipient != address(0), "address zero found");
        require(_tokenAddress != address(0), "address zero found");
        require(
            IERC20(_tokenAddress).balanceOf(address(this)) >= _amount,
            "insufficient funds"
        );

        uint256 _txId = txCount + 1;
        Transaction storage trx = transactions[_txId];

        trx.id = _txId;
        trx.amount = _amount;
        trx.recipient = _recipient;
        trx.sender = msg.sender;
        trx.timestamp = block.timestamp;
        trx.tokenAddress = _tokenAddress;
        trx.noOfApproval += 1;
        trx.transactionSigners.push(msg.sender);
        hasSigned[msg.sender][_txId] = true;

        txCount += 1;
    }

    function approveTx(uint256 _txId) external {
        Transaction storage trx = transactions[_txId];
        require(trx.id != 0, "invalid tx id");
        require(
            IERC20(trx.tokenAddress).balanceOf(address(this)) >= trx.amount,
            "insufficient funds"
        );
        require(!trx.isCompleted, "transaction already completed");
        require(trx.noOfApproval < quorum, "approvals already reached");
        require(isValidSigner[msg.sender], "not a valid signer");
        require(!hasSigned[msg.sender][_txId], "can't sign twice");

        hasSigned[msg.sender][_txId] = true;
        trx.noOfApproval += 1;
        trx.transactionSigners.push(msg.sender);

        if (trx.noOfApproval == quorum) {
            trx.isCompleted = true;
            IERC20(trx.tokenAddress).transfer(trx.recipient, trx.amount);
        }
    }

    function proposeQuorumUpdate(uint8 _newQuorum) external {
        require(isValidSigner[msg.sender], "Not a valid signer");
        require(!quorumUpdatePending, "Quorum update already in progress");
        require(
            _newQuorum <= noOfValidSigners,
            "New quorum cannot be greater than the number of signers"
        );

        updateQuorumTxId++; // Use a new transaction ID for the quorum update
        quorumUpdatePending = true;
        quorumApprovals[updateQuorumTxId][msg.sender] = true;
        count = 1; // Initialize count of approvals for the quorum update
    }

    function approveQuorumUpdate() external {
        require(!quorumUpdatePending, "No quorum update in progress");
        require(isValidSigner[msg.sender], "Not a valid signer");
        require(
            !quorumApprovals[updateQuorumTxId][msg.sender],
            "Already approved"
        );

        quorumApprovals[updateQuorumTxId++][msg.sender] = true;
        count++;

        if (count == quorum) {
            quorum = uint8(updateQuorumTxId); // Update the quorum to the proposed value
            quorumUpdatePending = false; // Reset the quorum update state
        }
    }
}
