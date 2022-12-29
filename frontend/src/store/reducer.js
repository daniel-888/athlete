// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducers
import snackbarReducer from './slices/snackbar';
import dialogReducer from './slices/dialog';
import profileReducer from './slices/profile';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    dialog: dialogReducer,
    profile: profileReducer,
});

export default reducer;
