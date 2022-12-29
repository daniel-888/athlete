// routing
import Routes from 'routes';

// project imports
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import Snackbar from 'ui-component/extended/Snackbar';
import DragDialog from "ui-component/extended/Dialog";
import ThemeCustomization from 'themes';

// auth provider
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// ==============================|| APP ||============================== //

const App = () => (
  <ThemeCustomization>
      <Locales>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <NavigationScroll>
                  <AuthProvider>
                      <>
                          <Routes />
                          <Snackbar />
                          <DragDialog />
                      </>
                  </AuthProvider>
              </NavigationScroll>
          </LocalizationProvider>
      </Locales>
  </ThemeCustomization>
);

export default App;
