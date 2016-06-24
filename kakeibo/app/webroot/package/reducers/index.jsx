import { combineReducers } from 'redux';
import monthly from './monthly';
import drawmenu from './drawmenu';
import edit from './edit';
import del from './del';
import year from './year';
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
    monthly,
    drawmenu,
    edit,
    del,
    year,
    routing: routerReducer
});

export default rootReducer;
