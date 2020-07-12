import axios from "axios";

const UserInstance = axios.create({
  baseURL: "/api/flow/user",
});

export const checkUser = (userId: string) =>
  UserInstance.get<Boolean>(`/${userId}/check`).then((resp) => resp.data);
