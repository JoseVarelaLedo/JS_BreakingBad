import './style.css'
// import javascriptLogo from './javascript.svg'
import bbLogo from './bb.svg'
// import { UsersApp } from './users/users-app';
import { BreakingbadApp } from './breakingbad/breakingbad-app';


document.querySelector('#app').innerHTML = `
  <div>
  
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${bbLogo}" class="logo vanilla" alt="Breaking Bad Logo" />
    </a>
    <h1 id="app-title">Htpp App</h1>
    <div class="card">
    
    </div>
    
  </div>
`;

const element = document.querySelector ('.card');

BreakingbadApp ( element );
// UsersApp ( element );


