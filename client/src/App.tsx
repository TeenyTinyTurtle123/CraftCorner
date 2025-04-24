import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { ProjectInfo } from "./pages/ProjectInfo";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/projectInfo/:id" element={<ProjectInfo />} />
      </Routes>
    </>
  );
}

export default App;
