import Grid from "@mui/material/Grid";
import {AddItemForm} from "@/common/components/AddItemForm/AddItemForm.tsx";
import Container from "@mui/material/Container";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {addTodolistAC} from "@/reducers/todolistsReducer.ts";
import {Todolists} from "@/Todolists.tsx";

export const Main = () => {
    const dispatch = useAppDispatch()
    const addTodolist = (title: string) => {
        // const id = v1()
        dispatch(addTodolistAC(title));
    }

    return (
        <Container maxWidth="lg">
            <Grid sx={{mb: '30px'}} container>
                <AddItemForm size={'medium'} sx={{backgroundColor: 'white', marginLeft: '20px'}}
                             onCreateItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
               <Todolists/>

            </Grid>
        </Container>
    )
}