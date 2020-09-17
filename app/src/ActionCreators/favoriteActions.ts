import { ThunkAction } from 'redux-thunk'
import api from '../api/api'

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

interface ISetFavoritesAction {
    type: "SET_FAVORITE",
    payload: IPostReducer[]
}

export const setFavorites = (id: number): ThunkAction<Promise<void>, null, null, ISetFavoritesAction> => {
    return async dispatch => {
        const posts = await api.get<IPostReducer[]>(`/favorites/view/${id}`)
        dispatch({
            type: "SET_FAVORITE",
            payload: posts.data
        })
    }
}