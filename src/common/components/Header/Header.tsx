import {Container, IconButton} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {containerSx} from "@/common/components/Header/containerSx.styles.ts";
import MenuIcon from "@mui/icons-material/Menu";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";

export const Header = () => {
    const dispatch = useAppDispatch()
    const themeMode = useAppSelector(selectThemeMode)
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
                        <Switch color={'default'} onChange={changeMode}/>
                        {/*<CustomSwitch/>*/}
                        <Button color="inherit">Sign in</Button>
                        <Button color="inherit">Sign up</Button>
                        <Button color="inherit">Faq</Button>
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    );
};
