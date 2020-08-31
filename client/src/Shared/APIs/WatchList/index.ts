import axios from "axios";

import { WatchList } from "../../Hooks/useWatchListState";

const instance = axios.create({
  baseURL: "/api/flow/watch",
});

export const loadWatchList = () =>
  instance.get<WatchList[]>("/").then((resp) => resp.data);

export const addToWatchList = (userId: string) =>
  instance.post("/", {
    add: [userId],
  });

export const removeFromWatchList = (userId: string) =>
  instance.post("/", { remove: [userId] });
