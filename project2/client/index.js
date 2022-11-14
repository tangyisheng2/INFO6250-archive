'use strict';
const { initEventListener, fetchSession } = require('./src/controller');
const render = require('./src/react');

initEventListener();
fetchSession().then(() => render());
render();
