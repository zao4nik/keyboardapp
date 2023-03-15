import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StyledNavbar from './Navbar.styles';
// import Dropdown from '../Dropdown/Dropdown';

export default function Navbar() {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <StyledNavbar>
      <Link className="navLinks" to="/">
        <h2>
          Play
        </h2>
      </Link>

      {user ? (
        <Link className="navLinks" to="/stats">
          <h2>
            My stats
          </h2>
        </Link>
      ) : (
        <Link className="navLinks" to="/signup">
          <h2>
            Get stats
          </h2>
        </Link>
      )}

      <Link className="navLinks" to="/">
        <h2>
          I want to practice...
        </h2>
      </Link>
    </StyledNavbar>
  );
}
