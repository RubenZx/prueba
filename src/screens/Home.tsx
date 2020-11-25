import { Box, CircularProgress, Typography } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import React, { useEffect, useState } from "react";
import { default as CenteredComponent } from "../components/CenteredComponent";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import { getUsers } from "../services/api";
import { User } from "../services/types";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [changing, setChanging] = useState(false);

  const changeData = (value: string) => {
    setChanging(true);
    // to improve performance
    setTimeout(() => {
      const compareValue = value.toLowerCase();
      const newUsers = initialUsers.filter((user) => {
        if (user.name.toLowerCase().includes(compareValue)) return true;
        else if (user.username.toLowerCase().includes(compareValue))
          return true;
        else if (user.email.toLowerCase().includes(compareValue)) return true;
        else if (user.phone.toLowerCase().includes(compareValue)) return true;
        return false;
      });
      setUsers([...newUsers]);
      setChanging(false);
    }, 300);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await getUsers();
        setLoading(false);
        setInitialUsers(res);
        setUsers(res);
      } catch (error) {
        setLoading(false);
        setError("Fetch failed");
      }
    })();
  }, []);

  return (
    <>
      {loading || error ? (
        <CenteredComponent>
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5">{error}</Typography>
          )}
        </CenteredComponent>
      ) : (
        <>
          <Box m={4} />
          <Box display="flex" flexDirection="column" alignItems="center">
            <SearchBar onValueChange={changeData} />
            {changing ? (
              <CenteredComponent>
                <CircularProgress />
              </CenteredComponent>
            ) : users.length > 0 ? (
              <Box display="flex" flexWrap="wrap" justifyContent="center">
                {users.map((user, idk) => (
                  <UserCard key={idk} {...user} />
                ))}
              </Box>
            ) : (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                minHeight="80vh"
                justifyContent="center"
              >
                <SentimentVeryDissatisfiedIcon style={{ fontSize: "4rem" }} />
                <Box m={1} />
                <Typography variant="h6">Usuario no encontrado</Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Home;
