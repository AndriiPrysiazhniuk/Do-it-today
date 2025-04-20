type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
type PropsType = {
    title: string;
    tasks: TaskType[];
}
export const Todolist = (props: PropsType) => {
    const {title, tasks} = props
    return (
        <div>
            <div>
                <h3>
                    {title}
                </h3>
                <div>
                    <input type="text"/>
                    <div>
                        <ul>
                            {tasks.map(el => {
                                return (
                                    <li key={el.id}>
                                        <input type="checkbox" checked={el.isDone}/>
                                        <span>{el.title}</span>
                                        <button>X</button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
