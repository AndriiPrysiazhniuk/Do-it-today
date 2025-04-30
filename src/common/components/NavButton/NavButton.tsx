import {SxProps, Theme} from "@mui/material";
import Button from "@mui/material/Button";

type PropsType = {
    value: string
    variant?: 'text' | 'outlined' | 'contained'
    size?: 'small' | 'medium' | 'large'
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    sx?: SxProps<Theme> | undefined
    callback?: () => void
}
export const NavButton = (props: PropsType) => {
    const {
        value,
        color,
        size,
        variant,
        sx,
        callback
    } = props
    const onClickHandler = () => {
        callback?.()
    }
    return (
        <Button sx={sx}
                size={size}
                variant={variant}
                color={color}
                onClick={onClickHandler}>
            {value}
        </Button>
    )
}