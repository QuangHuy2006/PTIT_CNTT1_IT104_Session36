import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInputValue, addTask } from "../redux/slice/taskManager.slice";
import axios from "axios";
import {
  changeCompletion,
  changeName,
  deleteTask,
} from "../redux/slice/tackManagerArray.slice";

export default function TaskManager() {
  const value = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  let [reload, setReload] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    axios.get("http://localhost:3000/tasks").then((res) => setTasks(res.data));
  }, [reload]);
  const filterByPriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      axios
        .get("http://localhost:3000/tasks")
        .then((res) => setTasks(res.data));
    } else {
      setTasks([...tasks.filter((task) => task.priority === e.target.value)]);
    }
  };
  const filterByCompletion = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      axios
        .get("http://localhost:3000/tasks")
        .then((res) => setTasks(res.data));
    } else {
      setTasks([...tasks.filter((task) => task.completion == e.target.value)]);
    }
  };
  const filterByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      axios
        .get("http://localhost:3000/tasks")
        .then((res) => setTasks(res.data));
    } else {
      setTasks([...tasks.filter((task) => task.name.includes(e.target.value))]);
    }
  };
  return (
    <div className="task-manager">
      <h2>📑 Task Manager</h2>

      <div className="task-input">
        <input
          type="text"
          placeholder="Công việc mới"
          value={value.name}
          onChange={(e) =>
            dispatch(getInputValue({ field: "name", value: e.target.value }))
          }
        />
        <select
          value={value.priority}
          onChange={(e) =>
            dispatch(
              getInputValue({ field: "priority", value: e.target.value })
            )
          }
        >
          <option value="HIGH">Cao</option>
          <option value="MEDIUM">Trung bình</option>
          <option value="LOW">Thấp</option>
        </select>
        <button
          className="versatileBtn"
          onClick={() => {
            if (
              (document.querySelector(".versatileBtn") as HTMLButtonElement)
                .textContent === "Thêm"
            ) {
              dispatch(
                addTask({
                  name: value.name,
                  priority: value.priority,
                  completion: false,
                })
              );
              dispatch(getInputValue({ field: "name", value: "" }));
              setReload((reload += 1));
            } else {
              dispatch(
                changeName({
                  id: index,
                  name: value.name,
                  priority: value.priority,
                })
              );
              setIsFixed(false);
              dispatch(getInputValue({ field: "name", value: "" }));
              setReload((reload += 1));
            }
          }}
        >
          {isFixed === false ? "Thêm" : "Cập nhật"}
        </button>
      </div>

      <div className="task-filters">
        <select onChange={filterByCompletion}>
          <option value="">Tất cả</option>
          <option value="true">Hoàn thành</option>
          <option value="false">Chưa làm</option>
        </select>
        <select onChange={filterByPriority}>
          <option value="">Tất cả</option>
          <option value="HIGH">Cao</option>
          <option value="MEDIUM">Trung bình</option>
          <option value="LOW">Thấp</option>
        </select>
        <input type="text" placeholder="Tìm kiếm" onChange={filterByName} />
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li className="task-item">
            <div style={{ display: "flex", gap: "5px" }}>
              <input
                type="checkbox"
                onChange={() => {
                  if (task.completion === false) {
                    dispatch(changeCompletion({ id: task.id, value: true }));
                    setReload((reload += 1));
                  } else {
                    dispatch(changeCompletion({ id: task.id, value: false }));
                    setReload((reload += 1));
                  }
                }}
              />
              <span className={task.completion ? "completed" : ""}>
                {task.name}
              </span>
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>
            <div>
              <button
                className="delete-btn"
                onClick={() => {
                  dispatch(deleteTask({ id: task.id }));
                  setReload((reload += 1));
                }}
              >
                🗑
              </button>
              <button
                className="edit-btn"
                onClick={() => {
                  dispatch(getInputValue({ field: "name", value: task.name }));
                  setIsFixed(true);
                  setIndex(task.id);
                }}
              >
                ✏️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
