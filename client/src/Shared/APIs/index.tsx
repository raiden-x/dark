import {
  loadWatchList,
  addToWatchList,
  removeFromWatchList,
} from "./WatchList";

import {
  loadIgnoreList,
  addToIgnoreList,
  removeFromIgnoreList,
} from "./IgnoreList";

import { checkUser } from "./User";

import { getDocument } from "./LinkPreview";

export const watchList = {
  load: loadWatchList,
  add: addToWatchList,
  delete: removeFromWatchList,
};

export const ignoreList = {
  load: loadIgnoreList,
  add: addToIgnoreList,
  delete: removeFromIgnoreList,
};

export const user = {
  check: checkUser,
};

export const document = {
  load: getDocument,
};
