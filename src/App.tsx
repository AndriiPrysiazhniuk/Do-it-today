import './App.css'
import {Todolist} from './components/Todolist'
import {useState} from "react";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm.tsx";

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
            <div>
                <h1>Type something</h1>
                <AddItemForm onCreateItem={addTodolist}/>
            </div>
            <div className={'container'}>
                {todolists.map(el => {
                    const updateTaskStatus = (id: string, taskId: string, status: boolean) => {
                        setTasks({...tasks, [id]: tasks[id].map(el => el.id === taskId ? {...el, isDone: status} : el)})
                    }
                    let filteredTasks = tasks[el.id]
                    if (el.filter === 'active') {
                        filteredTasks = tasks[el.id].filter(el => !el.isDone)
                    }
                    if (el.filter === 'completed') {
                        filteredTasks = tasks[el.id].filter(el => el.isDone)
                    }
                    return (
                        <div key={el.id}>
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
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default App
