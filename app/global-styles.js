import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f4f6f8;
    color: #333;
    line-height: 1.6;
  }

  body.fontLoaded {
    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #f4f6f8;
    min-height: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
  }

  p,
  label {
    font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    color: #1a202c;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

export default GlobalStyle;
