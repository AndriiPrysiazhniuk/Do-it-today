type PropsType = {
    text: string
    callback: () => void
}
export const Button = (props: PropsType) => {
    const {
        text,
        callback
    } = props
    const onClickHandler = () => {
        callback()
    }
    return (
        <button onClick={onClickHandler}>{text}</button>
    )
}