import {FilterValuesType, TaskType, TodolistType} from "../App.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {Button} from "./Button.tsx";

type PropsType = {
    todolists: TodolistType;
    tasks: TaskType[];
    addTask: (id: string, title: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistFilter: (id: string, filter: FilterValuesType) => void
}
export const Todolist = (props: PropsType) => {
    const {
        todolists: {title, id},
        tasks,
        addTask,
        removeTodolist,
        changeTodolistFilter,
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
                        <Button text={'All'} callback={() => changeTodolistFilterHandler('all')}/>
                        <Button text={'Active'} callback={() => changeTodolistFilterHandler('active')}/>
                        <Button text={'Completed'} callback={() => changeTodolistFilterHandler('completed')}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
