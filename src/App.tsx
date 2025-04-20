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

    let todolistId1 = v1()
    let todolistId2 = v1()
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

    const addTodolist = (title: string) => {
        const newTodolist: TodolistType = {
            id: v1(),
            title,
            filter: 'all'
        }
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolist.id]: []});
    }
    const addTask = (id: string, title: string) => {
        const newTask: TaskType = {
            id: v1(), title, isDone: false
        }
        setTasks({...tasks, [id]: [...tasks[id], newTask]})
    }
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(el => el.id !== id))
    }
    return (
        <div className={'app'}>
            <div>
                <h1>Type something</h1>
                <AddItemForm onCreateItem={addTodolist}/>
            </div>
            <div className={'container'}>
                {todolists.map(el => {
                    return (
                        <div key={el.id}>
                            <Todolist todolists={el}
                                      addTask={addTask}
                                      tasks={tasks[el.id]}
                                      removeTodolist={removeTodolist}/>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default App
