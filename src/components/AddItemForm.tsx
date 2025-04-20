import {ChangeEvent, useState} from "react";
import {Button} from "./Button.tsx";

type PropsType = {
    onCreateItem: (title: string) => void
}
export const AddItemForm = (props: PropsType) => {
    const {onCreateItem} = props
    const [inputValue, setInputValue] = useState('');
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }
    const createItemHandler = () => {
        if (inputValue.length !== 0) {
            onCreateItem(inputValue);
            setInputValue('')
        }
    }
    return (
        <>
            <input value={inputValue} onChange={onChangeHandler} type="text"/>
            <Button text={'add'} callback={createItemHandler}/>
        </>
    );
};
