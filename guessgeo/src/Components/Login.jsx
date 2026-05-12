/* === Login Component, handles login + sign up using localStorage === */
import {useState} from "react";

function Login({setUser}) {

    /* === Form State === */
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    /* === Form Submission Handler, handles both login and sign up === */
    const handleSubmit = (e) => {
        // Prevent page refresh
        e.preventDefault();

        // Validation: make sure fields are filled
        if (!username || !password) {
            alert("Please fill in both fields");
        return;
        }

        /* === Login Flow  === */
        if (isLogin) {
        
        // Get stored user from localStorage
        const storedUser = JSON.parse(localStorage.getItem(username));

        // Check if user exists and password matches
        if (storedUser && storedUser.password === password) {
                // Log user in
                setUser(storedUser);
                } else {
                    alert("Invalid login");
                }
        }

        /* === Sign Up Flow === */
        else {

            // Create new user object
            const newUser = { username, password };

            // Save user in localStorage
            localStorage.setItem(username, JSON.stringify(newUser));

            // Log them in immediately
            setUser(newUser);
        }
    };

    /* === UI Render === */
    return (
        <div className="auth-container">
            <div className="auth-card">
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>

            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {!isLogin && (
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) = setEmail(e.target.value)}
                    />
                )}

                <button type="submit">
                    {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>

            <p onClick={() => setIsLogin(!isLogin)}>

                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
            </p>
            </div>
        </div>
    );
}

export default Login;