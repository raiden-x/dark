import axios from "axios";

const instance = axios.create({});

const getUrl = (url: string) => {
  if (url.indexOf("://") > -1) {
    return url;
  } else {
    return "https://" + url;
  }
};

export const getDocument = async (url: string) => {
  const formattedUrl = getUrl(url);
  const { headers } = await instance.head(formattedUrl);
  console.log(headers);
};
