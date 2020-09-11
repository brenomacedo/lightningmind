import { Action, ActionCreator } from 'redux'

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
        image: string
    }
}

export const setUser: ActionCreator<ISetUserAction> =
(id: number, name: string, description: string, email: string, image: string) => {
    return {
        type: "SET_USER",
        payload: {
            id, name, description, email, image
        }
    }
}