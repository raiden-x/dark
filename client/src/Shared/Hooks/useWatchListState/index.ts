import { useState, useCallback, useEffect } from "react";

import { watchList, user } from "../../../Shared/APIs";
import { useShowSnackbar } from "../../../Shared/Hooks/useSnackbar";
import { listenToStatusChange } from "../../Utils/Websocket";
import { find } from "lodash";

const addUser = (userId: string) => {
  return watchList.add(userId);
};

const removeUser = (userId: string) => {
  watchList.delete(userId);
};

export default function useWatchListState(isConnected: boolean) {
  const [list, setList] = useState<WatchList[]>([]);

  const showMessage = useShowSnackbar();

  const updateUserStatus = useCallback((update: WatchList) => {
    setList((list) => mergeUserList(list, update));
  }, []);

  useEffect(() => {
    async function load() {
      const data = await watchList.load();
      setList(data);
    }
    load();
  }, []);

  useEffect(() => {
    if (isConnected) {
      listenToStatusChange(updateUserStatus);
    }
  }, [updateUserStatus, isConnected]);

  const removeUserFromWatchList = useCallback(
    (userId: string, e: React.SyntheticEvent): void => {
      e.stopPropagation();
      setList((users) => users.filter((user) => user.username !== userId));
      removeUser(userId);
    },
    []
  );

  const addUserToWatchList = useCallback(
    async (userId: string) => {
      if (typeof userId === "string" && userId) {
        const isValidUser = await user.check(userId);
        if (isValidUser) {
          setList((users) => {
            if (users.findIndex((u) => u.username === userId) !== -1) {
              return users;
            }
            return [...users, { username: userId, userStatus: Status.OFFLINE }];
          });
          addUser(userId);
        } else {
          showMessage("User does not exist");
        }
      }
    },
    [showMessage]
  );

  return {
    list,
    updateUserStatus,
    removeUserFromWatchList,
    addUserToWatchList,
  };
}

export interface WatchList {
  username: string;
  userStatus: Status;
}

export enum Status {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

function mergeUserList(list: WatchList[], entry: WatchList): WatchList[] {
  const existingEntry = find(
    list,
    (item: WatchList) => item.username === entry.username
  );
  if (existingEntry) {
    existingEntry.userStatus = entry.userStatus;
    return [...list];
  } else {
    return list.concat(entry);
  }
}
