import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../styles/App.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Counter App</h1>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
