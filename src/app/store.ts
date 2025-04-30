import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {tasksReducer} from "../features/todolists/model/tasksReducer.ts";
import {todolistsReducer} from "../features/todolists/model/todolistsReducer.ts";
import {appReducer} from './app-reducer.ts';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

