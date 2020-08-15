import * as React from "react";
import { memo } from "react";

import useLinkPreview from "../../../../../Shared/Hooks/useLinkPreview";
import { isValidUrl } from "../../../../../Shared/Utils/URLs";

const getUrl = (url: string) => {
  if (url.indexOf("://") > -1) {
    return url;
  } else {
    return "//" + url;
  }
};

const format = (word: string) => {
  if (isValidUrl(word)) {
    return (
      <>
        <a href={getUrl(word)} target="_blank" rel="noreferrer">
          {word}
        </a>{" "}
      </>
    );
  }
  return <>{word} </>;
};

const checkProps = (
  prevProps: FormattedMessageProps,
  nextProps: FormattedMessageProps
) => {
  return prevProps.message === nextProps.message;
};

function FormattedMessage({ message }: FormattedMessageProps) {
  const data = useLinkPreview(message.split("").join(""));
  const words = message.split(" ");
  return <>{words.map((word) => format(word))}</>;
}

interface FormattedMessageProps {
  message: string;
}

export default memo(FormattedMessage, checkProps);
