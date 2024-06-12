import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import AdimnActions from "./components/AdminProfile/AdminActions";
import UsersActions from "./components/UsersProfile/UsersActions";
import SeatSelection from "./components/UsersProfile/SeatSelection";
import ShowsAvalilableForMovie from "./components/UsersProfile/ShowsAvalilableForMovie";

function App() {
  const loading = useSelector((state) => state.loader.loading);

  return (
    <div className="App">
      {loading && (
        <div className="loader-container">
          <div className="loader"> </div>
        </div>
      )}
      {/* Routing ... */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={ <ProtectedRoute>{" "}<Home />{" "}</ProtectedRoute>}/>
          <Route path="/adminActions" element={<ProtectedRoute>{" "}<AdimnActions/>{" "}</ProtectedRoute>} />
          <Route path="/usersActions" element={<ProtectedRoute>{" "}<UsersActions/>{" "}</ProtectedRoute>} />
          <Route path="/movie/:id" element={<ProtectedRoute>{" "}<ShowsAvalilableForMovie/>{" "}</ProtectedRoute>} />
          <Route path="/book-show/:id" element={<ProtectedRoute>{" "}<SeatSelection/>{" "}</ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
