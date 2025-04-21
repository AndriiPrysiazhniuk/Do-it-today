import {ChangeEvent, useState} from "react";
import {SxProps, TextField, Theme} from "@mui/material";
import {UniversalButton} from "./UniversalButton.tsx";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material";

type PropsType = {
    onCreateItem: (title: string) => void
    size?: OverridableStringUnion<'small' | 'medium', TextFieldPropsSizeOverrides>
    sx?: SxProps<Theme> | undefined
}
export const AddItemForm = (props: PropsType) => {
    const {onCreateItem, sx, size} = props
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
        setError(null);
    }
    const createItemHandler = () => {
        const trimmedInputValue = inputValue.trim();
        if (trimmedInputValue !== '') {
            onCreateItem(trimmedInputValue);
            setInputValue('')
        } else {
            setError('Title is required');
        }
    }
    return (
        <div style={{display: 'flex', alignItems: 'center'}}>
            <TextField label={'Enter a title'}
                       variant={'outlined'}
                       helperText={!!error}
                       sx={sx}
                       value={inputValue}
                       onChange={onChangeHandler}
                       autoFocus
                       size={size}/>
            <UniversalButton variant={'outlined'}
                             sx={{
                                 borderRadius: '50%',
                                 minWidth: '30px',
                                 minHeight: '30px',
                                 marginLeft: '15px',
                                 backgroundColor: 'white'
                             }}
                             size={'small'}
                             color={'success'}
                             value={'+'}
                             callback={createItemHandler}/>
            {/*<IconButton color={'success'} onClick={createItemHandler}>*/}
            {/*    <AddBoxIcon/>*/}
            {/*</IconButton>*/}
        </div>
    );
};
