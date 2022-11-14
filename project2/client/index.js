'use strict';
const { initEventListener, fetchSession } = require('./src/controller');
const render = require('./src/react');

fetchSession().then(() => render());
render();
initEventListener();
