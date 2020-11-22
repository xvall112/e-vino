import React from "react";
import { createGlobalStyle } from "styled-components";

//provider

const GlobalStyle = createGlobalStyle`
/*
=============== 
Variables
===============
*/

:root {
    /* primary/main color */
    --clr-primary:#a1806a;
    --clr-secondary: #546e7a;
    --clr-third: #221E20;
    --clr-fourth: #ffffff;
    --clr-background: #f8f8f8;
    --clr-gradient:linear-gradient(
      129deg,
      rgba(84, 110, 122, 1) 0%,
      rgba(161, 128, 106, 1) 50%,
      rgba(255, 251, 51, 1) 100%
    );
  }
  /*
  =============== 
  Global Styles
  ===============
  */
  
  *,
  ::after,
  ::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background: white;
    color: var(--clr-grey-1);
    
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  }
  ul {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    text-shadow:none;
    background-image: none;
    color: inherit;
  }
  img {
    
    display: block;
  }
  code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
  
  /*  global classes */
  
  .btn {
    text-transform: uppercase;
  
    color: var(--clr-primary);
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--spacing);
    display: inline-block;
    font-weight: 400;
    transition: var(--transition);
    font-size: 0.875rem;
    border: 2px solid transparent;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: var(--radius);
  }
`;

export default GlobalStyle;
