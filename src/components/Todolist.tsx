import {FilterValuesType, TaskType, TodolistType} from "../App.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {UniversalButton} from "./UniversalButton.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {ChangeEvent} from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from "@mui/material/Box";
import {getListItemSx} from "../styles/todolists.styles.ts";

type PropsType = {
    todolists: TodolistType;
    tasks: TaskType[];
    addTask: (id: string, title: string) => void;
    removeTask: (id: string, taskId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistFilter: (id: string, filter: FilterValuesType) => void
    updateTodolistTitle: (id: string, title: string) => void
    updateTaskTitle: (id: string, taskId: string, title: string) => void
    updateTaskStatus: (id: string, taskId: string, isDone: boolean) => void
}
export const Todolist = (props: PropsType) => {
    const {
        todolists: {title, id, filter},
        tasks,
        addTask,
        removeTask,
        removeTodolist,
        changeTodolistFilter,
        updateTodolistTitle,
        updateTaskTitle,
        updateTaskStatus
    } = props
    const addTaskHandler = (title: string) => {
        addTask(id, title);
    }
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    const changeTodolistFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter(id, filter)
    }
    const changeTodolistTitleHandler = (title: string) => {
        updateTodolistTitle(id, title);
    }
    return (
        <div>
            <div className={'container'}>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                    <h3>
                        <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                    </h3>
                    <IconButton onClick={removeTodolistHandler}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
            <div>
                <AddItemForm onCreateItem={addTaskHandler}/>
            </div>
            <List>
                {tasks.length !== 0
                    ? tasks.map(el => {
                        const removeTaskHandler = () => {
                            removeTask(id, el.id)
                        }
                        const updateTaskTitleHandler = (title: string) => {
                            updateTaskTitle(id, el.id, title)
                        }
                        const updateTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            updateTaskStatus(id, el.id, e.currentTarget.checked)
                        }
                        return (
                            <ListItem key={el.id}
                                      sx={() => getListItemSx(el.isDone)}>
                                <div style={{display: 'flex'}}>
                                    <Checkbox onChange={updateTaskStatusHandler} checked={el.isDone}/>
                                    <EditableSpan value={el.title} onChange={updateTaskTitleHandler}/>
                                </div>

                                <IconButton color={'warning'} onClick={removeTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    }) :
                    <p>Task list is empty - add new task</p>}
            </List>

            <Box>
                <UniversalButton variant={filter === 'all' ? 'outlined' : 'text'} color={'success'} value={'All'}
                                 callback={() => changeTodolistFilterHandler('all')}/>
                <UniversalButton variant={filter === 'active' ? 'outlined' : 'text'} color={'primary'} value={'Active'}
                                 callback={() => changeTodolistFilterHandler('active')}/>
                <UniversalButton variant={filter === 'completed' ? 'outlined' : 'text'} color={'warning'}
                                 value={'Completed'}
                                 callback={() => changeTodolistFilterHandler('completed')}/>
            </Box>
        </div>
    );
};
