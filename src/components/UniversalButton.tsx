import Button from "@mui/material/Button";

type PropsType = {
    value: string
    variant?: 'text' | 'outlined' | 'contained'
    size?: 'small' | 'medium' | 'large'
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    callback: () => void
}
export const UniversalButton = (props: PropsType) => {
    const {
        value,
        color,
        size,
        variant,
        callback
    } = props
    const onClickHandler = () => {
        callback()
    }
    return (
        <Button size={size}
                variant={variant}
                color={color}
                onClick={onClickHandler}>
            {value}
        </Button>
    )
}