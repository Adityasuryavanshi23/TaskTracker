import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import { MakeApiReq } from "../services/api";
import { TaskCard } from "../components/TaskCard";
import { useDispatch } from "react-redux";
import { addTask } from "../store/TaskSlice";

export const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const { id: projectid } = useParams();
  const location = useLocation();
  const projectname = location.state?.project?.name;
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const fetchtasks = async () => {
      try {
        const res = await MakeApiReq(`/tasks/${projectid}`, "GET");
        setTasks(res);
        console.log(res);
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "Failed to fetch tasks");
      }
    };
    fetchtasks();
  }, [projectid]);

  const CreateTasks = async () => {
    if (!title.trim()) return toast.error("Title is required");
    try {
      const res = await MakeApiReq(`/tasks/${projectid}`, "POST", {
        title: title,
        description: description,
      });
      setTasks([res, ...tasks]);
      dispatch(addTask(res));
      toast.success("Task created successfully");
      setTitle("");
      setDescription("");
      console.log(tasks);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="max-w-screen-lg border mx-auto shadow-md  relative">
      <p className="text-lg px-4 py-2 font-mono bg-blue-600 text-white rounded-md hover:bg-blue-800 capitalize cursor-pointer absolute left-2 top-2">
        <Link to={"/"}>
          {" "}
          <i className="bi bi-arrow-bar-left "></i> back to AllProects
        </Link>
      </p>
      <h1 className="text-center capitalize font-mono font-medium text-2xl mt-4">
        from project: {projectname}
      </h1>
      <div className="flex justify-center gap-4 mt-4">
        <input
          type="text"
          placeholder="Title...."
          value={title}
          className="mr-2 border focus:outline-none rounded-md px-2 bg-gray-200 text-black capitalize border-black"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="mr-2 border focus:outline-none rounded-md px-2 bg-gray-200 text-black capitalize border-black"
          placeholder="description...."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={CreateTasks}
          className="px-3 py-2 bg-green-700 rounded-md text-white capitalize hover:bg-green-800"
        >
          {" "}
          add Task
        </button>
      </div>
      {tasks.length === 0 && (
        <h1 className="text-center capitalize font-mono font-medium text-2xl mt-4">
          No Tasks created yet
        </h1>
      )}
      <div className="grid grid-cols-3 gap-4 px-4 mt-4 py-4 ">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
};
