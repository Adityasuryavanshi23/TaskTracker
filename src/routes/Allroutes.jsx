import { Route, Routes } from "react-router-dom";
import { Dashboard, Task, SignUp, Login } from "../pages";
export const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/projects/:id/task" element={<Task />} />
    </Routes>
  );
};
