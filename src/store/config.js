import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const middlewares = [thunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

export const store = createStore(reducers, composedEnhancers);
export const persistor = persistStore(store);

export default store;