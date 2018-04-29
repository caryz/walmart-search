import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import WalmartService from './api/WalmartService';

const walmartService = new WalmartService();

ReactDOM.render(
  <App service={walmartService} />,
  document.getElementById('root')
);

registerServiceWorker();
