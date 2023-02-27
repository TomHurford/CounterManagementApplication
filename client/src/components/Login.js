import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/user/login",
                { email, password }
            );
            localStorage.setItem("token", response.data.token);
            console.log(response.data.token);
            window.location.replace("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </label>
            <br />
            <button type="submit">Login</button>

            {/* Add a button to send the user to the sign up page */}
            <button type="button" onClick={() => window.location.replace("/signup")}>
                Sign Up
            </button>
        </form>
    );
}

export default Login;
