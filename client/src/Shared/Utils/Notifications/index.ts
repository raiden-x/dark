import { Message } from "../../Hooks/useChatState";

const hasCapability = !!Notification;
let hasPermission = hasCapability && Notification.permission === "granted";

export const initNotification = () => {
  if (hasCapability && Notification.permission === "default") {
    Notification.requestPermission().then((permission) => {
      hasPermission = permission === "granted";
    });
  }
};

export const showNotification = (message: Message) => {
  if (
    hasPermission &&
    (document.visibilityState === "hidden" || document.hidden)
  ) {
    new Notification(`from ${message.from}`, { body: message.message });
  }
};
