import { Reducer } from 'redux'

interface ITokenReducer {
    token: string
}

interface ITokenReducerAction {
    type: 'NEW_TOKEN'
    payload: string
}

const INITIAL_STATE = {
    token: ''
}

const tokenReducer: Reducer<ITokenReducer, ITokenReducerAction> = (state: ITokenReducer = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'NEW_TOKEN':
            return { ...state, token: action.payload }
        default:
            return {...state}
    }
}

export default tokenReducer