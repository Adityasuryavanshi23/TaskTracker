import { useNavigate } from "react-router-dom";
import { MakeApiReq } from "../services/api";
import toast from "react-hot-toast";

export const ProjectsCard = ({ project, setProjects }) => {
  const { _id, name } = project;
  const nav = useNavigate();

  const handledelete = async () => {
    try {
      await MakeApiReq(`/projects/${_id}`, "DELETE");
      toast.error("Project deleted successfully");
      setProjects((prev) => prev.filter((p) => p._id !== _id));
      localStorage.removeItem("projectId");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete project");
    }
  };
  return (
    <div className="max-w-sm w-full p-6 mt-6  bg-gray-300/40 border border-gray-600 shadow-lg rounded-lg  hover:scale-105 transition-all ease-in-out duration-150  ">
      <div className="flex items-center justify-between ">
        <h5 className="mb-2 text-2xl max-w-[280px] font-medium capitalize tracking-tight text-gray-900 ">
          project name : <strong className="font-normal text-xl">{name}</strong>
        </h5>
        <i
          onClick={handledelete}
          className="bi bi-trash text-2xl active:scale-75 text-red-500 cursor-pointer "
        ></i>
      </div>

      <p
        onClick={() => nav(`/projects/${_id}/task`, { state: { project } })}
        className="inline-flex cursor-pointer capitalize items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        check project tasks
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </p>
    </div>
  );
};
