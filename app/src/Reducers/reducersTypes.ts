interface IUserReducer {
    id: number
    name: string
    email: string
    image: string
    description: string
    status: string
    favorites: string
}

interface IUser {
    id: number
    name: string
    email: string
    image: string
    description: string
    status: string
    favorites: string
}

interface IPostReducer {
    id: number
    description: string
    videoURL: string
    userId: number
    user: IUser
    usersLikes: string
}

export default interface IState {
    userReducer: IUserReducer
    postReducer: IPostReducer[]
    userPostReducer: IPostReducer[]
    favoriteReducer : IPostReducer[]
}