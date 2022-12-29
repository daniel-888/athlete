// material-ui
import { createTheme } from '@mui/material/styles';

// assets
import defaultColor from 'assets/scss/_themes-vars.module.scss';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = () => {
    let colors = defaultColor

    return createTheme({
        palette: {
            mode: 'dark',
            common: {
                black: colors.darkPaper
            },
            primary: {
                light: colors.darkPrimaryLight,
                main: colors.darkPrimaryMain,
                dark: colors.darkPrimaryDark,
                200: colors.darkPrimary200,
                800: colors.darkPrimary800,
            },
            secondary: {
                light: colors.darkSecondaryLight,
                main: colors.darkSecondaryMain,
                dark: colors.darkSecondaryDark,
                200: colors.darkSecondary200,
                800: colors.darkSecondary800,
            },
            error: {
                light: colors.errorLight,
                main: colors.errorMain,
                dark: colors.errorDark
            },
            orange: {
                light: colors.orangeLight,
                main: colors.orangeMain,
                dark: colors.orangeDark
            },
            warning: {
                light: colors.warningLight,
                main: colors.warningMain,
                dark: colors.warningDark
            },
            success: {
                light: colors.successLight,
                200: colors.success200,
                main: colors.successMain,
                dark: colors.successDark
            },
            grey: {
                50: colors.grey50,
                100: colors.grey100,
                500: colors.darkTextSecondary,
                600: colors.darkTextTitle,
                700: colors.darkTextPrimary,
                900: colors.darkTextPrimary,
            },
            dark: {
                light: colors.darkTextPrimary,
                main: colors.darkLevel1,
                dark: colors.darkLevel2,
                800: colors.darkBackground,
                900: colors.darkPaper
            },
            text: {
                primary: colors.darkTextPrimary,
                secondary: colors.darkTextSecondary,
                dark: colors.darkTextPrimary,
                hint: colors.grey100
            },
            divider: colors.darkTextPrimary,
            background: {
                paper: colors.darkLevel2,
                default: colors.darkPaper,
            }
        }
    });
};

export default Palette;
