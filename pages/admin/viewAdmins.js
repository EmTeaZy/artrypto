import React from "react";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FullLayout from "../../src/layouts/FullLayout";
import BaseCard from "../../src/components/baseCard/BaseCard";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import crypto from "crypto";
import { key, iv } from "../../config/keys";
import { useSnackbar } from "../../context/SnackbarContextProvider";

const decrypt = (encrypted) => {
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = "";
  try {
    decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
  } catch (err) {
    console.error("Error decrypting data:", err.message);
  }
  return decrypted;
};

const ViewAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { getAllAdmins, deleteAdmin } = useAuth();
  const { show } = useSnackbar();

  useEffect(() => fetchAdmins, []);

  const fetchAdmins = async () => {
    const data = await getAllAdmins();
    let arrayData = Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value,
    }));
    arrayData = arrayData.filter((d) => d.role !== "superadmin");
    setAdmins(arrayData);
  };

  const handleDeleteAdmin = () => {
    handleClose();
    deleteAdmin(selected.email, decrypt(selected.password)).then((res) => {
      console.log(res);
      fetchAdmins();
      show("Admin removed successfully.");
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <FullLayout check={"admin"}>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <BaseCard title="Admins">
              {admins.length > 0 ? (
                <Table
                  aria-label="simple table"
                  sx={{
                    mt: 3,
                    whiteSpace: "nowrap",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography color="primary" variant="h6">
                          Username
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="primary" variant="h6">
                          Email
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="primary" variant="h6"></Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell>
                          <Typography color="primary" variant="subtitle2">
                            {admin.username}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography color="primary" variant="subtitle2">
                            {admin.email || "N/A"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => {
                              setSelected(admin);
                              handleClickOpen();
                            }}
                          >
                            <DeleteIcon
                              color="danger"
                              sx={{ cursor: "pointer" }}
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="h2" color={"primary"}>
                  No admins found
                </Typography>
              )}
            </BaseCard>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography color="black" variant="h2">
              Are you sure you want to remove this admin?
            </Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              className="text-center"
            >
              <Typography color="gray" variant="subtitle1">
                Note that this will permanently remove this admin. <br />
                This action cannot be undone
              </Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDeleteAdmin} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </FullLayout>
    </>
  );
};

export default ViewAdmins;
