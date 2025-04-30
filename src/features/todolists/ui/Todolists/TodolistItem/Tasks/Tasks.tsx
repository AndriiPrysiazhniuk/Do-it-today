import {TodolistType} from "@/features/todolists/model/todolistsReducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";

type PropsType = {
    todolist: TodolistType
}
export const Tasks = (props: PropsType) => {
    const {todolist: {id, filter}} = props
    const tasks = useAppSelector(selectTasks)


    const todolistTasks = tasks[id]
    let filteredTasks = todolistTasks

    if (filter === 'active') {
        filteredTasks = todolistTasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = todolistTasks.filter(el => el.isDone)
    }
    return (
        filteredTasks.length !== 0
            ? filteredTasks.map(el => {
                return (
                    <TaskItem key={el.id} task={el} id={id}/>
                )
            }) :
            <p>Task list is empty - add new task</p>
    )
}