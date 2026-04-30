/* === Main App Component, controls: user authentication state & switching between Login and Game screens === */
import { useState, useEffect } from "react";
import Login from "./Components/Login.jsx";
import Game from "./Components/Game.jsx";

function App() {

/* === User State, stores the currently logged-in user, null = no user logged in === */
  const [user, setUser] = useState(null);

/* === Load Saved User (on app start), checks localStorage for saved login, keeps user logged in after refresh === */
useEffect(() => {
  const savedUser = localStorage.getItem("currentUser");
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}
, []);

/* === Conditional Rendering, if no user-> show Login screen, if user exists -> show Game === */
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
