import "./App.css";
import GradioApp from "./Components/Gradio";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Pages/Signin.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import LogIn from "./Components/LogIn.jsx";
import Header from "./Components/Header.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signin />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<GradioApp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
