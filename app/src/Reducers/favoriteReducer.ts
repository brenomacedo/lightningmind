import { Reducer } from 'redux'

interface IPostAction {
    payload: IPostReducer[]
    type: "SET_FAVORITE"
}

interface IUser {
    id: number
    name: string
    email: string
    image: string
    description: string
}

interface IPostReducer {
    id: number
    description: string
    videoURL: string
    userId: number
    user: IUser
    usersLikes: string
}

const INITIAL_STATE: IPostReducer[] = []

const favoriteReducer: Reducer<IPostReducer[], IPostAction> = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_FAVORITE":
            return [...state, ...action.payload]
        default:
            return [...state]
    }
}

export default favoriteReducer