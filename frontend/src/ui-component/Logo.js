// material-ui
import { useTheme } from '@mui/material/styles';
import icon from '../assets/images/logo.svg';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return <img src={icon} alt="" style={{ height: 40 }} />;
};

export default Logo;
