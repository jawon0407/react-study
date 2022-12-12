const React = require('react');
const ReactDom = require('react-dom/client');
import NumberBaseball from './numberbaseball';

ReactDom.createRoot(document.querySelector('#root')).render(<NumberBaseball />);