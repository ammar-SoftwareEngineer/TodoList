import { React, useState, useContext, useEffect, useMemo } from "react";
import "./TodoList.module.css";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tasks from "../Tasks/Tasks";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../../context/TodosContext";
import { ToastContext } from "../../context/ToastContext";
import AddIcon from "@mui/icons-material/Add";

// logic code

// ################
export default function TodoList() {
  let { tasks, setTasks } = useContext(TodosContext);
  // ###########################################
  // UseState
  let [inputs, setInputs] = useState({ title: "", details: "" });
  let [displayTypes, setDisplayTypes] = useState("all");
  let [Open, setOpen] = useState(false);
  let [deleteOpen, setDeleteOpen] = useState(false);
  let [dialogTodo, setDialogTodo] = useState("");
  let [editOpen, setEditOpen] = useState(false);
  let { handleToastClick } = useContext(ToastContext);
  // ########################################
  // Handles Function
  function handleAddClick() {
    if (inputs.title !== "" && inputs.details !== "") {
      let newTasks = {
        id: uuidv4(),
        title: inputs.title,
        details: inputs.details,
        isCompleted: false,
      };
      setTasks([...tasks, newTasks]);
      localStorage.setItem("Tasks", JSON.stringify([...tasks, newTasks]));
      setInputs("");
      handleClose();
      handleToastClick("تمت اضافة المهمة بنجاح", "success");
    }
  }

  // ##################################
  // Open and Close
  // ##################################
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleClickDelete(id) {
    setDialogTodo(id);
    setDeleteOpen(true);
  }
  function handleCloseDelete() {
    setDeleteOpen(false);
  }

  // ################################
  // complete tasks
  const completedTasks = useMemo(() => {
    return tasks.filter((t) => {
      return t.isCompleted;
    });
  }, [tasks]);

  const notCompletedTasks = useMemo(() => {
    return tasks.filter((t) => {
      console.log("call");
      return !t.isCompleted;
    });
  }, [tasks]);

  let tasksToBeRendered = tasks;
  if (displayTypes === "completed") {
    tasksToBeRendered = completedTasks;
  } else if (displayTypes === "nonCompleted") {
    tasksToBeRendered = notCompletedTasks;
  }

  // ##########################################
  // useEffect
  useEffect(() => {
    let storageTasks = JSON.parse(localStorage.getItem("Tasks")) ?? [];
    setTasks(storageTasks);
  }, [setTasks]);

  // ######################################################
  // handle Delete
  function handleDeleteClick() {
    let deleteTasks = tasks.filter((t) => {
      return t.id !== dialogTodo.id;
    });
    setTasks(deleteTasks);
    localStorage.setItem("Tasks", JSON.stringify(deleteTasks));
    handleCloseDelete();
    handleToastClick("تم حذف المهمة بنجاح", "error");
  }

  // ##############################################
  //  Edit
  function handleEdit() {
    console.log(dialogTodo.title);
    let updatedTodos = tasks.map((t) => {
      if (t.id === dialogTodo.id) {
        return { ...t, title: dialogTodo.title, details: dialogTodo.details };
      } else {
        return t;
      }
    });
    setTasks(updatedTodos);
    setEditOpen(false);
    localStorage.setItem("Tasks", JSON.stringify(updatedTodos));
    handleToastClick("تم تعديل المهمة بنجاح", "info");
  }
  function handleClickEditOpen(id) {
    setDialogTodo(id);
    setEditOpen(true);
  }
  function handleEditClose() {
    setEditOpen(false);
  }

  // ##################################
  const taskList = tasksToBeRendered.map((t) => (
    <Tasks
      key={t.id}
      todo={t}
      openDeleteDialog={handleClickDelete}
      openEditDialog={handleClickEditOpen}
    />
  ));
  // #######################################

  return (
    <>
      {/* ###################################### */}
      {/* edit dialog */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={editOpen}
        onClose={handleEditClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleEditClose();
          },
        }}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ marginBottom: "15px" }}
            required
            margin="dense"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            required
            margin="dense"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>إلغاء</Button>
          <Button onClick={handleEdit}>تعديل</Button>
        </DialogActions>
      </Dialog>

      {/* Delete  */}
      <Dialog
        style={{ direction: "rtl" }}
        open={deleteOpen}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل تريد حذف المهمة"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>إغلاق</Button>
          <Button
            onClick={handleDeleteClick}
            autoFocus
            sx={{ color: "#e53935" }}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm">
        <Dialog
          sx={{ direction: "rtl" }}
          open={Open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>تعديل المهمة</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ marginBottom: "15px" }}
              required
              margin="dense"
              label="عنوان المهمة"
              variant="standard"
              fullWidth
              value={inputs.title}
              onChange={(e) => {
                setInputs({ ...inputs, title: e.target.value });
              }}
            />
            <TextField
              required
              margin="dense"
              label="تفاصيل المهمة"
              variant="standard"
              fullWidth
              value={inputs.details}
              onChange={(e) => {
                setInputs({ ...inputs, details: e.target.value });
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>إغلاق</Button>
            <Button
              onClick={handleAddClick}
              sx={{ color: "#6a1b9a" }}
              disabled={!inputs.title || !inputs.details}
            >
              إضافة
            </Button>
          </DialogActions>
        </Dialog>
        <Card sx={{ minWidth: 275, borderRadius: "15px", padding: "8px" }}>
          <CardContent style={{ marginBottom: "10px" }}>
            <Divider>
              <Typography
                variant="h3"
                sx={{ textAlign: "center", fontWeight: "600" }}
                gutterBottom
              >
                مهامي
              </Typography>
            </Divider>
            <ToggleButtonGroup
              value={displayTypes}
              exclusive
              onChange={(e, newEvent) => {
                setDisplayTypes(newEvent);
              }}
              style={{
                marginTop: "18px",
                display: "flex",
                justifyContent: "center",
                direction: "ltr",
              }}
            >
              <ToggleButton value="nonCompleted">
                <Typography>غير المنجز</Typography>
              </ToggleButton>
              <ToggleButton value="completed">
                <Typography>المنجز</Typography>
              </ToggleButton>
              <ToggleButton value="all">
                <Typography>الكل</Typography>
              </ToggleButton>
            </ToggleButtonGroup>
          </CardContent>
          {/* ###################### Tasks ##################### */}
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {taskList}
          </div>
          {/* ###################### Tasks ###################### */}

          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              marginTop: "2px",
              padding: "5px 15px",
            }}
          >
            <Grid item xs={11}>
              <Typography>اضافة مهمة جديدة</Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton className="iconButton" onClick={handleClickOpen}>
                <AddIcon
                  sx={{
                    backgroundColor: "#6a1b9a",
                    borderRadius: "50%",
                    fontSize: "35px",
                    color: "white",
                  }}
                />
              </IconButton>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
