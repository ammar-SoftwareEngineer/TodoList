import "./App.css";
import TodoList from "./component/TodoList/TodoList";
import { TodosContext } from "./context/TodosContext";
import { useContext } from "react";
import { useState } from "react";
import { ToastContext } from "./context/ToastContext";
import Toast from "./component/Toast/Toast";
function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  let initialTasks = useContext(TodosContext);
  const [tasks, setTasks] = useState(initialTasks);
  function handleToastClick(message, status) {
    setOpen(true);
    setMessage(message);
    setStatus(status)
  }

  function handleToastClose() {
    setOpen(false);
  }
  return (
    <>
      <ToastContext.Provider
        value={{ open, handleToastClick, handleToastClose, message, status }}
      >
        <Toast />

        <TodosContext.Provider value={{ tasks, setTasks }}>
          <div className="App">
            <div className="background">
              <TodoList />
            </div>
          </div>
        </TodosContext.Provider>
      </ToastContext.Provider>
    </>
  );
}

export default App;
