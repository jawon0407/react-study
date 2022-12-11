const React = require('react');
const ReactDom = require('react-dom/client');
const NumberBaseball = require('./NumberBaseball');

ReactDom.createRoot(document.querySelector('#root')).render(<NumberBaseball />);