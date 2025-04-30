import Box from "@mui/material/Box";
import {NavButton} from "@/common/components/NavButton/NavButton.tsx";
import {changeTodolistFilterAC, FilterValuesType, TodolistType} from "@/features/todolists/model/todolistsReducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type PropsType = {
    todolist: TodolistType
}
export const FilterButtons = (props: PropsType) => {
    const {
        todolist: {
            id,
            filter
        }
    } = props
    const dispatch = useAppDispatch()
    const changeTodolistFilter = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id, filter}))
    }

    return (
        <Box>
            <NavButton variant={filter === 'all' ? 'outlined' : 'text'} color={'success'} value={'All'}
                       callback={() => changeTodolistFilter('all')}/>
            <NavButton variant={filter === 'active' ? 'outlined' : 'text'} color={'primary'}
                       value={'Active'}
                       callback={() => changeTodolistFilter('active')}/>
            <NavButton variant={filter === 'completed' ? 'outlined' : 'text'} color={'warning'}
                       value={'Completed'}
                       callback={() => changeTodolistFilter('completed')}/>
        </Box>
    )
}