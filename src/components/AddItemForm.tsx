import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox'
import IconButton from '@mui/material/IconButton'

type PropsType = {
    onCreateItem: (title: string) => void
}
export const AddItemForm = (props: PropsType) => {
    const {onCreateItem} = props
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
                       helperText={!!error}
                       variant={'outlined'}
                       className={error ? 'error' : ''}
                       value={inputValue}
                       onChange={onChangeHandler}
                       size={'small'}/>
            <IconButton color={'success'} onClick={createItemHandler}>
                <AddBoxIcon/>
            </IconButton>
        </div>
    );
};
