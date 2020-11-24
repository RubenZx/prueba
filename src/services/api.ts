import axios from "axios";
import { User } from "./types";

const api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/" });

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};
