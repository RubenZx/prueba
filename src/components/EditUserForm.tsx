import { Box, Button, Snackbar, TextField } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import * as yup from "yup";
import { editUserById } from "../services/api";

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup
    .string()
    .required("Ha de introducir un email válido")
    .email("Por favor, introduzca un email en el formato correcto"),
  phone: yup.string().required("Ha de introducir un teléfono válido"),
});

const StyledTextField = styled(TextField)`
  margin-bottom: 1.5rem;
`;

const StyledButton = styled(Button)`
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

interface EditUserFormProps {
  user: {
    name: string;
    email: string;
    username: string;
    phone: string;
  };
  id: string;
}

const EditUserForm = ({ user, id }: EditUserFormProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const history = useHistory();

  return (
    <>
      <Formik
        initialValues={{ ...user }}
        onSubmit={(values) => {
          (async () => {
            try {
              await editUserById(Number(id), {
                email: values.email,
                phone: values.phone,
              });
            } catch (error) {
              setMessage("Error al actualizar el usuario");
            }
          })();
          setOpen(true);
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <StyledTextField
              fullWidth
              label="Nombre"
              variant="outlined"
              disabled
              value={values.name}
            />
            <StyledTextField
              fullWidth
              label="Usuario"
              variant="outlined"
              disabled
              value={values.username}
            />
            <StyledTextField
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email !== undefined}
              helperText={errors.email}
            />
            <StyledTextField
              fullWidth
              name="phone"
              label="Teléfono"
              variant="outlined"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone !== undefined}
              helperText={errors.phone}
            />
            <Box display="flex" justifyContent="flex-end">
              <StyledButton color="primary" variant="contained" type="submit">
                Editar usuario
              </StyledButton>
            </Box>
          </Form>
        )}
      </Formik>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => {
          history.push("/users");
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          closeText="Cerrar"
          severity={message ? "error" : "success"}
        >
          {message ? message : "Usuario actualizado con éxito"}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default EditUserForm;
