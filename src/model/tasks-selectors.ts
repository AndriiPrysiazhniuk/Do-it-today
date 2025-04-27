import {RootState} from "../store/store.ts";
import {TasksStateType} from "../App.tsx";

export const selectTasks = (state: RootState): TasksStateType => state.tasks