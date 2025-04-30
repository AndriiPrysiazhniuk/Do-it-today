import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        todolists.map(el => {
            return (
                <Grid key={el.id}>
                    <Paper sx={{padding: '0 20px 20px 20px', margin: '20px'}}>
                        <TodolistItem todolist={el}/>
                    </Paper>
                </Grid>
            )
        })
    )
}