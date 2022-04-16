import { Provider } from 'react-redux';    // <provider> => apk에 redux 연결
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';    // 원래 './_reducers/index.js'이지만 생략가능=자동인식

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
// import 'antd/dist/antd.css';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
//단순 createStore는 object 밖에 못 받으므로 미들웨어(promiseMiddleware, ReduxThunk) 추가

root.render(
    <Provider store={createStoreWithMiddleware(Reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__ ()     // 확장도구(redux_devtool) 연결
        )}
    >
        
        <App/>
    </Provider>
);

reportWebVitals();
