import rootReducer from "./store/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import {thunk} from 'redux-thunk'

const reduxStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk)); // Tạo store với rootReducer và applyMiddleware
    const persistor = persistStore(store); // Khởi tạo persistor cho việc lưu trữ Redux state

    return { store, persistor }; // Trả về store và persistor
}

export default reduxStore;
