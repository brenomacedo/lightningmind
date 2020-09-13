import { ActionCreator } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import api from '../api/api'

interface IPostActionSetPost {
    payload: IPostReducer[]
    type: "SET_POST"
}

interface IPostActionAddPost {
    payload: IPostReducer
    type: "ADD_POST"
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

export const setPosts = ():ThunkAction<Promise<void>, null, null, IPostActionSetPost> => {
    return async (dispatch: ThunkDispatch<null, null, IPostActionSetPost>) => {
        const res = await api.get<IPostReducer[]>('/post/view')
        dispatch({ type: "SET_POST", payload: res.data })
    }
}