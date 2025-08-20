import { useState, useEffect } from "react";

// Components
import Register from "./pages/Register";
import Home from "./pages/Home";
import BackgroundCircles from "./animations/BackgroundCircles";

// Styles
import "./App.css"

function App() {
  const [userLogged, setUserLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) setUserLogged(true);
  }, []);

  return (
    <>
      <BackgroundCircles />
      <div className="content">
        {userLogged ? <Home /> : <Register onLogin={() => setUserLogged(true)} />}
      </div>
    </>
  );
}

export default App;
