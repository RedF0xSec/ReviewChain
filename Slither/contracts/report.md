**THIS CHECKLIST IS NOT COMPLETE**. Use `--show-ignored-findings` to show all the results.
Summary
 - [solc-version](#solc-version) (6 results) (Informational)
 - [immutable-states](#immutable-states) (31 results) (Optimization)
 - [reentrancy-no-eth](#reentrancy-no-eth) (1 results) (Medium)
 - [shadowing-local](#shadowing-local) (2 results) (Low)
 - [events-access](#events-access) (6 results) (Low)
 - [missing-zero-check](#missing-zero-check) (13 results) (Low)
 - [reentrancy-benign](#reentrancy-benign) (1 results) (Low)
 - [reentrancy-events](#reentrancy-events) (3 results) (Low)
 - [timestamp](#timestamp) (2 results) (Low)
 - [naming-convention](#naming-convention) (66 results) (Informational)
 - [reentrancy-unlimited-gas](#reentrancy-unlimited-gas) (3 results) (Informational)
 - [too-many-digits](#too-many-digits) (2 results) (Informational)
 - [constable-states](#constable-states) (9 results) (Optimization)
 
## solc-version
Impact: Informational
Confidence: High
 - [ ] ID-0
Version constraint ^0.8.0 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching.
It is used by:
	- [^0.8.0](ActorRegistry.sol#L2)
	- [^0.8.0](CertifiedAuthority.sol#L2)

ActorRegistry.sol#L2


 - [ ] ID-1
Version constraint ^0.8.0 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching.
It is used by:
	- [^0.8.0](CertifiedAuthority.sol#L2)

CertifiedAuthority.sol#L2


 - [ ] ID-2
Version constraint ^0.8.0 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching.
It is used by:
	- [^0.8.0](ActorRegistry.sol#L2)
	- [^0.8.0](CertifiedAuthority.sol#L2)
	- [^0.8.0](ReviewManager.sol#L2)
	- [^0.8.0](SupportReviewManager.sol#L2)
	- [^0.8.0](TokenManager.sol#L2)
	- [^0.8.0](VoucherManager.sol#L2)

ActorRegistry.sol#L2


 - [ ] ID-3
Version constraint ^0.8.0 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching.
It is used by:
	- [^0.8.0](ActorRegistry.sol#L2)
	- [^0.8.0](CertifiedAuthority.sol#L2)
	- [^0.8.0](SupportReviewManager.sol#L2)
	- [^0.8.0](TokenManager.sol#L2)
	- [^0.8.0](VoucherManager.sol#L2)

ActorRegistry.sol#L2


 - [ ] ID-4
Version constraint ^0.8.0 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching.
It is used by:
	- [^0.8.0](ActorRegistry.sol#L2)
	- [^0.8.0](CertifiedAuthority.sol#L2)
	- [^0.8.0](TokenManager.sol#L2)
	- [^0.8.0](VoucherManager.sol#L2)

ActorRegistry.sol#L2


 - [ ] ID-5
Version constraint ^0.8.0 contains known severe issues (https://solidity.readthedocs.io/en/latest/bugs.html)
	- FullInlinerNonExpressionSplitArgumentEvaluationOrder
	- MissingSideEffectsOnSelectorAccess
	- AbiReencodingHeadOverflowWithStaticArrayCleanup
	- DirtyBytesArrayToStorage
	- DataLocationChangeInInternalOverride
	- NestedCalldataArrayAbiReencodingSizeValidation
	- SignedImmutables
	- ABIDecodeTwoDimensionalArrayMemory
	- KeccakCaching.
It is used by:
	- [^0.8.0](ActorRegistry.sol#L2)
	- [^0.8.0](CertifiedAuthority.sol#L2)
	- [^0.8.0](VoucherManager.sol#L2)

ActorRegistry.sol#L2

Remedation: aggiornare la versione di solc


## immutable-states
Impact: Optimization
Confidence: High
 - [ ] ID-6
[ActorRegistry.certifiedAuthority](ActorRegistry.sol#L7) should be immutable  #ok

ActorRegistry.sol#L7


 - [ ] ID-7
[SupportReviewManager.voucherManager](SupportReviewManager.sol#L12) should be immutable #ok

SupportReviewManager.sol#L12


 - [ ] ID-8
[VoucherManager.owner](VoucherManager.sol#L21) should be immutable 

VoucherManager.sol#L21


 - [ ] ID-9
[TokenManager.actorRegistry](TokenManager.sol#L12) should be immutable #ok

TokenManager.sol#L12


 - [ ] ID-10
[VoucherManager.actorRegistry](VoucherManager.sol#L18) should be immutable  #ok

VoucherManager.sol#L18


 - [ ] ID-11
[TokenManager.owner](TokenManager.sol#L15) should be immutable 

TokenManager.sol#L15


 - [ ] ID-12
[ReviewManager.supportReviewManager](ReviewManager.sol#L22) should be immutable #ok

ReviewManager.sol#L22


 - [ ] ID-13
[SupportReviewManager.tokenManager](SupportReviewManager.sol#L13) should be immutable #ok

SupportReviewManager.sol#L13


 - [ ] ID-14
[ActorRegistry.certifiedAuthority](ActorRegistry.sol#L7) should be immutable #ok

ActorRegistry.sol#L7


 - [ ] ID-15
[SupportReviewManager.owner](SupportReviewManager.sol#L9) should be immutable 

SupportReviewManager.sol#L9


 - [ ] ID-16
[SupportReviewManager.actorRegistry](SupportReviewManager.sol#L11) should be immutable 

SupportReviewManager.sol#L11


 - [ ] ID-17
[TokenManager.voucherManager](TokenManager.sol#L13) should be immutable #ok

TokenManager.sol#L13


 - [ ] ID-18
[SupportReviewManager.voucherManager](SupportReviewManager.sol#L12) should be immutable #ok

SupportReviewManager.sol#L12


 - [ ] ID-19
[VoucherManager.owner](VoucherManager.sol#L21) should be immutable #ok

VoucherManager.sol#L21


 - [ ] ID-20
[TokenManager.actorRegistry](TokenManager.sol#L12) should be immutable #ok

TokenManager.sol#L12


 - [ ] ID-21
[VoucherManager.actorRegistry](VoucherManager.sol#L18) should be immutable #ok

VoucherManager.sol#L18


 - [ ] ID-22
[TokenManager.owner](TokenManager.sol#L15) should be immutable #ok

TokenManager.sol#L15


 - [ ] ID-23
[SupportReviewManager.tokenManager](SupportReviewManager.sol#L13) should be immutable #ok

SupportReviewManager.sol#L13


 - [ ] ID-24
[ActorRegistry.certifiedAuthority](ActorRegistry.sol#L7) should be immutable #ok

ActorRegistry.sol#L7


 - [ ] ID-25
[SupportReviewManager.owner](SupportReviewManager.sol#L9) should be immutable #ok

SupportReviewManager.sol#L9


 - [ ] ID-26
[SupportReviewManager.actorRegistry](SupportReviewManager.sol#L11) should be immutable #ok

SupportReviewManager.sol#L11


 - [ ] ID-27
[TokenManager.voucherManager](TokenManager.sol#L13) should be immutable #ok

TokenManager.sol#L13


 - [ ] ID-28
[VoucherManager.owner](VoucherManager.sol#L21) should be immutable #ok

VoucherManager.sol#L21


 - [ ] ID-29
[TokenManager.actorRegistry](TokenManager.sol#L12) should be immutable #ok

TokenManager.sol#L12


 - [ ] ID-30
[VoucherManager.actorRegistry](VoucherManager.sol#L18) should be immutable #ok

VoucherManager.sol#L18


 - [ ] ID-31
[TokenManager.owner](TokenManager.sol#L15) should be immutable #ok

TokenManager.sol#L15


 - [ ] ID-32
[ActorRegistry.certifiedAuthority](ActorRegistry.sol#L7) should be immutable #ok

ActorRegistry.sol#L7


 - [ ] ID-33
[TokenManager.voucherManager](TokenManager.sol#L13) should be immutable #ok

TokenManager.sol#L13


 - [ ] ID-34
[VoucherManager.owner](VoucherManager.sol#L21) should be immutable #ok

VoucherManager.sol#L21


 - [ ] ID-35
[VoucherManager.actorRegistry](VoucherManager.sol#L18) should be immutable #ok

VoucherManager.sol#L18


 - [ ] ID-36
[ActorRegistry.certifiedAuthority](ActorRegistry.sol#L7) should be immutable #ok

ActorRegistry.sol#L7


## reentrancy-no-eth
Impact: Medium
Confidence: Medium
 - [ ] ID-37
Reentrancy in [ReviewManager.likeReview(uint256)](ReviewManager.sol#L50-L58):
	External calls:
	- [supportReviewManager.like(msg.sender,reviews[reviewID].Raddress,reviewID,reviews[reviewID].numLikes,reviews[reviewID].Uaddress)](ReviewManager.sol#L53)
	State variables written after the call(s):
	- [hasVoted[msg.sender][reviewID] = true](ReviewManager.sol#L56)
	[ReviewManager.hasVoted](ReviewManager.sol#L18) can be used in cross function reentrancies:
	- [ReviewManager.hasVoted](ReviewManager.sol#L18)
	- [ReviewManager.likeReview(uint256)](ReviewManager.sol#L50-L58)
	- [reviews[reviewID].numLikes ++](ReviewManager.sol#L55)
	[ReviewManager.reviews](ReviewManager.sol#L15) can be used in cross function reentrancies:
	- [ReviewManager.addReview(address,string)](ReviewManager.sol#L39-L48)
	- [ReviewManager.checkIfExist(uint256)](ReviewManager.sol#L30-L32)
	- [ReviewManager.deleteReview(uint256)](ReviewManager.sol#L70-L73)
	- [ReviewManager.getNumberofLikes(uint256)](ReviewManager.sol#L79-L81)
	- [ReviewManager.likeReview(uint256)](ReviewManager.sol#L50-L58)
	- [ReviewManager.modifyReview(uint256,string)](ReviewManager.sol#L60-L68)
	- [ReviewManager.onlyAuthor(uint256)](ReviewManager.sol#L24-L27)
	- [ReviewManager.reviews](ReviewManager.sol#L15)

ReviewManager.sol#L50-L58
# Non si può risolvere in quanto per questioni spazio abbiamo spostato alcune funzionalità in un secondo contratto da noi creato. Si dovrebbe fare gli aggiornamenti dello stato prima della chiamata di like ma non è possibile perchè il like contiene un require di controllo che potrebbe fallire.

## shadowing-local
Impact: Low
Confidence: High
 - [ ] ID-38
[SupportReviewManager.like(address,address,uint256,uint256,address).owner](SupportReviewManager.sol#L46) shadows:
	- [SupportReviewManager.owner](SupportReviewManager.sol#L9) (state variable)

SupportReviewManager.sol#L46
# Non grave


 - [ ] ID-39
[SupportReviewManager.like(address,address,uint256,uint256,address).owner](SupportReviewManager.sol#L46) shadows:
	- [SupportReviewManager.owner](SupportReviewManager.sol#L9) (state variable)

SupportReviewManager.sol#L46
# Non grave


## events-access
Impact: Low
Confidence: Medium
 - [ ] ID-40
[VoucherManager.setAuthorizedAddress(address,address)](VoucherManager.sol#L41-L44) should emit an event for: 
	- [tokenManager = _tokenManager](VoucherManager.sol#L42) 

VoucherManager.sol#L41-L44


 - [ ] ID-41
[SupportReviewManager.setAuthorizedAddress(address)](SupportReviewManager.sol#L27-L30) should emit an event for: 
	- [reviewManager = _reviewManager](SupportReviewManager.sol#L29) 

SupportReviewManager.sol#L27-L30


 - [ ] ID-42
[VoucherManager.setAuthorizedAddress(address,address)](VoucherManager.sol#L41-L44) should emit an event for: 
	- [tokenManager = _tokenManager](VoucherManager.sol#L42) 

VoucherManager.sol#L41-L44


 - [ ] ID-43
[SupportReviewManager.setAuthorizedAddress(address)](SupportReviewManager.sol#L27-L30) should emit an event for: 
	- [reviewManager = _reviewManager](SupportReviewManager.sol#L29) 

SupportReviewManager.sol#L27-L30


 - [ ] ID-44
[VoucherManager.setAuthorizedAddress(address,address)](VoucherManager.sol#L41-L44) should emit an event for: 
	- [tokenManager = _tokenManager](VoucherManager.sol#L42) 

VoucherManager.sol#L41-L44


 - [ ] ID-45
[VoucherManager.setAuthorizedAddress(address,address)](VoucherManager.sol#L41-L44) should emit an event for: 
	- [tokenManager = _tokenManager](VoucherManager.sol#L42) 

VoucherManager.sol#L41-L44
# Non serve un emit degli eventi perchè setAuthorized è una funzione di utilità interna al sistema

## missing-zero-check
Impact: Low
Confidence: Medium
 - [ ] ID-46
[SupportReviewManager.setAuthorizedAddress(address)._reviewManager](SupportReviewManager.sol#L27) lacks a zero-check on :
		- [reviewManager = _reviewManager](SupportReviewManager.sol#L29)

SupportReviewManager.sol#L27


 - [ ] ID-47
[TokenManager.setAuthorizedAddress(address)._supportReviewManager](TokenManager.sol#L35) lacks a zero-check on :
		- [supportReviewManager = _supportReviewManager](TokenManager.sol#L37)

TokenManager.sol#L35


 - [ ] ID-48
[VoucherManager.setAuthorizedAddress(address,address)._tokenManager](VoucherManager.sol#L41) lacks a zero-check on :
		- [tokenManager = _tokenManager](VoucherManager.sol#L42)

VoucherManager.sol#L41


 - [ ] ID-49
[VoucherManager.setAuthorizedAddress(address,address)._supportReviewManager](VoucherManager.sol#L41) lacks a zero-check on :
		- [supportReviewManager = _supportReviewManager](VoucherManager.sol#L43)

VoucherManager.sol#L41


 - [ ] ID-50
[SupportReviewManager.setAuthorizedAddress(address)._reviewManager](SupportReviewManager.sol#L27) lacks a zero-check on :
		- [reviewManager = _reviewManager](SupportReviewManager.sol#L29)

SupportReviewManager.sol#L27


 - [ ] ID-51
[TokenManager.setAuthorizedAddress(address)._supportReviewManager](TokenManager.sol#L35) lacks a zero-check on :
		- [supportReviewManager = _supportReviewManager](TokenManager.sol#L37)

TokenManager.sol#L35


 - [ ] ID-52
[VoucherManager.setAuthorizedAddress(address,address)._tokenManager](VoucherManager.sol#L41) lacks a zero-check on :
		- [tokenManager = _tokenManager](VoucherManager.sol#L42)

VoucherManager.sol#L41


 - [ ] ID-53
[VoucherManager.setAuthorizedAddress(address,address)._supportReviewManager](VoucherManager.sol#L41) lacks a zero-check on :
		- [supportReviewManager = _supportReviewManager](VoucherManager.sol#L43)

VoucherManager.sol#L41


 - [ ] ID-54
[TokenManager.setAuthorizedAddress(address)._supportReviewManager](TokenManager.sol#L35) lacks a zero-check on :
		- [supportReviewManager = _supportReviewManager](TokenManager.sol#L37)

TokenManager.sol#L35


 - [ ] ID-55
[VoucherManager.setAuthorizedAddress(address,address)._tokenManager](VoucherManager.sol#L41) lacks a zero-check on :
		- [tokenManager = _tokenManager](VoucherManager.sol#L42)

VoucherManager.sol#L41


 - [ ] ID-56
[VoucherManager.setAuthorizedAddress(address,address)._supportReviewManager](VoucherManager.sol#L41) lacks a zero-check on :
		- [supportReviewManager = _supportReviewManager](VoucherManager.sol#L43)

VoucherManager.sol#L41


 - [ ] ID-57
[VoucherManager.setAuthorizedAddress(address,address)._tokenManager](VoucherManager.sol#L41) lacks a zero-check on :
		- [tokenManager = _tokenManager](VoucherManager.sol#L42)

VoucherManager.sol#L41


 - [ ] ID-58
[VoucherManager.setAuthorizedAddress(address,address)._supportReviewManager](VoucherManager.sol#L41) lacks a zero-check on :
		- [supportReviewManager = _supportReviewManager](VoucherManager.sol#L43)

VoucherManager.sol#L41
# ok

## reentrancy-benign
Impact: Low
Confidence: Medium
 - [ ] ID-59
Reentrancy in [ReviewManager.addReview(address,string)](ReviewManager.sol#L39-L48):
	External calls:
	- [supportReviewManager.add(msg.sender,Raddress)](ReviewManager.sol#L40)
	State variables written after the call(s):
	- [restaurant_reviews[Raddress].push(reviewCounter)](ReviewManager.sol#L43)
	- [reviewCounter ++](ReviewManager.sol#L41)
	- [reviews[reviewCounter] = Review(msg.sender,Raddress,content,0,block.timestamp)](ReviewManager.sol#L42)

ReviewManager.sol#L39-L48
# Stesso problema dell'altra reentrancy, non è modificabile a causa di controlli nella funzione chiamata.

## reentrancy-events
Impact: Low
Confidence: Medium
 - [ ] ID-60
Reentrancy in [TokenManager.pay(address,uint256,uint256)](TokenManager.sol#L56-L66):
	External calls:
	- [voucherManager.invalidateVoucher(voucherID)](TokenManager.sol#L63)
	External calls sending eth:
	- [address(receiver).transfer(amountToPay)](TokenManager.sol#L60)
	- [address(msg.sender).transfer(msg.value - amountToPay)](TokenManager.sol#L61)
	Event emitted after the call(s):
	- [Payment(msg.sender,receiver,amountToPay,voucherID)](TokenManager.sol#L65)
	- [VoucherUsed(voucherID,msg.sender,receiver)](TokenManager.sol#L64)

TokenManager.sol#L56-L66
# ok

 - [ ] ID-61
Reentrancy in [TokenManager.pay(address,uint256,uint256)](TokenManager.sol#L56-L66):
	External calls:
	- [voucherManager.invalidateVoucher(voucherID)](TokenManager.sol#L63)
	External calls sending eth:
	- [address(receiver).transfer(amountToPay)](TokenManager.sol#L60)
	- [address(msg.sender).transfer(msg.value - amountToPay)](TokenManager.sol#L61)
	Event emitted after the call(s):
	- [Payment(msg.sender,receiver,amountToPay,voucherID)](TokenManager.sol#L65)
	- [VoucherUsed(voucherID,msg.sender,receiver)](TokenManager.sol#L64)

TokenManager.sol#L56-L66


 - [ ] ID-62
Reentrancy in [TokenManager.pay(address,uint256,uint256)](TokenManager.sol#L56-L66):
	External calls:
	- [voucherManager.invalidateVoucher(voucherID)](TokenManager.sol#L63)
	External calls sending eth:
	- [address(receiver).transfer(amountToPay)](TokenManager.sol#L60)
	- [address(msg.sender).transfer(msg.value - amountToPay)](TokenManager.sol#L61)
	Event emitted after the call(s):
	- [Payment(msg.sender,receiver,amountToPay,voucherID)](TokenManager.sol#L65)
	- [VoucherUsed(voucherID,msg.sender,receiver)](TokenManager.sol#L64)

TokenManager.sol#L56-L66
# ok

## timestamp
Impact: Low
Confidence: Medium
 - [ ] ID-63
[ReviewManager.modifyReview(uint256,string)](ReviewManager.sol#L60-L68) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(block.timestamp <= reviews[reviewID].timestamp + 86400,E503)](ReviewManager.sol#L62)

ReviewManager.sol#L60-L68


 - [ ] ID-64
[ReviewManager.checkIfExist(uint256)](ReviewManager.sol#L30-L32) uses timestamp for comparisons
	Dangerous comparisons:
	- [require(bool,string)(reviews[reviewID].Uaddress != address(0),E501)](ReviewManager.sol#L31)

ReviewManager.sol#L30-L32
# Per risolvere questo non dovrei proprio permettere modifiche, io posso sempre alterare l'hardware.

## naming-convention
Impact: Informational
Confidence: High
 - [ ] ID-65
Parameter [SupportReviewManager.addEvent(uint256,address,address,string).Raddress](SupportReviewManager.sol#L42) is not in mixedCase

SupportReviewManager.sol#L42


 - [ ] ID-66
Parameter [TokenManager.getTokenCountUserPerRestaurant(address,address).Uaddress](TokenManager.sol#L52) is not in mixedCase

TokenManager.sol#L52


 - [ ] ID-67
Parameter [SupportReviewManager.setAuthorizedAddress(address)._reviewManager](SupportReviewManager.sol#L27) is not in mixedCase

SupportReviewManager.sol#L27


 - [ ] ID-68
Parameter [SupportReviewManager.like(address,address,uint256,uint256,address).Uaddress](SupportReviewManager.sol#L46) is not in mixedCase

SupportReviewManager.sol#L46


 - [ ] ID-69
Parameter [SupportReviewManager.emitV(address,address,uint256).Uaddress](SupportReviewManager.sol#L52) is not in mixedCase

SupportReviewManager.sol#L52


 - [ ] ID-70
Parameter [SupportReviewManager.add(address,address).Uaddress](SupportReviewManager.sol#L37) is not in mixedCase

SupportReviewManager.sol#L37


 - [ ] ID-71
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._customer](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-72
Parameter [SupportReviewManager.add(address,address).Raddress](SupportReviewManager.sol#L37) is not in mixedCase

SupportReviewManager.sol#L37


 - [ ] ID-73
Parameter [TokenManager.getTokenCountUserPerRestaurant(address,address).Raddress](TokenManager.sol#L52) is not in mixedCase

TokenManager.sol#L52


 - [ ] ID-74
Parameter [TokenManager.incrementTokenCounter(address,address).Uaddress](TokenManager.sol#L40) is not in mixedCase

TokenManager.sol#L40


 - [ ] ID-75
Parameter [ReviewManager.getRestaurantReviewsByAddress(address).Raddress](ReviewManager.sol#L75) is not in mixedCase

ReviewManager.sol#L75


 - [ ] ID-76
Parameter [TokenManager.decrementTokenCounter(address,address).Raddress](TokenManager.sol#L45) is not in mixedCase

TokenManager.sol#L45


 - [ ] ID-77
Parameter [ReviewManager.addReview(address,string).Raddress](ReviewManager.sol#L39) is not in mixedCase

ReviewManager.sol#L39


 - [ ] ID-78
Parameter [VoucherManager.setAuthorizedAddress(address,address)._supportReviewManager](VoucherManager.sol#L41) is not in mixedCase

VoucherManager.sol#L41


 - [ ] ID-79
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._metadataURI](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-80
Parameter [TokenManager.setAuthorizedAddress(address)._supportReviewManager](TokenManager.sol#L35) is not in mixedCase

TokenManager.sol#L35


 - [ ] ID-81
Parameter [TokenManager.incrementTokenCounter(address,address).Raddress](TokenManager.sol#L40) is not in mixedCase

TokenManager.sol#L40


 - [ ] ID-82
Parameter [SupportReviewManager.emitV(address,address,uint256).Raddress](SupportReviewManager.sol#L52) is not in mixedCase

SupportReviewManager.sol#L52


 - [ ] ID-83
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._discount](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-84
Parameter [SupportReviewManager.addEvent(uint256,address,address,string).Uaddress](SupportReviewManager.sol#L42) is not in mixedCase

SupportReviewManager.sol#L42


 - [ ] ID-85
Parameter [VoucherManager.setAuthorizedAddress(address,address)._tokenManager](VoucherManager.sol#L41) is not in mixedCase

VoucherManager.sol#L41


 - [ ] ID-86
Parameter [TokenManager.decrementTokenCounter(address,address).Uaddress](TokenManager.sol#L45) is not in mixedCase

TokenManager.sol#L45


 - [ ] ID-87
Parameter [SupportReviewManager.like(address,address,uint256,uint256,address).Raddress](SupportReviewManager.sol#L46) is not in mixedCase

SupportReviewManager.sol#L46


 - [ ] ID-88
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._restaurant](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-89
Variable [ReviewManager.restaurant_reviews](ReviewManager.sol#L16) is not in mixedCase

ReviewManager.sol#L16


 - [ ] ID-90
Parameter [SupportReviewManager.addEvent(uint256,address,address,string).Raddress](SupportReviewManager.sol#L42) is not in mixedCase

SupportReviewManager.sol#L42


 - [ ] ID-91
Parameter [TokenManager.getTokenCountUserPerRestaurant(address,address).Uaddress](TokenManager.sol#L52) is not in mixedCase

TokenManager.sol#L52


 - [ ] ID-92
Parameter [SupportReviewManager.setAuthorizedAddress(address)._reviewManager](SupportReviewManager.sol#L27) is not in mixedCase

SupportReviewManager.sol#L27


 - [ ] ID-93
Parameter [SupportReviewManager.like(address,address,uint256,uint256,address).Uaddress](SupportReviewManager.sol#L46) is not in mixedCase

SupportReviewManager.sol#L46


 - [ ] ID-94
Parameter [SupportReviewManager.emitV(address,address,uint256).Uaddress](SupportReviewManager.sol#L52) is not in mixedCase

SupportReviewManager.sol#L52


 - [ ] ID-95
Parameter [SupportReviewManager.add(address,address).Uaddress](SupportReviewManager.sol#L37) is not in mixedCase

SupportReviewManager.sol#L37


 - [ ] ID-96
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._customer](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-97
Parameter [SupportReviewManager.add(address,address).Raddress](SupportReviewManager.sol#L37) is not in mixedCase

SupportReviewManager.sol#L37


 - [ ] ID-98
Parameter [TokenManager.getTokenCountUserPerRestaurant(address,address).Raddress](TokenManager.sol#L52) is not in mixedCase

TokenManager.sol#L52


 - [ ] ID-99
Parameter [TokenManager.incrementTokenCounter(address,address).Uaddress](TokenManager.sol#L40) is not in mixedCase

TokenManager.sol#L40


 - [ ] ID-100
Parameter [TokenManager.decrementTokenCounter(address,address).Raddress](TokenManager.sol#L45) is not in mixedCase

TokenManager.sol#L45


 - [ ] ID-101
Parameter [VoucherManager.setAuthorizedAddress(address,address)._supportReviewManager](VoucherManager.sol#L41) is not in mixedCase

VoucherManager.sol#L41


 - [ ] ID-102
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._metadataURI](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-103
Parameter [TokenManager.setAuthorizedAddress(address)._supportReviewManager](TokenManager.sol#L35) is not in mixedCase

TokenManager.sol#L35


 - [ ] ID-104
Parameter [TokenManager.incrementTokenCounter(address,address).Raddress](TokenManager.sol#L40) is not in mixedCase

TokenManager.sol#L40


 - [ ] ID-105
Parameter [SupportReviewManager.emitV(address,address,uint256).Raddress](SupportReviewManager.sol#L52) is not in mixedCase

SupportReviewManager.sol#L52


 - [ ] ID-106
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._discount](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-107
Parameter [SupportReviewManager.addEvent(uint256,address,address,string).Uaddress](SupportReviewManager.sol#L42) is not in mixedCase

SupportReviewManager.sol#L42


 - [ ] ID-108
Parameter [VoucherManager.setAuthorizedAddress(address,address)._tokenManager](VoucherManager.sol#L41) is not in mixedCase

VoucherManager.sol#L41


 - [ ] ID-109
Parameter [TokenManager.decrementTokenCounter(address,address).Uaddress](TokenManager.sol#L45) is not in mixedCase

TokenManager.sol#L45


 - [ ] ID-110
Parameter [SupportReviewManager.like(address,address,uint256,uint256,address).Raddress](SupportReviewManager.sol#L46) is not in mixedCase

SupportReviewManager.sol#L46


 - [ ] ID-111
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._restaurant](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-112
Parameter [TokenManager.getTokenCountUserPerRestaurant(address,address).Uaddress](TokenManager.sol#L52) is not in mixedCase

TokenManager.sol#L52


 - [ ] ID-113
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._customer](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-114
Parameter [TokenManager.getTokenCountUserPerRestaurant(address,address).Raddress](TokenManager.sol#L52) is not in mixedCase

TokenManager.sol#L52


 - [ ] ID-115
Parameter [TokenManager.incrementTokenCounter(address,address).Uaddress](TokenManager.sol#L40) is not in mixedCase

TokenManager.sol#L40


 - [ ] ID-116
Parameter [TokenManager.decrementTokenCounter(address,address).Raddress](TokenManager.sol#L45) is not in mixedCase

TokenManager.sol#L45


 - [ ] ID-117
Parameter [VoucherManager.setAuthorizedAddress(address,address)._supportReviewManager](VoucherManager.sol#L41) is not in mixedCase

VoucherManager.sol#L41


 - [ ] ID-118
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._metadataURI](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-119
Parameter [TokenManager.setAuthorizedAddress(address)._supportReviewManager](TokenManager.sol#L35) is not in mixedCase

TokenManager.sol#L35


 - [ ] ID-120
Parameter [TokenManager.incrementTokenCounter(address,address).Raddress](TokenManager.sol#L40) is not in mixedCase

TokenManager.sol#L40


 - [ ] ID-121
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._discount](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-122
Parameter [VoucherManager.setAuthorizedAddress(address,address)._tokenManager](VoucherManager.sol#L41) is not in mixedCase

VoucherManager.sol#L41


 - [ ] ID-123
Parameter [TokenManager.decrementTokenCounter(address,address).Uaddress](TokenManager.sol#L45) is not in mixedCase

TokenManager.sol#L45


 - [ ] ID-124
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._restaurant](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-125
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._customer](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-126
Parameter [VoucherManager.setAuthorizedAddress(address,address)._supportReviewManager](VoucherManager.sol#L41) is not in mixedCase

VoucherManager.sol#L41


 - [ ] ID-127
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._metadataURI](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-128
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._discount](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


 - [ ] ID-129
Parameter [VoucherManager.setAuthorizedAddress(address,address)._tokenManager](VoucherManager.sol#L41) is not in mixedCase

VoucherManager.sol#L41


 - [ ] ID-130
Parameter [VoucherManager.emitVoucher(address,address,uint256,string)._restaurant](VoucherManager.sol#L47) is not in mixedCase

VoucherManager.sol#L47


## reentrancy-unlimited-gas
Impact: Informational
Confidence: Medium
 - [ ] ID-131
Reentrancy in [TokenManager.pay(address,uint256,uint256)](TokenManager.sol#L56-L66):
	External calls:
	- [address(receiver).transfer(amountToPay)](TokenManager.sol#L60)
	- [address(msg.sender).transfer(msg.value - amountToPay)](TokenManager.sol#L61)
	State variables written after the call(s):
	- [incrementTokenCounter(msg.sender,receiver)](TokenManager.sol#L62)
		- [tokens[Uaddress][Raddress] ++](TokenManager.sol#L41)
	Event emitted after the call(s):
	- [Payment(msg.sender,receiver,amountToPay,voucherID)](TokenManager.sol#L65)
	- [TokenIncremented(Uaddress,Raddress,tokens[Uaddress][Raddress])](TokenManager.sol#L42)
		- [incrementTokenCounter(msg.sender,receiver)](TokenManager.sol#L62)
	- [VoucherUsed(voucherID,msg.sender,receiver)](TokenManager.sol#L64)

TokenManager.sol#L56-L66


 - [ ] ID-132
Reentrancy in [TokenManager.pay(address,uint256,uint256)](TokenManager.sol#L56-L66):
	External calls:
	- [address(receiver).transfer(amountToPay)](TokenManager.sol#L60)
	- [address(msg.sender).transfer(msg.value - amountToPay)](TokenManager.sol#L61)
	State variables written after the call(s):
	- [incrementTokenCounter(msg.sender,receiver)](TokenManager.sol#L62)
		- [tokens[Uaddress][Raddress] ++](TokenManager.sol#L41)
	Event emitted after the call(s):
	- [Payment(msg.sender,receiver,amountToPay,voucherID)](TokenManager.sol#L65)
	- [TokenIncremented(Uaddress,Raddress,tokens[Uaddress][Raddress])](TokenManager.sol#L42)
		- [incrementTokenCounter(msg.sender,receiver)](TokenManager.sol#L62)
	- [VoucherUsed(voucherID,msg.sender,receiver)](TokenManager.sol#L64)

TokenManager.sol#L56-L66


 - [ ] ID-133
Reentrancy in [TokenManager.pay(address,uint256,uint256)](TokenManager.sol#L56-L66):
	External calls:
	- [address(receiver).transfer(amountToPay)](TokenManager.sol#L60)
	- [address(msg.sender).transfer(msg.value - amountToPay)](TokenManager.sol#L61)
	State variables written after the call(s):
	- [incrementTokenCounter(msg.sender,receiver)](TokenManager.sol#L62)
		- [tokens[Uaddress][Raddress] ++](TokenManager.sol#L41)
	Event emitted after the call(s):
	- [Payment(msg.sender,receiver,amountToPay,voucherID)](TokenManager.sol#L65)
	- [TokenIncremented(Uaddress,Raddress,tokens[Uaddress][Raddress])](TokenManager.sol#L42)
		- [incrementTokenCounter(msg.sender,receiver)](TokenManager.sol#L62)
	- [VoucherUsed(voucherID,msg.sender,receiver)](TokenManager.sol#L64)

TokenManager.sol#L56-L66
# ok (risolto risolvendo l'altra reentrancy)

## too-many-digits
Impact: Informational
Confidence: Medium
 - [ ] ID-134
[SupportReviewManager.emitV(address,address,uint256)](SupportReviewManager.sol#L52-L56) uses literals with too many digits:
	- [voucherManager.emitVoucher(Uaddress,Raddress,2000000000000000000,discount)](SupportReviewManager.sol#L55)

SupportReviewManager.sol#L52-L56


 - [ ] ID-135
[SupportReviewManager.emitV(address,address,uint256)](SupportReviewManager.sol#L52-L56) uses literals with too many digits:
	- [voucherManager.emitVoucher(Uaddress,Raddress,2000000000000000000,discount)](SupportReviewManager.sol#L55)

SupportReviewManager.sol#L52-L56
# ok

## constable-states
Impact: Optimization
Confidence: High
 - [ ] ID-136
[TokenManager.symbol](TokenManager.sol#L9) should be constant 

TokenManager.sol#L9
# ok

 - [ ] ID-137
[TokenManager.name](TokenManager.sol#L8) should be constant 

TokenManager.sol#L8
# ok

 - [ ] ID-138
[TokenManager.decimals](TokenManager.sol#L10) should be constant 

TokenManager.sol#L10
# ok

 - [ ] ID-139
[TokenManager.symbol](TokenManager.sol#L9) should be constant 

TokenManager.sol#L9
# ok

 - [ ] ID-140
[TokenManager.name](TokenManager.sol#L8) should be constant 

TokenManager.sol#L8
# ok

 - [ ] ID-141
[TokenManager.decimals](TokenManager.sol#L10) should be constant 

TokenManager.sol#L10
# ok

 - [ ] ID-142
[TokenManager.symbol](TokenManager.sol#L9) should be constant 

TokenManager.sol#L9
# ok

 - [ ] ID-143
[TokenManager.name](TokenManager.sol#L8) should be constant 

TokenManager.sol#L8
# ok

 - [ ] ID-144
[TokenManager.decimals](TokenManager.sol#L10) should be constant 

TokenManager.sol#L10
# ok

