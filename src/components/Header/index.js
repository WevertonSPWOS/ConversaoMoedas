import { Link } from "react-router-dom";
import './header.css';

function Header(){
    return(
        <div className="header">
            <Link className="link-header" to="/">Finance Exchange</Link>
            <Link className="link-home"   to="/">Home</Link>
        </div>
    );
}

export default Header;