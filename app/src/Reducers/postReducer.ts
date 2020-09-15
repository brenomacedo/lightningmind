import { Reducer } from 'redux'

interface IPostAction {
    payload: IPostReducer[]
    type: "SET_POST" | "SEARCH_POST" | "LIKE_POST" | "REMOVE_LIKE"
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

const postReducer: Reducer<IPostReducer[], IPostAction> = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_POST":
            return [...action.payload]
        case "SEARCH_POST":
            return [...action.payload]
        case "LIKE_POST":
            return [...state]
        case "REMOVE_LIKE":
            return [...state]
        default:
            return [...state]
    }
}

export default postReducer