# ReviewChain
ReviewChain is a decentralized platform for the transparent management of reviews and certified authorities.
It is built using Solidity smart contracts, with deployment and interaction scripts written in Node.js, and performance testing powered by Truffle.

## Funzionalità principali
- Actor management via ActorRegistry.sol
- Certified authority management with CertifiedAuthority.sol
- Review creation and support handled by ReviewManager.sol and SupportReviewManager.sol
- Voucher and token issuance for discounts/proof-of-purchase using VoucherManager.sol and TokenManager.sol
- JavaScript scripts to compile, deploy, and interact with the smart contracts


## 📁 Struttura della cartella

```
ReviewChain/
│
├── .git/                         # Git version control folder
├── .gitattributes                # Git configuration
├── package.json                  # Node.js dependencies
├── package-lock.json             # NPM lockfile
├── README.md                     # Project documentation
├── ERRORCODES.md                 # Error codes used by smart contracts
│
├── ActorRegistry.sol             # Smart contract for actor registry
├── CertifiedAuthority.sol        # Certified authority logic
├── ReviewManager.sol             # Core review management logic
├── SupportReviewManager.sol      # Additional support for reviews
├── VoucherManager.sol            # Discount voucher logic
├── TokenManager.sol              # Token/proof-of-purchase management
│
├── compile.js                    # Contract compilation script
├── deploy.js                     # Deployment script
├── interact.js                   # Interaction script
│
└── PerformanceTest/              # Performance testing suite
    │
    ├── Comandi e casi d'uso.txt       # Manual with usage commands and test cases
    ├── truffle-config.js              # Truffle network configuration
    │
    ├── build/contracts/               # Compiled contract ABIs (JSON)
    │   ├── ActorRegistry.json
    │   ├── CertifiedAuthority.json
    │   ├── ReviewManager.json
    │   ├── SupportReviewManager.json
    │   ├── VoucherManager.json
    │   ├── TokenManager.json
    │
    ├── contracts/                     # Solidity contracts used for testing
    │   ├── ActorRegistry.sol
    │   ├── CertifiedAuthority.sol
    │   ├── ReviewManager.sol 
    │   ├── SupportReviewManager.sol    
    │   ├── VoucherManager.sol
    │   ├── TokenManager.sol  
    │
    ├── migrations/                           
    │   └── 1_deploy_contracts.js      # Truffle simplified deployment script
    │
    └── scripts/
        └── Test.js                    # Stress/functional testing script
```



## ERROR CODES
- **ERR01** – Invalid VAT number
- **ERR02** – Unauthorized sender of the transaction
- **ERR03** – Restaurant not verified
- **ERR04** – Only the owner can call this function
- **ERR05** – Token counter is zero (cannot decrement)
- **ERR06** – Insufficient amount
- **ERR07** – Voucher not owned by caller
- **ERR08** – Voucher linked to the wrong restaurant
- **ERR09** – Voucher already used
- **ERR10** – Review does not exist
- **ERR11** – Only the review author can modify/delete it
- **ERR12** – Time limit exceeded to edit the review
- **ERR14** – Only authorized ReviewManager

### Authors
This project was developed by Elena Falcone, Giuseppe Biscardi, and Luca Donnarumma
as part of the Blockchain 2024/25 course at the University of Salerno.
