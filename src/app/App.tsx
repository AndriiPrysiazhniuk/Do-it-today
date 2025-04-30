import './App.css'
import {Header} from "@/common/components/Header/Header.tsx";
import {Main} from "@/app/Main.tsx";

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

    return (
        <div className={'app'}>
            <Header/>
            <Main/>
        </div>
    )
}

export default App


