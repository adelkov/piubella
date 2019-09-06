import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducers";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "./sagas/rootSaga";





export const configStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
};

