import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav
            style={{
                display: "flex",
                gap: "20px",
                padding: "15px",
                background: "#1e293b",
                color: "white"
            }}
        >

            <Link
                to="/"
                style={{ color: "white" }}
            >
                Live Monitor
            </Link>

            <Link
                to="/dashboard"
                style={{ color: "white" }}
            >
                Dashboard
            </Link>

            <Link
                to="/analytics"
                style={{ color: "white" }}
            >
                Analytics
            </Link>

            <Link
                to="/reports"
                style={{ color: "white" }}
            >
                Reports
            </Link>

            <Link
                to="/prediction"
                style={{ color: "white" }}
            >
                AI Prediction
            </Link>

        </nav>

    );

}

export default Navbar;