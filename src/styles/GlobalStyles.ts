import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
    width: 100%;
  }
  body {
    background: black;
  }
  *, button, input {
    font-family: -apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Fira Sans,Ubuntu,Oxygen,Oxygen Sans,Cantarell,Droid Sans,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Lucida Grande,Helvetica,Arial,sans-serif;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    opacity: 0;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 20px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
`;