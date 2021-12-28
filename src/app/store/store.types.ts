export enum StoreEvents {
    Updated = 'updated',
}

export interface IState {
    [key: string]: any | IState
}
