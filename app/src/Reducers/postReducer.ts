import { Reducer } from 'redux'

interface IPostAction {
    payload: IPostReducer[]
    type: "SET_POST"
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
}

const INITIAL_STATE: IPostReducer[] = []

const postReducer: Reducer<IPostReducer[], IPostAction> = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_POST":
            return [...action.payload]
        default:
            return [...state]
    }
}

export default postReducer