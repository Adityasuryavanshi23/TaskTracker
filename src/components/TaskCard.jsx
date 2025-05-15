import React, { useState } from "react";
import { MakeApiReq } from "../services/api";
import toast from "react-hot-toast";

export const TaskCard = ({ task, setTasks }) => {
  const { title, description, status, createdAt, _id, completedAt } = task;
  console.log(task, completedAt);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newStatus, setNewStatus] = useState(status);

  const handleUpdate = async (taskid) => {
    try {
      const res = await MakeApiReq(`tasks/update/${taskid}`, "PUT", {
        title: newTitle,
        description: newDescription,
        status: newStatus,
      });
      setTasks((prev) =>
        prev.map((task) => (task._id === taskid ? res : task))
      );
      toast.success("Task updated successfully");
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update task");
    }
  };

  const handleDelete = async (taskid) => {
    try {
      await MakeApiReq(`/tasks/delete/${taskid}`, "DELETE");
      setTasks((prev) => prev.filter((task) => task._id !== taskid));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="max-w-sm p-6 bg-gray-200/50 border border-gray-200 rounded-lg shadow-sm capitalize">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <label className="font-medium">Update Title:</label>
          <input
            type="text"
            value={newTitle}
            placeholder="EditTitle"
            required
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <label className="font-medium">Update Description:</label>

          <input
            type="text"
            value={newDescription}
            placeholder="EditDescription"
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          <label className="font-medium">Update Task Status:</label>

          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => handleUpdate(_id)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h5 className="mb-2 text-mb font-bold max-w-[280px] ">
              Task Title:{" "}
              <span className="text-md text-black font-normal">{title}</span>
            </h5>
            <div>
              <i
                onClick={() => setIsEditing(true)}
                className="bi bi-pencil mr-2 text-green-500 text-xl cursor-pointer"
              ></i>
              <i
                onClick={() => handleDelete(_id)}
                className="bi bi-trash text-red-500 text-xl cursor-pointer"
              ></i>
            </div>
          </div>
          <p className="mb-3 font-bold ">
            Description:{" "}
            <span className="text-md text-black font-normal">
              {description}
            </span>
          </p>
          <p>
            <strong>Created at</strong>: {new Date(createdAt).toLocaleString()}
          </p>
          <p>
            <strong> Status:</strong>{" "}
            <span
              className={`${status === "completed" ? "text-green-600" : ""}`}
            >
              {status}
            </span>
          </p>
          {status === "completed" && (
            <p>
              <strong>completedAt</strong> :{" "}
              {new Date(completedAt).toLocaleString()}
            </p>
          )}
        </>
      )}
    </div>
  );
};
