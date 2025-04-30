import {TodolistType} from "@/features/todolists/model/todolistsReducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import {addTaskAC} from "@/features/todolists/model/tasksReducer.ts";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";

type PropsType = {
    todolist: TodolistType
}
export const TodolistItem = ({todolist}: PropsType) => {
    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(addTaskAC(todolist.id, title))
    }
    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
}