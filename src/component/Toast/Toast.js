import React from "react";
import "./Toast.module.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ToastContext } from "../../context/ToastContext";
import { useContext } from "react";
export default function Toast() {
let {handleToastClose,open,message,status}=useContext(ToastContext)
  function handleClose() {
    handleToastClose()
  }
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        spacing={2}
        
      >
        <Alert
          severity={status}
          variant="filled"
          sx={{ width: "100%" }}
        >
      {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
