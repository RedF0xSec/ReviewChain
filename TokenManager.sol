// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ActorRegistry.sol";
import "./VoucherManager.sol";

contract TokenManager {
    // Mapping: Utente (user) address => Ristorante (restaurant) address => token counter
    mapping(address => mapping(address => uint256)) private Tokens;

    ActorRegistry public actorRegistry;
    VoucherManager public voucherManager;

    constructor(address _actorRegistry, address _voucherManager) {
        actorRegistry = ActorRegistry(_actorRegistry);
        voucherManager = VoucherManager(_voucherManager);
    }

    // Modifiers
    modifier onlySender(address sender) {
        require(msg.sender == sender, "Solo il sender puo eseguire questa operazione");
       _;
    }

    // Deve incrementare il contatore dei token per l'utente verso il ristorante
    function incrementTokenCounter(address Uaddress, address Raddress) private {
        
    }

    // Deve decrementare il contatore dei token per l'utente verso il ristorante
    function decrementTokenCounter(address Uaddress, address Raddress) private {
        
    }

    // Funzione per effettuare il pagamento (con sconto)
    // ammount: prezzo da pagare
    function pay(address receiver,uint256 ammount, Voucher memory discount) external payable onlySender(msg.sender) {
        
    // 1. Verifica del possesso dell’address dell’utente. (questo solidity lo fa il automatico)
    // Quando chiami una funzione di uno smart contract, il tuo wallet firma digitalmente la transazione con la tua chiave privata. Questa firma è controllata da tutti i nodi Ethereum. Solo se è valida, la transazione viene eseguita.
    // 2. Verifica l’identità del ristorante

    // 3. Verifica l’NFT (controlla che l'utente corrisponda all'owner e che il ristorante sia lo stesso di quello a cui si sta facendo il pagamento) e applicalo al prezzo da pagare

    // 4. Verifica il saldo (vedi msg.value)

    // 5. Effettua il pagamento (vedi payable().transfer)

    // 6. Rilascia il token
    
    }
}
