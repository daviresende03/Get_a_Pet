import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                <li>
                    <Link to="/">Entrar</Link>
                </li>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar