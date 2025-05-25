import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { LogIn } from "./pages/LogIn";
import { Profile } from "./pages/Profile";
import { Register } from "./pages/Register";
import { TestPage } from "./pages/TestPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library/:id" element={<Library />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="logIn" element={<LogIn />} />
          <Route path="register" element={<Register />} />
          <Route path="testPage" element={<TestPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
