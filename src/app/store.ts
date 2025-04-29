import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {tasksReducer} from "../reducers/tasksReducer.ts";
import {todolistsReducer} from "../reducers/todolistsReducer.ts";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

export const store = configureStore({
    reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

