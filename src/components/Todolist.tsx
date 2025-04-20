import {TaskType, TodolistType} from "../App.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {Button} from "./Button.tsx";

type PropsType = {
    todolists: TodolistType;
    tasks: TaskType[];
    addTask: (id: string, title: string) => void;
    removeTodolist: (id: string) => void;
}
export const Todolist = (props: PropsType) => {
    const {
        todolists: {title, id},
        tasks,
        addTask,
        removeTodolist
    } = props
    const addTaskHandler = (title: string) => {
        addTask(id, title);
    }
    const removeTodolistHandler = () => {
        removeTodolist(id)
    }
    return (
        <div className={'todolist'}>
            <div>
                <h3>
                    {title}
                    <Button text={'x'} callback={removeTodolistHandler}/>
                </h3>
                <div>
                    <AddItemForm onCreateItem={addTaskHandler}/>
                    {tasks.length !== 0
                        ? tasks.map(el => {
                            return (
                                <ul key={el.id}>
                                    <li>
                                        <input type="checkbox" checked={el.isDone}/>
                                        <span>{el.title}</span>
                                        <Button text={'x'} callback={() => {
                                        }}/>
                                    </li>
                                </ul>
                            )
                        }) :
                        <h3>Task list is empty - add new task</h3>}
                    <div>
                        <Button text={'All'} callback={() => {
                        }}/>
                        <Button text={'Active'} callback={() => {
                        }}/>
                        <Button text={'Completed'} callback={() => {
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
