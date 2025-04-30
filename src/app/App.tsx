import './App.css'
import {Todolist} from '../features/todolists/ui/Todolists/Todolist.tsx'
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm.tsx";
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";
import {addTaskAC, removeTaskAC, updateTaskStatusAC, updateTaskTitleAC} from '../reducers/tasksReducer.ts';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from '../reducers/todolistsReducer.ts';
import {Header} from "@/common/components/Header/Header.tsx";

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
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const removeTask = (id: string, taskId: string) => {
        dispatch(removeTaskAC({id, taskId}))
    }
    const addTask = (id: string, title: string) => {
        dispatch(addTaskAC(id, title))
    }
    const addTodolist = (title: string) => {
        // const id = v1()
        dispatch(addTodolistAC(title));
    }
    const removeTodolist = (id: string) => {
        dispatch(removeTodolistAC({id}))
    }
    const changeTodolistFilter = (id: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }
    const updateTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }
    const updateTaskTitle = (id: string, taskId: string, title: string) => {
        dispatch(updateTaskTitleAC({id, taskId, title}))
    }
    return (
        <div className={'app'}>
          <Header/>
            <Container maxWidth="lg">
                <Grid sx={{mb: '30px'}} container>
                    <AddItemForm size={'medium'} sx={{backgroundColor: 'white', marginLeft: '20px'}}
                                 onCreateItem={addTodolist}/>
                </Grid>
                <div className={'container'}>
                    {todolists.map(el => {
                        const updateTaskStatus = (id: string, taskId: string, status: boolean) => {
                            dispatch(updateTaskStatusAC(id, taskId, status))
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


