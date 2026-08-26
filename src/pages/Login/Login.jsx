import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(event) {
        event.preventDefault();

        setError("");

        if (email.trim() === "" || password.trim() === "") {
            setError("Please enter your email and password.");
            return;
        }

        const savedUser = localStorage.getItem("attendEaseUser");

        if (savedUser === null) {
            setError("No account found. Please sign up first.");
            return;
        }

        const user = JSON.parse(savedUser);

        if (
            email.trim().toLowerCase() ===
                String(user.email).trim().toLowerCase() &&
            password === String(user.password)
        ) {
            localStorage.setItem(
                "attendEaseLoggedIn",
                "true"
            );

            navigate("/");
            return;
        }

        setError("Incorrect email or password.");
    }

    return (
        <div className="login-page">

            <div className="login-card">

                <h1>
                    Welcome Back
                </h1>

                <p className="login-subtitle">
                    Login to your AttendEase account
                </p>


                <form onSubmit={handleLogin}>

                    <div className="login-field">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />

                    </div>


                    <div className="login-field">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            placeholder="Enter your password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />

                    </div>


                    {error !== "" && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}


                    <button
                        type="submit"
                        className="login-button"
                    >
                        Login
                    </button>

                </form>


                <p className="signup-text">
                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() => {
                            navigate("/signup");
                        }}
                    >
                        Sign up
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Login;