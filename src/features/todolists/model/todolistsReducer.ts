import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TodolistType[] = []

export const addTodolistAC = createAction('todolist/add_todolist', (title: string) => {
    return {payload: {id: nanoid(), title}}
})
export const removeTodolistAC = createAction<{ id: string }>('todolist/remove_todolist')
export const changeTodolistFilterAC = createAction<{
    id: string,
    filter: FilterValuesType
}>('todolist/change_todolist_filter')
export const changeTodolistTitleAC = createAction<{ id: string, title: string }>('todolist/change_todolist_title')

export const todolistsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(addTodolistAC, (state, action) => {
            const newTodolist: TodolistType = {...action.payload, filter: 'all'}
            state.push(newTodolist)
        })
        .addCase(removeTodolistAC, (state, action) => {
            const index = state.findIndex(el => el.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const index = state.findIndex(el => el.id === action.payload.id)
            if (index !== -1) state[index].filter = action.payload.filter
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(el => el.id === action.payload.id)
            if (index) state[index].title = action.payload.title
        })
})

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}