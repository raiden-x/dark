import { useState, useEffect } from "react";

import { document } from "../../APIs";
import { isValidUrl } from "../../Utils/URLs";

export default function useLinkPreview(url: string) {
  const [preview, setPreview] = useState<LinkPreview>(null);
  console.log(setPreview);
  useEffect(() => {
    const validUrl = isValidUrl(url);
    if (validUrl) {
      document.load(url).then((doc) => {
        console.log(doc);
      });
    }
  }, [url]);
  return preview;
}

interface LinkPreview {
  img: string;
  title: string;
  body: string;
}
