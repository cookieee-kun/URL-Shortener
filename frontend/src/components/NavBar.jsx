import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-6">
        <li>
          <Link 
            to="/login" 
            className="text-white hover:text-gray-300 transition"
          >
            Login
          </Link>
        </li>
        <li>
          <Link 
            to="/" 
            className="text-white hover:text-gray-300 transition"
          >
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
