import './App.css'
import {Todolist} from './components/Todolist'
import {useReducer} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm.tsx";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {containerSx} from "./utils/containerSx.styles.ts";
import {CustomSwitch} from "./components/Switch.tsx";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./reducers/todolistsReducer.ts";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskStatusAC, updateTaskTitleAC} from "./reducers/tasksReducer.ts";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export type TasksStateType = Record<string, TaskType[]>

function App() {

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})

    const removeTask = (id: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(id, taskId))
    }
    const addTask = (id: string, title: string) => {
        dispatchToTasks(addTaskAC(id, title))
    }
    const addTodolist = (title: string) => {
        const id = v1()
        dispatchToTodolists(addTodolistAC(id, title));
        dispatchToTasks(addTodolistAC(id, title));
    }
    const removeTodolist = (id: string) => {
        dispatchToTodolists(removeTodolistAC(id))
    }
    const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
        dispatchToTodolists(changeTodolistFilterAC(id, filter))
    }
    const updateTodolistTitle = (id: string, todolistTitle: string) => {
        dispatchToTodolists(changeTodolistTitleAC(id, todolistTitle))
    }
    const updateTaskTitle = (id: string, taskId: string, title: string) => {
        dispatchToTasks(updateTaskTitleAC(id, taskId, title))
    }
    return (
        <div className={'app'}>
            <AppBar position="static" sx={{backgroundColor: '#538c56', mb: '30px'}}>
                <Toolbar>
                    <Container maxWidth="lg" sx={containerSx()}>
                        <IconButton color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <div>
                            <CustomSwitch/>
                            <Button color="inherit">Sign in</Button>
                            <Button color="inherit">Sign up</Button>
                            <Button color="inherit">Faq</Button>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Grid sx={{mb: '30px'}} container>
                    <AddItemForm size={'medium'} sx={{backgroundColor: 'white', marginLeft: '20px'}}
                                 onCreateItem={addTodolist}/>
                </Grid>
                <div className={'container'}>
                    {todolists.map(el => {
                        const updateTaskStatus = (id: string, taskId: string, status: boolean) => {
                            dispatchToTasks(updateTaskStatusAC(id, taskId, status))
                        }
                        let filteredTasks = tasks[el.id]
                        if (el.filter === 'active') {
                            filteredTasks = tasks[el.id].filter(el => !el.isDone)
                        }
                        if (el.filter === 'completed') {
                            filteredTasks = tasks[el.id].filter(el => el.isDone)
                        }
                        return (
                            <Grid key={el.id}>
                                <Paper sx={{padding: '0 20px 20px 20px', margin: '20px'}}>
                                    <Todolist todolists={el}
                                              tasks={filteredTasks}
                                              addTask={addTask}
                                              removeTask={removeTask}
                                              removeTodolist={removeTodolist}
                                              changeTodolistFilter={changeTodolistFilter}
                                              updateTodolistTitle={updateTodolistTitle}
                                              updateTaskTitle={updateTaskTitle}
                                              updateTaskStatus={updateTaskStatus}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}

export default App
