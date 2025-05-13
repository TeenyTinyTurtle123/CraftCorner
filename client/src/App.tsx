import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { ProjectInfo } from "./pages/ProjectInfo";
import { AddProject } from "./pages/AddProject";
import { Layout } from "./components/Layout";
import { Profile } from "./pages/Profile";
import { EditProject } from "./pages/EditProject";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="library" element={<Library />} />
          <Route path="projectInfo/:id" element={<ProjectInfo />} />
          <Route path="addProject" element={<AddProject />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editProject/:id" element={<EditProject />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
