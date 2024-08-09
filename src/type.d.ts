declare type StateType<T> = {
    data: T
    error: string
    loading: boolean
}

declare type UserType = {
    id: number
    email: string
    username: string
    password: string
}

declare type ProductType = {
    id: number
    name: string
    price: number
    image: string
    description: string
    createdById: number
    createdBy?: UserType
}

declare module 'vuex' {
    export * from 'vuex/types/index.d.ts';
}
