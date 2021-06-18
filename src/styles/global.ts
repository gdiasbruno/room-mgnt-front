import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
   }

   body {
     background: #F5EDED;
     color: #B76DC2;
     -webkit-font-smoothing: antialiased;
   }

   body, input {
     font: 'Roboto Slab', sans-serif;
     font-size: 16px;
   }

   h1, h2, h3, h4, h5, h6, strong {
     font-weight: 500;
   }

   button {
     cursor: pointer;
   }

`;
