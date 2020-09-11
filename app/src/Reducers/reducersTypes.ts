interface IUserReducer {
    id: number
    name: string
    email: string
    image: string
    description: string
}

export default interface IState {
    userReducer: IUserReducer
}