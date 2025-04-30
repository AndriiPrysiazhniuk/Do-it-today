import {Container, IconButton} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {containerSx} from "@/utils/containerSx.styles.ts";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {CustomSwitch} from "@/common/components/Switch/Switch.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";

export const Header = () => {
    const dispatch = useAppDispatch()
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)
    const changeMode = () => {
        dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
    }
    return (
        <AppBar position="static" sx={{backgroundColor: '#538c56', mb: '30px'}}>
            <Toolbar>
                <Container maxWidth="lg" sx={containerSx()}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <CustomSwitch/>
                        <Button color="inherit">Sign in</Button>
                        <Button color="inherit">Sign up</Button>
                        <Button color="inherit">Faq</Button>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
