import { MutableRefObject, useEffect, useRef, useCallback } from "react";

import { debounce, last } from "lodash";
import { Message } from "../useChatState";

export default function useMaintainScrollPosition(
  ref: MutableRefObject<HTMLDivElement>,
  messageArray: Message[]
) {
  const isAtBottom = useRef<boolean>(true);
  const handleScrollEvent = useCallback(() => {
    isAtBottom.current =
      ref.current.scrollTop + ref.current.clientHeight ===
      ref.current.scrollHeight;
  }, [ref]);
  useEffect(() => {
    ref.current.onscroll = debounce(handleScrollEvent, 100);
  }, [handleScrollEvent, ref]);
  useEffect(() => {
    const latestMessage = last(messageArray);
    if (latestMessage && (!latestMessage.from || isAtBottom.current)) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messageArray.length, messageArray, ref]);
}
