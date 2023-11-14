```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title TransactionContract
 * @dev Handles the transactions for Elysium OS, including payments and transfers.
 */
contract TransactionContract {
    address public owner;

    event PaymentReceived(address indexed sender, uint256 amount, string transactionDetails);
    event PaymentSent(address indexed recipient, uint256 amount, string transactionDetails);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    /**
     * @dev Receives a payment to the contract.
     * @param details Descriptive details about the transaction.
     */
    function receivePayment(string memory details) external payable {
        require(msg.value > 0, "Payment must be greater than 0.");
        emit PaymentReceived(msg.sender, msg.value, details);
    }

    /**
     * @dev Sends a payment from the contract to a recipient.
     * @param recipient The address to send the payment to.
     * @param amount The amount of wei to send.
     * @param details Descriptive details about the transaction.
     */
    function sendPayment(address payable recipient, uint256 amount, string memory details) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance in contract.");
        recipient.transfer(amount);
        emit PaymentSent(recipient, amount, details);
    }

    /**
     * @dev Retrieves the contract's current balance.
     * @return The balance of the contract.
     */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Allows the owner to withdraw funds from the contract.
     * @param amount The amount of wei to withdraw.
     */
    function withdraw(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance in contract.");
        payable(owner).transfer(amount);
    }
}
```