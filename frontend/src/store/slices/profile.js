// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: {},
    sports: [],
    athlete: {},
    athletes: [],
    loading: false
};

const profile = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // SET LOADING
        setLoading(state, action) {
            state.loading = action.payload;
        },

        // GET SPORTS
        getSportsSuccess(state, action) {
            state.sports = action.payload;
        },

        // CREATE ATHLETE SUCCESS
        createAthleteSuccess(state, action) {
            state.athlete = action.payload;
            state.error = {};
        },

        // GET ATHLETES LIST
        getListSuccess(state, action) {
            state.athletes = action.payload;
            state.error = {};
        }
    }
});

// Reducer
export default profile.reducer;

export const { hasError } = profile.actions;

// ----------------------------------------------------------------------

export function getSports() {
    return async () => {
        try {
            const response = await axios.get('/sports');
            dispatch(profile.actions.getSportsSuccess(response.data));
        } catch (error) {
            dispatch(profile.actions.hasError(error));
        }
    };
}

export function createAthlete(data, afterAction) {
    return async () => {
        try {
            const response = await axios.post('/athlete/save', data, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            afterAction();
            dispatch(profile.actions.createAthleteSuccess(response.data));
        }
        catch(err) {
            dispatch(profile.actions.hasError(err));
        }
    }
}

export function getList(afterAction) {
    return async () => {
        try {
            const response = await axios.get('/athlete/list');
            dispatch(profile.actions.getListSuccess(response.data));
            afterAction()
        }
        catch(err) {
            dispatch(profile.actions.hasError(err))
        }
    }
}
