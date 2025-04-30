import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC} from "./todolistsReducer.ts";

const initialState: TasksStateType = {}

export const removeTaskAC = createAction<{ id: string, taskId: string }>('tasks/remove_tasks')
export const addTaskAC = createAction('tasks/add_tasks', (id: string, title: string) => {
    return {payload: {id, taskId: nanoid(), title}}
})
export const updateTaskTitleAC = createAction<{ id: string, taskId: string, title: string }>('tasks/update_task_title')
export const updateTaskStatusAC = createAction('tasks/update_task_status', (id: string, taskId: string, isDone: boolean) => {
    return {payload: {id, taskId, isDone}}
})

export const tasksReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(removeTaskAC, (state, action) => {
            const index = state[action.payload.id].findIndex(el => el.id === action.payload.id)
            if (index !== 0) state[action.payload.id].splice(index)
        })
        .addCase(addTaskAC, (state, action) => {
            const index = state[action.payload.id].findIndex(el => el.id === action.payload.id)
            const task: TaskType = {id: action.payload.taskId, title: action.payload.title, isDone: false}
            if (index !== 0) state[action.payload.id].push(task)
        })
        .addCase(updateTaskTitleAC, (state, action) => {
            const task = state[action.payload.id].find(el => el.id === action.payload.taskId)
            if (task) task.title = action.payload.title
        })
        .addCase(updateTaskStatusAC, (state, action) => {
            const task = state[action.payload.id].find(el => el.id === action.payload.taskId)
            if (task) task.isDone = action.payload.isDone
        })
        .addCase(addTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
})

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TasksStateType = Record<string, TaskType[]>