/* Main application component */
import { useState, useEffect } from "react";
import Login from "./Components/Login.jsx";
import Game from "./Components/Game.jsx";

function App() {

/* Active user state */
  const [user, setUser] = useState(null);

/* Restore saved user session */
useEffect(() => {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}
, []);

/* Render login or game screen */
return (
  <div>
    {!user ? (
      <Login setUser={setUser} />
    ) : (
      <Game user={user} />
    )}
  </div>
);
}

export default App
