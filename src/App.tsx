import './App.css'
import {Todolist} from './components/Todolist'
import {useState} from "react";
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

    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: 'Todolist 1', filter: 'all'},
        {id: todolistId2, title: 'Todolist 2', filter: 'all'},
    ]);
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })
    const removeTask = (id: string, taskId: string) => {
        setTasks({...tasks, [id]: tasks[id].filter(el => el.id !== taskId)})
    }
    const addTask = (id: string, title: string) => {
        const newTask: TaskType = {
            id: v1(), title, isDone: false
        }
        setTasks({...tasks, [id]: [...tasks[id], newTask]})
    }
    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {
            id: v1(),
            title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolist.id]: []});
    }
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(el => el.id !== id))
    }
    const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
        setTodolists(todolists.map(el => el.id === id ? {...el, filter} : el))
    }
    const updateTodolistTitle = (id: string, todolistTitle: string) => {
        todolists.map(el => el.id === id ? {...el, title: todolistTitle} : el)
    }
    const updateTaskTitle = (id: string, taskId: string, title: string) => {
        return setTasks({...tasks, [id]: tasks[id].map(el => el.id === taskId ? {...el, title} : el)})
    }
    return (
        <div className={'app'}>
            <AppBar position="static" sx={{backgroundColor: '#538c56', mb: '30px'}}>
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Button color="inherit">Sign in</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Grid sx={{mb: '30px'}} container>
                    <AddItemForm size={'medium'} sx={{backgroundColor: 'white', marginLeft:'20px'}} onCreateItem={addTodolist}/>
                </Grid>
                <div className={'container'}>
                    {todolists.map(el => {
                        const updateTaskStatus = (id: string, taskId: string, status: boolean) => {
                            setTasks({
                                ...tasks,
                                [id]: tasks[id].map(el => el.id === taskId ? {...el, isDone: status} : el)
                            })
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
