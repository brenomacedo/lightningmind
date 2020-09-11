import { Reducer } from 'redux'

interface IUserAction {
    payload: IUserReducer
    type: "SET_USER"
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
        case "SET_USER":
            const { name, description, id, login, image } = action.payload
            return {
                ...state,
                name,
                description,
                id,
                login,
                image
            }
        default:
            return {...state}
    }
}

export default userReducer