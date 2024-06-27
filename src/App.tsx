import { AppProvider } from "./context/AppContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/views/Home";
import Signup from "./components/views/Signup";
import Login from "./components/views/Login";
import About from "./components/views/About";
import Listing from "./components/views/List/Listing";
import NewListing from "./components/views/List/NewListing";
import Search from "./components/views/Search/Search";
import ListDetail from "./components/views/List/ListDetail";
import "./App.scss";

const ProtectedRoute = () => {
  const auth = false;
  if (auth) return <Navigate to="/login" />;
  return <Outlet />;
};

function App() {
  // const key1: any = { page: "new" };
  // const key2: any = { page: "edit" };
  return (
    <AppProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="about" element={<About />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/listing" element={<Listing />} />
            <Route
              path="/edit-listing/:id"
              element={<NewListing key="new" />}
            />
            <Route path="/new-listing" element={<NewListing key="edit" />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="/list-detail/:id" element={<ListDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
