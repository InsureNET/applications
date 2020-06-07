

// 333
export function web3Loaded(connection) {
    return {
        type: 'WEB3_LOADED',
        connection
    }
}

export function web3AccountLoaded(account) {
    return {
        type: 'WEB3_ACCOUNT_LOADED',
        account
    }
}

export function blockchainDataLoaded(data) {
    return {
        type: 'BLOCKCHAIN_DATA_LOADED',
        data
    }
}

