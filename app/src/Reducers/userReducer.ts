import { Reducer } from 'redux'

interface IUserAction {
    payload: IUserReducer
    type: "CREATE_USER"
}

interface IUserReducer {
    id: number
    name: string
    login: string
    image: string
    description: string
}

const INITIAL_STATE = {
    id: 0,
    name: '',
    login: '',
    image: '',
    description: ''
}

const userReducer: Reducer<IUserReducer, IUserAction> = (state = INITIAL_STATE, action) => {
    
    switch(action.type) {
        case "CREATE_USER":
            console.log('user created')
            return {...state}
        default:
            return {...state}
    }
}

export default userReducer