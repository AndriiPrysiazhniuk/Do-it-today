import {addTaskAC, removeTaskAC, updateTaskStatusAC, updateTaskTitleAC} from "@/reducers/tasksReducer.ts";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "@/features/todolists/ui/Todolists/Todolist.tsx";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "@/reducers/todolistsReducer.ts";
import {FilterValuesType} from "@/app/App.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    const removeTask = (id: string, taskId: string) => {
        dispatch(removeTaskAC({id, taskId}))
    }
    const addTask = (id: string, title: string) => {
        dispatch(addTaskAC(id, title))
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
        todolists.map(el => {
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
        })
    )
}