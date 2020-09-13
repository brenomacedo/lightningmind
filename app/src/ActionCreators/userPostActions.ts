import { ActionCreator } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import api from '../api/api'

interface IPostActionSetPost {
    payload: IPostReducer[]
    type: "SET_USER_POST"
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

export const setUserPost = (id: number): ThunkAction<Promise<void>, null, null, IPostActionSetPost> => {
    return async dispatch => {
        const post = await api.get<IPostReducer[]>(`/post/find/${id}`)
        dispatch({ type: "SET_USER_POST", payload: post.data })
    }
}