interface IUserReducer {
    id: number
    name: string
    login: string
    image: string
    description: string
}

export default interface IState {
    userReducer: IUserReducer
}