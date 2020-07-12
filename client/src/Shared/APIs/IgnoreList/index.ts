import axios from "axios";

const instance = axios.create({
  baseURL: "/api/flow/ignore",
});

export const loadIgnoreList = () =>
  instance.get<string[]>("/").then((resp) => resp.data);

export const addToIgnoreList = (userId: string) =>
  instance.post("/", { ignore: [userId] });

export const removeFromIgnoreList = (userId: string) =>
  instance.post("/", { enable: [userId] });
