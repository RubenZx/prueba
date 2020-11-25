import { CircularProgress, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import CenteredComponent from "../components/CenteredComponent";
import EditUserForm from "../components/EditUserForm";
import { getUserById } from "../services/api";

const StyledPaper = styled(Paper)`
  padding: 1.5rem;
  margin: 2rem;
`;

const UserInfo = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation<
    | {
        name: string;
        email: string;
        username: string;
        phone: string;
      }
    | undefined
  >();

  const [user, setUser] = useState(
    state ? state : { name: "", email: "", username: "", phone: "" }
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!state) {
      setLoading(true);
      (async () => {
        try {
          const res = await getUserById(Number(id));
          setLoading(false);
          setUser({ ...res });
        } catch (error) {
          setLoading(false);
          setError("Fetch failed");
        }
      })();
    } else {
      setLoading(false);
    }
  }, [id, state]);

  return (
    <CenteredComponent>
      {loading || error ? (
        loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h5">{error}</Typography>
        )
      ) : (
        <StyledPaper>
          <Typography variant="h6" style={{ marginBottom: "2rem" }}>
            A continuación puedes editar la información del usuario con id: {id}
          </Typography>
          <EditUserForm user={user} id={id} />
        </StyledPaper>
      )}
    </CenteredComponent>
  );
};

export default UserInfo;
