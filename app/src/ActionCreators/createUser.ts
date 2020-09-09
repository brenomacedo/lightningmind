import { ThunkAction } from 'redux-thunk'

interface IUserReducer {
    id: number
    name: string
    login: string
    image: string
    description: string
}

interface IUserAction {
    payload: IUserReducer
    type: "CREATE_USER"
}

const createUser: ThunkAction<void, IUserReducer, null, IUserAction> = async (dispatch) => {
    await dispatch({
        payload: {
            id: 1,
            description: '',
            image: '',
            login: '',
            name: ''
        },
        type: 'CREATE_USER'
    })
}

export default createUser