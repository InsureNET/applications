import { combineReducers } from 'redux';

function web3(state = {}, action) {
    switch(action.type) {
        case 'WE3_LOADED':
            return { ...state, connection: action.connecton }
        case 'WEB3_ACCOUNT_LOADED':
            return { ...state, account: action.account }
        case  'ETHER_BALANCE_LOADED':
            return { ...state, balance: action.balance }
        default:
                return state
    }
}

const rootReducer = combineReducers({
    web3,
});

export default rootReducer;