import { Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import api from '../api/api'
import IState from '../Reducers/reducersTypes'

// import { ThunkAction, ThunkDispatch } from 'redux-thunk'

// interface IUserReducer {
//     id: number
//     name: string
//     login: string
//     image: string
//     description: string
// }

// interface IUserAction {
//     payload: IUserReducer
//     type: "SET_USER"
// }

// export const setUser = (name: string):ThunkAction<Promise<void>, null, null, IUserAction> => {
//     return async (dispatch: ThunkDispatch<null, null, IUserAction>) => {
//         await new Promise((resolve, reject) => {
//             setTimeout(() => { resolve('done!') }, 3000)
//         })

//         dispatch({
//             type: "SET_USER",
//             payload: {
//                 name,
//                 description: '',
//                 id: 1,
//                 image: '',
//                 login: ''
//             }
//         })
//     }
// }

interface ISetUserAction {
    type: "SET_USER",
    payload: {
        id: number
        name: string
        description: string
        email: string
        image: string,
        status: string
        favorites: string
    }
}

interface ISetUserPremiumAction {
    type: "SET_USER_PREMIUM"
    payload: {
        status: "PREMIUM"
    }
}

export const setUser: ActionCreator<ISetUserAction> =
(id: number, name: string, description: string, email: string, image: string, status: string, favorites: string) => {
    return {
        type: "SET_USER",
        payload: {
            id, name, description, email, image, status, favorites
        }
    }
}

export const setUserPremium = (): ThunkAction<Promise<void>, IState, null, ISetUserPremiumAction> => {
    return async (dispatch, getState) => {
        const id = getState().userReducer.id
        await api.put(`/user/premium/${id}`)
        dispatch({
            payload: {
                status: "PREMIUM"
            },
            type: "SET_USER_PREMIUM"
        })
    }
}