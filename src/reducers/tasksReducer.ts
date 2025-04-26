import {TasksStateType} from "../App.tsx";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolistsReducer.ts";

const initialState: TasksStateType = {}
type ActionType = RemoveTaskACType |
    AddTaskACType |
    updateTaskTitleACType |
    updateTaskStatusACType |
    AddTodolistACType |
    RemoveTodolistACType

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type updateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
export type updateTaskStatusACType = ReturnType<typeof updateTaskStatusAC>

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'tasks/remove_tasks': {
            return {
                ...state,
                [action.payload.id]: state[action.payload.id].filter(el => el.id === action.payload.taskId)
            }
        }
        case "tasks/add_tasks": {
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.id]: [...state[action.payload.id], newTask]}
        }
        case "tasks/update_task_title": {
            return {
                ...state, [action.payload.id]: state[action.payload.id].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        }
        case "tasks/update_task_status": {
            return {
                ...state, [action.payload.id]: state[action.payload.id].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.taskStatus
                } : el)
            }
        }
        case "todolist/add_todolist": {
            return {...state, [action.payload.id]: []}
        }
        case "todolist/remove_todolist": {
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (id: string, taskId: string) => {
    return {
        type: 'tasks/remove_tasks',
        payload: {
            id,
            taskId
        }
    } as const
}
export const addTaskAC = (id: string, title: string) => {
    return {
        type: 'tasks/add_tasks',
        payload: {
            id,
            title
        }
    } as const
}
export const updateTaskTitleAC = (id: string, taskId: string, title: string) => {
    return {
        type: 'tasks/update_task_title',
        payload: {
            id,
            taskId,
            title
        }
    } as const
}
export const updateTaskStatusAC = (id: string, taskId: string, taskStatus: boolean) => {
    return {
        type: 'tasks/update_task_status',
        payload: {
            id,
            taskId,
            taskStatus
        }
    } as const
}
