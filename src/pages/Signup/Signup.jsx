import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

import logo from "../../assets/attendease-logo.png";


function Signup() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");


    const handleSignup = (event) => {

        event.preventDefault();

        setError("");


        /* CHECK EMPTY FIELDS */

        if (
            name.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "" ||
            confirmPassword.trim() === ""
        ) {
            setError("Please fill in all fields.");
            return;
        }


        /* CHECK PASSWORD LENGTH */

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }


        /* CHECK PASSWORD */

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        /* CHECK EXISTING ACCOUNT */

        const existingUser =
            localStorage.getItem("attendEaseUser");


        if (existingUser) {

            try {

                const user =
                    JSON.parse(existingUser);


                if (
                    String(user.email)
                        .trim()
                        .toLowerCase() ===
                    email.trim().toLowerCase()
                ) {

                    setError(
                        "An account with this email already exists."
                    );

                    return;
                }

            } catch (error) {

                console.error(
                    "Unable to read existing user:",
                    error
                );

            }
        }


        /* CREATE USER */

        const user = {

            name: name.trim(),

            email:
                email
                    .trim()
                    .toLowerCase(),

            password: password

        };


        /* SAVE USER */

        localStorage.setItem(
            "attendEaseUser",
            JSON.stringify(user)
        );


        /* LOGIN USER */

        localStorage.setItem(
            "attendEaseLoggedIn",
            "true"
        );


        /* GO TO DASHBOARD */

        navigate("/");

    };


    return (

        <div className="signup-page">

            <div className="signup-card">


                {/* LOGO */}

                <div className="signup-logo">

                    <img
                        src={logo}
                        alt="AttendEase Logo"
                        className="signup-logo-image"
                    />

                </div>


                {/* HEADING */}

                <h1>
                    Create Account
                </h1>


                <p className="signup-subtitle">
                    Create your AttendEase account
                </p>


                <form onSubmit={handleSignup}>


                    {/* NAME */}

                    <div className="signup-field">

                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="signup-field">

                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="signup-field">

                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div className="signup-field">

                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    {/* ERROR */}

                    {error && (

                        <p className="signup-error">
                            {error}
                        </p>

                    )}


                    {/* SIGNUP BUTTON */}

                    <button
                        type="submit"
                        className="signup-button"
                    >
                        Create Account
                    </button>


                </form>


                {/* LOGIN */}

                <p className="login-text">

                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/login")
                        }
                    >
                        Login
                    </button>

                </p>


            </div>

        </div>

    );

}


export default Signup;