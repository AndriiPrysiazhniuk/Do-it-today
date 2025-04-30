import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import {getListItemSx} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import {removeTaskAC, TaskType, updateTaskStatusAC, updateTaskTitleAC} from "@/features/todolists/model/tasksReducer.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type PropsType = {
    task: TaskType
    id: string
}
export const TaskItem = ({task, id}: PropsType) => {
    const dispatch = useAppDispatch()

    const removeTask = () => {
        dispatch(removeTaskAC({id, taskId: task.id}))
    }
    const updateTaskTitle = (title: string) => {
        dispatch(updateTaskTitleAC({id, taskId: task.id, title}))
    }
    const updateTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskStatusAC(id, task.id, e.currentTarget.checked))
    }
    return (
        <ListItem sx={getListItemSx(task.isDone)}>
            <div style={{display: 'flex'}}>
                <Checkbox onChange={updateTaskStatus} checked={task.isDone}/>
                <EditableSpan value={task.title} onChange={updateTaskTitle}/>
            </div>
            <IconButton color={'warning'} onClick={removeTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
};
