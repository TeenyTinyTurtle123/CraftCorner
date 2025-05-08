import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { ProjectInfo } from "./pages/ProjectInfo";
import { AddProject } from "./pages/NewProject";
import { Layout } from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="projectInfo/:id" element={<ProjectInfo />} />
          <Route path="addProject" element={<AddProject />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
