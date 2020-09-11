import { Reducer } from 'redux'

interface ITokenReducer {
    token: string
}

interface ISelectTokenAction {
    type: 'SELECT_TOKEN'
    payload: string
}

const INITIAL_STATE = {
    token: ''
}

const tokenReducer: Reducer<ITokenReducer, ISelectTokenAction> = (state: ITokenReducer = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SELECT_TOKEN':
            return { ...state, token: action.payload }
        default:
            return {...state}
    }
}

export default tokenReducer