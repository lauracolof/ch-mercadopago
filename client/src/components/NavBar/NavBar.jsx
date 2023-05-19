import './NavBar.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
  return (
    <div>
      <nav>
        <ul>
          <li className='home'>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/cart'}>
              <button>
                <FontAwesomeIcon icon={faShoppingCart} />
                Cart
              </button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
