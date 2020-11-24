import {
  AppBar,
  Box,
  CircularProgress,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { default as CenteredComponent } from "./components/CenteredComponent";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import { getUsers } from "./services/api";
import { User } from "./services/types";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [initialUsers, setInitialUsers] = useState<User[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [changing, setChanging] = useState(false);

  const changeData = (value: string) => {
    setChanging(true);
    // to improve performance
    setTimeout(() => {
      const newUsers = initialUsers.filter((user) => {
        if (user.name.includes(value)) return true;
        else if (user.username.includes(value)) return true;
        else if (user.email.includes(value)) return true;
        else if (user.phone.includes(value)) return true;
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Usuarios
          </Typography>
        </Toolbar>
      </AppBar>

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
            ) : (
              <Box display="flex" flexWrap="wrap" justifyContent="center">
                {users.map((user, idk) => (
                  <UserCard key={idk} {...user} />
                ))}
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default App;
