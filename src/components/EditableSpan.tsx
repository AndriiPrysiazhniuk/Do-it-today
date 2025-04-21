import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type PropsType = {
    value: string;
    onChange: (value: string) => void;
}
export const EditableSpan = (props: PropsType) => {
    const {value, onChange} = props
    const [inputValue, setInputValue] = useState(value)
    const [isEditMode, setIsEditMode] = useState(false)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        onChange(inputValue)
    }

    const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    return (
        <>
            {isEditMode ? (
                <TextField color={'success'}
                           variant={'filled'}
                           value={inputValue}
                           onChange={changeInputValue}
                           onBlur={turnOffEditMode}
                           autoFocus/>
            ) : (
                <span onDoubleClick={turnOnEditMode}>
                    {inputValue}
                </span>
            )}
        </>
    )
}