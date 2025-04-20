import {FilterValuesType, TaskType, TodolistType} from "../App.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {Button} from "./Button.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type PropsType = {
    todolists: TodolistType;
    tasks: TaskType[];
    addTask: (id: string, title: string) => void;
    removeTask: (id: string, taskId: string) => void;
    removeTodolist: (id: string) => void;
    changeTodolistFilter: (id: string, filter: FilterValuesType) => void
    updateTodolistTitle: (id: string, title: string) => void
}
export const Todolist = (props: PropsType) => {
    const {
        todolists: {title, id},
        tasks,
        addTask,
        removeTask,
        removeTodolist,
        changeTodolistFilter,
        updateTodolistTitle,
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
    const changeTodolistTitleHandler = (title: string) => {
        updateTodolistTitle(id, title);
    }
    return (
        <div className={'todolist'}>
            <div>
                <h3>
                    <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
                    <Button text={'x'} callback={removeTodolistHandler}/>
                </h3>
                <div>
                    <AddItemForm onCreateItem={addTaskHandler}/>
                    {tasks.length !== 0
                        ? tasks.map(el => {
                            const removeTaskHandler = () => {
                                removeTask(id, el.id)
                            }
                            return (
                                <ul key={el.id}>
                                    <li>
                                        <input type="checkbox" checked={el.isDone}/>
                                        <EditableSpan value={el.title} onChange={()=>{}}/>
                                        <Button text={'x'} callback={removeTaskHandler}/>
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
