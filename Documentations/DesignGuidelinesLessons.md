# Stop Loss, Lockout, Multi-party Consensus
## Stop Loss
* You want to stop a serious bug from causing you to lose money.
* Stop Loss mechanism, is having a flag operational which is called before all the functions that change state.

## Lockout Bug
* A bug the pushes the contract into a state that renders it non operational and you don't have any mean to return to the operational state.
* You wanna make sure that you test for lock outs.

## Multi-party Consensus
* There are some accounts which have multiple private keys.
* These accounts are described as M-of-N accounts.
    * N is the number of private keys avaialable for that particular account.
    * M is the number of the required keys for transaction.
    ### Benefits
    * Prevents theft of funds since the transaction requires multiple keys.
    * Protects against the loss of individual's private key.
    * Enforces business rules for financial transactions.
    ### Consensus Algorithm
    * It is not an inherent feature in Ethereum, so you have to implement it yourself.
    * First define M, then define N through a set of permitted addresses.
    * Initialize a counter of M, then increment it on each function call.


# Receive Transfer & Send Funds

## Ether Payment Fundamentals
* The "payable" keyword enables a function to receive funds.
* "msg.value" indicates the amount of funds received in wei.
* A fallback function is a generic way to receive funds in a contract.
    * Fallback functions have no name (only one per contract).
    * Funds sent from a contract to a fallback function in another contract have a low gas stipend of 2300

    ### Transferring Funds
    * Funds received by a contract stay in the contract account.
    * If received funds are not transferred to an External Owned Account (EOA) with a private key, or used by contract functions, they are trapped forever in the contract account (which has no private key)
    * "address.transfer()" is a safe way to send funds within a contract to an external EOA. (throws error on failure; gas stipend 2300)
    * "ddress.send()" is SOMEWHAT safe.
    * "address.call.value()" is unsafe (can use all available gas)

    ### Sending Funds
    * Possible frozen funds scenarios from sending funds in a loop due to gas limits.
    * It is recommended to us "pull," not "push" for sending funds.
        * Credit the recepient account.
        * When the recepient account owner wishes to draw funds, he/she calls a custom function within the contract to witdraw the funds.
        * Don't use tx.origin, always use msg.sender.
    * Contract accounts cannot send funds because they don't have a private key.


## SafeMath Library
* The isntructor recommends using SafeMath library with all your contracts.
* It handles the big number operations which can affect the balances due to overflow issues. 

## Payment Protection Patterns
* There are 3 different patterns to protect financial interactions:
    * Checks - Effects - Interaction
    * Rate Limiting
    * Re-enterancy Guard

### Checks - Effects - Interaction
* Check if all conditions are met and arguments passed are in range.
* Change state variables. (Depit, Credit, and any other operation that affects the state.)
* Interact with other contracts or accounts. (Transfer to other accounts or contracts)
Example:
```
require(balance[msg.sender] > 0);
uint256 prev = balance[msg.sender];
balance[msg.sender] = 0;
msg.sender.transfer(prev);
```

### Rate Limiting
* This is known concept in web application development in order to ensure that a surge of users doesn't take down an application.
* FUNC: controls the frequency at which a contract operation (such as a function call) can occur to minimize loss such as RAPID DRAINAGE OF FUNDS.
* Best implemented as a function modifier that accepts a time parameter (so it can be used in multiple scenarios)
* The time parameter will be the delay you want to enforce between calls of your function.
* Pattern:
    1) Initialize "enabled" variable to current time
    2) Require time of call in modifier to be greater than "enabled"
    3) Increment "enable" by time parameter in modifier
    4) Use modifier in all rate limiting functions.
    
    Example:
    ```
    using SafeMath for uint256;
    uint256 private enabled = block.timestamp;
    modifier rateLimit(uint256 time){
        // Checking that the current time call 
        require(block.timestamp >= enabled, "Rate limiting in effect");
        // Incrementing the time so that the comparison starts from the current time
        // in the next call.
        enabled = enabled.add(time);
        _;
    }
    function safeWithdraw(uint256 amount) external rateLimit(30 minutes){
        // Withdraw Code.
    }
    ```

### Re-enterancy Guard
* Prevents a contract function from calling itself multiple times in a single transaction.
* Protects against re-entrancy attacks (Like the DAO Attack)
* Best implemented as a function modifier.
* Pattern:
    * Initialize guard "counter".
    * Increment "counter" inside modifier.
    * Set local variable to value of "counter".
    * Call function (using _placeholder)
    * Require that local variable has the same value as counter.
    
    Example:
    ```
    using SafeMath for uint256;
    uint256 private counter = 1;
    modifier enterancyGuard() {
        counter = counter.add(1);
        uint256 guard = counter;
        _;
        require(guard == counter, "Re-enterancy is not allowed");
    }
    ```

## Securing Smart Contracts (Security Best Practices)
We are going to review security 10 best practices. They are generaly accepted good practices for smart contracts.

1) Keep functions "private" or "internal" unless they are needed outside your contract.

2) Debit before credit to minimize the risk of reentrancy attacks. Deduct before add to reduce the risk of reenterancy attacks.

3) Another contract may use "delegatecall()" to call your contract function. Be aware of this and code defensively.

4) For time-sensitive operations, keep in mind that "now" is a synonym for "block.timestamp" and CAN be manipulated by miners. So you shouldn't use it in scenarios that depend on time to move funds around without making sure that you have checked all other conditions. Time also shouldn't be used for random number generation.

5) Prefix all calls to external contracts with "Untrusted". So you should be defensive against.

6) On-chain data is always public. Do not store any sensitive information. And take care, even private variables can be seen by humans.

7) Do not make state changes in function modifiers. Use them only for assertions.

8) Keep fallback functions short and require msg.data.length equals zero. A malicious user might try to manipulate your state trying to use some malicious data. (Parity wallet attack)

9) Explicityly mark visibility of functions and state variables.

10) Always ask yourself this question: "Does it really need to be on-chain?" Block chain is not a database that is intended for fast access. It is a slow database and it is expensive to store database on there.


# Side Tricks
* require(msg.sender == tx.origin) This ensures that the function can be only called by an EOA and CA since in CA calls, msg.sender & tx.origin are different.