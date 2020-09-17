import { Reducer } from 'redux'

interface IUserAction {
    payload: IUserReducer
    type: "SET_USER" | "SET_USER_PREMIUM"
}

interface IUserReducer {
    id: number
    name: string
    login: string
    image: string
    description: string
    status: string
    favorites: string
}

const INITIAL_STATE = {
    id: 0,
    name: '',
    login: '',
    image: '',
    description: '',
    favorites: '',
    status: ''
}

const userReducer: Reducer<IUserReducer, IUserAction> = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_USER":
            const { name, description, id, login, image, favorites, status } = action.payload
            return {
                ...state,
                name,
                description,
                id,
                login,
                image,
                favorites,
                status
            }
        case "SET_USER_PREMIUM":
            return {
                ...state, status: "PREMIUM"
            }
        default:
            return {...state}
    }
}

export default userReducer