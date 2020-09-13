import { Reducer } from 'redux'

interface IPostAction {
    payload: IUserPostReducer[]
    type: "SET_USER_POST"
}

interface IUser {
    id: number
    name: string
    email: string
    image: string
    description: string
}

interface IUserPostReducer {
    id: number
    description: string
    videoURL: string
    userId: number
    user: IUser
}

const INITIAL_STATE: IUserPostReducer[] = []

const userPostReducer: Reducer<IUserPostReducer[], IPostAction> = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case "SET_USER_POST":
            return [...action.payload]
        default:
            return [...state]
    }
}

export default userPostReducer