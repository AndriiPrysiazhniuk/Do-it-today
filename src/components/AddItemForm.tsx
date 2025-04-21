import {ChangeEvent, KeyboardEvent, useState} from "react";
import {SxProps, TextField, Theme} from "@mui/material";
import {UniversalButton} from "./UniversalButton.tsx";
import {OverridableStringUnion} from "@mui/types";
import {TextFieldPropsSizeOverrides} from "@mui/material";
import {ButtonSx} from "../utils/Button.styles.ts";

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
    const onEnterClickHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key == 'Enter') {
            createItemHandler();
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
                       onKeyDown={onEnterClickHandler}
                       autoFocus
                       size={size}/>
            <UniversalButton variant={'outlined'}
                             sx={ButtonSx()}
                             size={'small'}
                             color={'success'}
                             value={'+'}
                             callback={createItemHandler}/>
        </div>
    );
};
