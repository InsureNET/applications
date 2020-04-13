
// Connect to HashGraph
// import client
const { Client, CryptoTransferTransaction, AccountId } = require('@hashgraph/sdk');

// Grab the account id and key
const operatorAccountId = '0.0.3792';
const operatorPrivateKey = '302e020100300506032b657004220420bc5b7a6a77dbae570b36fd07a298fd8bf95eb1a3d95fe1adc90a8adce54c57fa';


// Connect to Hedera and get balance of account
export async function connectToHedera() {
	console.group('Hedera Connecting')
	// if we cant grab the params then throw an error
	if(operatorAccountId == null || operatorPrivateKey == null){
		throw new Error('environment variables OPERATOR_KEY and OPERATOR_ID must be present');
	}

	// create connection to Hedera network
	const client = Client.forTestnet();
	client.setOperator(operatorAccountId, operatorPrivateKey);

	// attempt to get balance HBAR
	var currentBalance = (await client.getAccountBalance(operatorAccountId)).toString();	
	//console.log("account balance:", currentBalance);

	// console.log("balance before transfer:", (await client.getAccountBalance(operatorAccountId)).toString());
    // const receipt = await (await new CryptoTransferTransaction()
    //     .addSender(operatorAccountId, 1)
    //     .addRecipient("0.0.3", 1) // Atomic wallet address MainNet 0.0.39936
    //     .setTransactionMemo("sdk example")
    //     .execute(client))
    //     .getReceipt(client);
    // console.log(receipt);
	// console.log("balance after transfer:", (await client.getAccountBalance(operatorAccountId)).toString());
	console.groupEnd();

	return currentBalance;
}

// var createCORSRequest = function(method, url) {
// 	var xhr = new XMLHttpRequest();
// 	if ("withCredentials" in xhr) {
// 	  // Most browsers.
// 	  xhr.open(method, url, true);
// 	} else if (typeof XDomainRequest != "undefined") {
// 	  // IE8 & IE9
// 	  xhr = new XDomainRequest();
// 	  xhr.open(method, url);
// 	} else {
// 	  // CORS not supported.
// 	  xhr = null;
// 	}
// 	return xhr;
// };

// ToDo: CORS is not supported! Need to use strict https!
// const getTopics = function() {
// 	var xhr = new XMLHttpRequest();
// 	var url = 'https://api-testnet.dragonglass.me/hedera/api/v1/topics';
// 	var method = 'GET';
// 	var xhr = createCORSRequest(method, url);

// 	xhr.addEventListener('readystatechange', function () {
// 		if (this.readyState === 4) {
			
// 		}
// 	});

// 	xhr.onload = function() {
// 		var responseText = xhr.responseText;
// 		console.log(`getTopics() respnse ${responseText}`);
// 		// process the response.
// 	};
	   
// 	xhr.onerror = function(error) {
// 		 console.log(`[ERROR]::${error}`);
// 	};

// 	xhr.setRequestHeader('X-API-KEY', '0a17591c-d439-39ac-a497-5b54d857d00b');
// 	xhr.withCredentials = true;
// 	xhr.send();	
// }

