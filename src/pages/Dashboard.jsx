import { useNavigate } from "react-router-dom";
import { ProjectsCard } from "../components/ProjectsCard";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MakeApiReq } from "../services/api";
import { addProjects } from "../store/ProjectSlice";
import { useDispatch } from "react-redux";

export const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [Newprojects, setNewProjects] = useState("");
  const nav = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  console.log(projects);

  useEffect(() => {
    if (!token) {
      nav("/login");
      return;
    }
    fetchprojects();
  }, [token]);

  const fetchprojects = async () => {
    try {
      const res = await MakeApiReq("/projects", "GET");
      setProjects(res);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch projects");
    }
  };

  const handleNewprojectSubmit = async () => {
    if (!Newprojects.trim()) return toast.error("Project name is required");

    try {
      const res = await MakeApiReq("/projects", "POST", { name: Newprojects });
      setProjects([res, ...projects]);
      dispatch(addProjects(res));
      setNewProjects("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Create project failed");
    }
  };

  return (
    <div className="max-w-[850px] p-4 border border-black mx-auto mt-14 shadow-lg">
      <h1 className="font-medium font-mono text-2xl text-center ">
        Your projects
      </h1>
      <div className="flex justify-center gap-2 mt-4">
        <input
          type="text"
          name="project"
          value={Newprojects}
          onChange={(e) => setNewProjects(e.target.value)}
          className="border px-2 focus:outline-none border-black rounded-md bg-gray-100 capitalize"
          placeholder="create a project...."
        />
        <button
          onClick={handleNewprojectSubmit}
          type="submit"
          className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-800 capitalize font-medium text-white"
        >
          create project
        </button>
      </div>
      <div className="mt-4   ">
        {projects?.length === 0 && (
          <p className="text-center font-medium font-mono text-2xl">
            No projects created yet
          </p>
        )}
        <div className="flex flex-wrap justify-between px-4  ">
          {projects?.map((project) => (
            <ProjectsCard
              project={project}
              key={project._id}
              setProjects={setProjects}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
