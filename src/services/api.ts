import axios from "axios";
import { User } from "./types";

const api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/" });

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users");
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const editUserById = async (
  id: number,
  data: {
    email: string;
    phone: string;
  }
): Promise<any> => {
  const res = await api.put(`/users/${id}`, { ...data });
  return res.data;
};
