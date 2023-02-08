import { TActionsBurgerConstructor } from '../actions/burgerConstructor';
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from 'redux';
import store from '../store';
import rootReducer from '../reducers';

type TApplicationActions = TActionsBurgerConstructor;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
