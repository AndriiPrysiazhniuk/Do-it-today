import {FilterValuesType, TodolistType} from "../app/App.tsx";
import {v1} from "uuid";
import {createAction, createReducer} from "@reduxjs/toolkit";

const initialState: TodolistType[] = []

export const addTodolistAC = createAction('todolist/add_todolist', (title: string) => {
    return {payload: {id: v1(), title}}
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
