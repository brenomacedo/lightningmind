import { ActionCreator } from 'redux'

interface IAction {
    type: "SELECT_TOKEN",
    payload: string
}

export const selectToken: ActionCreator<IAction> = (token: string) => {
    return { type: "SELECT_TOKEN", payload: token }
}