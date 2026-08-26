import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
    const navigate = useNavigate();

    const savedUser = localStorage.getItem("attendEaseUser");

    let user = {};

    if (savedUser) {
        try {
            user = JSON.parse(savedUser);
        } catch (error) {
            console.error("Unable to load profile:", error);
        }
    }

    const name = user.name || "Student";
    const email = user.email || "No email available";

    const handleLogout = () => {
        localStorage.removeItem("attendEaseLoggedIn");
        navigate("/login");
    };

    return (
        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-avatar">
                    {name.charAt(0).toUpperCase()}
                </div>

                <h1>My Profile</h1>

                <p className="profile-subtitle">
                    Manage your AttendEase account
                </p>

                <div className="profile-info">

                    <div className="profile-item">
                        <span>Name</span>
                        <strong>{name}</strong>
                    </div>

                    <div className="profile-item">
                        <span>Email</span>
                        <strong>{email}</strong>
                    </div>

                </div>

                <button
                    className="profile-back-btn"
                    onClick={() => navigate("/")}
                >
                    Back to Dashboard
                </button>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Profile;