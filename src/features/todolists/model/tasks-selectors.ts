import {RootState} from "../../../app/store.ts";
import {TasksStateType} from "@/features/todolists/model/tasksReducer.ts";

export const selectTasks = (state: RootState): TasksStateType => state.tasks