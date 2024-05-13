import { configureStore } from '@reduxjs/toolkit';
//import { keplerGlReducer, enhanceReduxMiddleware } from '@kepler.gl/reducers';
import keplerGlReducer, {enhanceReduxMiddleware} from '@kepler.gl/reducers';

const middlewares = enhanceReduxMiddleware([]);
const store = configureStore({
  reducer: {
    keplerGl: keplerGlReducer,
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware().concat(middlewares),
});

export default store;
