interface IUserReducer {
    id: number
    name: string
    login: string
    image: string
    description: string
}

interface ITokenReducer {
    token: string
}

export default interface IState {
    userReducer: IUserReducer
    tokenReducer: ITokenReducer
}