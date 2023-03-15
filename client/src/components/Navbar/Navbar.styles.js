/* eslint-disable import/no-extraneous-dependencies */
import styled from 'styled-components';

const StyledNavbar = styled.div`
background-color: #4a4a4a;
list-style-type: none;
margin: 0;
padding: 0;
width: 25%;
height: 100%; /* Full height */
position: fixed; /* Make it stick, even on scroll */
overflow: auto; /* Enable scrolling if the sidenav has too much content */

h2 {
    margin: 30px;
}

.navLinks {
    text-decoration: none;
    margin: 0 10px;
    display: inline-block;
    position: relative;
    color: #0087ca;
}

.navLinks::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: #0087ca;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

.navLinks:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}

`;

export default StyledNavbar;
