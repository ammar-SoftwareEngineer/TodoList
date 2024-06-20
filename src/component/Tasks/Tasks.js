import "./Tasks.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { TodosContext } from "../../context/TodosContext";
import { ToastContext } from "../../context/ToastContext";

export default function Tasks({ todo, openDeleteDialog, openEditDialog }) {
  let { tasks, setTasks } = useContext(TodosContext);
  let { handleToastClick } = useContext(ToastContext);

  function handleCheckClick() {
    let updatedTasks = tasks.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTasks(updatedTasks);
    localStorage.setItem("Tasks", JSON.stringify(updatedTasks));
  }

  // open dialog

  function handleClickOpen() {
    openDeleteDialog(todo);
  }
  function handleClickEditOpen() {
    openEditDialog(todo);
  }

  return (
    <>
      {/* #################################################### */}
      {/* List  */}
      <List>
        <ListItem
          component="div"
          sx={{
            width: "100%",
            backgroundColor: todo.isCompleted ? "#b2dfdb" : "white",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item xs={8}>
              <Typography
                sx={{
                  textAlign: "start",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
                gutterBottom
              >
                {todo.title}
              </Typography>
              <Typography
                sx={{ textAlign: "start", fontSize: "15px" }}
                gutterBottom
              >
                {todo.details}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                sx={{ display: "flex", justifyContent: "end" }}
                gutterBottom
              >
                <IconButton
                  className="iconButton"
                  onClick={() => {
                    handleCheckClick();
                    if (todo.isCompleted) {
                      handleToastClick("تم إكمال المهمة بنجاح", "success");
                    }
                  }}
                >
                  <CheckIcon
                    sx={{
                      backgroundColor: todo.isCompleted ? "#00695c" : "white",
                      border: "2px solid #00695c",
                      borderRadius: "50%",
                      fontSize: "30px",
                      padding: "5px",
                      color: todo.isCompleted ? "white" : "#00695c",
                    }}
                  />
                </IconButton>

                <IconButton
                  className="iconButton"
                  onClick={() => {
                    handleClickEditOpen();
                  }}
                >
                  <EditIcon
                    sx={{
                      backgroundColor: "white",
                      border: "2px solid #1976d2",
                      borderRadius: "50%",
                      fontSize: "30px",
                      padding: "5px",
                      color: "#1976d2",
                    }}
                  />
                </IconButton>
                <IconButton
                  className="iconButton"
                  onClick={() => {
                    handleClickOpen();
                  }}
                >
                  <DeleteOutlineIcon
                    sx={{
                      backgroundColor: "white",
                      border: "2px solid #e53935",
                      borderRadius: "50%",
                      fontSize: "30px",
                      padding: "5px",
                      color: "#e53935",
                    }}
                  />
                </IconButton>
              </Typography>
            </Grid>
          </Grid>
        </ListItem>

        <Divider component="li" />
      </List>
    </>
  );
}
