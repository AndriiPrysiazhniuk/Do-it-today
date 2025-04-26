import {FilterValuesType, TodolistType} from "../App.tsx";
import {v1} from "uuid";

const initialState: TodolistType[] = []
type ActionType = AddTodolistACType
    | RemoveTodolistACType
    | changeTodolistFilterACType
    | changeTodolistTitleACType
export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "todolist/add_todolist": {
            const todolist: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all'
            }
            return [...state, todolist]
        }
        case "todolist/remove_todolist": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'todolist/change_todolist_filter': {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        case 'todolist/change_todolist_title': {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        default: {
            return state
        }
    }
}

export const addTodolistAC = (id: string = v1(), title: string) => {
    return {
        type: 'todolist/add_todolist',
        payload: {
            id,
            title
        }
    } as const
}
export const removeTodolistAC = (id: string) => {
    return {
        type: 'todolist/remove_todolist',
        payload: {
            id
        }
    } as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'todolist/change_todolist_filter',
        payload: {
            id,
            filter
        }
    } as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'todolist/change_todolist_title',
        payload: {
            id,
            title
        }
    } as const
}
