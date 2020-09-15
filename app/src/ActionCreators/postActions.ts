import { ActionCreator } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import api from '../api/api'
import IState from '../Reducers/reducersTypes'

interface IPostActionSetPost {
    payload: IPostReducer[]
    type: "SET_POST" | "SEARCH_POST"
}

interface IPostActionLikePost {
    type: "LIKE_POST" | "REMOVE_LIKE"
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
    return async dispatch => {
        const res = await api.get<IPostReducer[]>('/post/view')
        dispatch({ type: "SET_POST", payload: res.data })
    }
}

export const searchPost = (search: string):ThunkAction<Promise<void>, null, null, IPostActionSetPost> => {
    return async dispatch => {

        const posts = await api.get(`/post/search?search=${search}`)

        dispatch({
            type: "SEARCH_POST",
            payload: posts.data
        })
    }
}

export const likePost = (pId: number): ThunkAction<Promise<void>, IState, number, IPostActionLikePost> => {
    
    return async (dispatch, getState, postId = pId) => {
        const userId = getState().userReducer.id
        console.log(userId, pId)
        dispatch({
            type: "LIKE_POST"
        })
    }
}