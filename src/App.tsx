import './App.css'
import {Todolist} from './components/Todolist'
import {useState} from "react";
import {v1} from "uuid";

function App() {
const [tasks, setTasks] = useState([
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "ReactJS", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
])
    return (
        <>
            <Todolist title={'New Todolist'} tasks={tasks}/>
        </>
    )
}

export default App
