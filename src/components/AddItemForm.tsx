import {ChangeEvent, useState} from "react";
import {Button} from "./Button.tsx";

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
        <>
            <input value={inputValue} onChange={onChangeHandler} type="text"/>
            <Button text={'add'} callback={createItemHandler}/>
            {error && <div className={error ? 'error' : ''}>{error}</div>}
        </>
    );
};
