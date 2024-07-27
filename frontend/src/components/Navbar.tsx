import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/words" className='nav-link'>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/demo" className='nav-link'>Demo</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
