import {ChangeEvent, useState} from "react";

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
                <input value={inputValue}
                       onChange={changeInputValue}
                       onBlur={turnOffEditMode}
                       autoFocus
                       type="text"/>
            ) : (
                <span onDoubleClick={turnOnEditMode}>
                    {inputValue}
                </span>
            )}
        </>
    )
}