# Upgradable Contracts
In this topic we are going to discuss the following:
    1) Upgrade Scenarios
    2) Solutions
    3) Separate Data & App Logic
    4) Security Between Contracts

## Why Smart Contracts Need To Be Upgraded

* If blockchain is immutable, why do we even need to have this possibility?
* Upgrade Scenarios:
    1) A bug is discovered in the contract code.
    2) Business rules change all the time which require the contract code to be updated.
    3) Contract admin't private key was lost or compromised introducing the risk of financial loss or privacy getting compromised.
    4) Gas prices have increased and code needs to be optimized to lower contract execution costs.

## Possible Solutions Available

1) Separate contract data and application logic into separate contracts so app contract can be upgraded when necessary.
    * This works well for changing the application logic.
    * Does not work if data structures need to be changed.

2) Migrate contract to a new contract using a client application.
    * Requires moving potentially very large data stores.

3) Separate contract data and application logic into separate contracts along with a  dispatcher proxy contract.
    * Complex to implrement and may introduce vulnerabilities.

4) Separate contract data and application logic into separate contracts and use key/value pairs for data.
    * It essentially relegates your entire data storage contract to a key value pair storage.
    * Application logic cannot benefit from semantic data structures.
    * Data store works for a wide range of scenarios.

## Separate Data And Logic

* The communication between both of them are unidirection. Data Contract should NEVER call the App Contract.

* In the the data contract you will need to have an autoriziation mechanism to allow sub contract to register themselves and make sure they are autorized to make the change to the state.
```
authorizeContract(address)
deauthorizeContract(address)
isCallerAuthorized() // modifier
```

* ExerciseC6C exerciseC6C = ExerciseC6C(dataContractAddress); // This is who you refer to another contract