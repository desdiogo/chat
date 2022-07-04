import { Notify } from "quasar";

type Position =
  | "top-left"
  | "top"
  | "top-right"
  | "left"
  | "center"
  | "right"
  | "bottom-left"
  | "bottom"
  | "bottom-right";

Notify.setDefaults;

const createNotify = (
  type: string,
  message: string,
  position: Position = "bottom-right"
) => {
  Notify.create({
    textColor: "white",
    message,
    type,
    position,
    actions: [{ icon: "close", color: "white", "aria-label": "Dismiss" }],
    timeout: 5000,
  });
};

export const notify = {
  success: (message: string, position?: Position) =>
    createNotify("positive", message, position),
  error: (message: string, position?: Position) =>
    createNotify("negative", message, position),
  warning: (message: string, position?: Position) =>
    createNotify("warning", message, position),
  info: (message: string, position?: Position) =>
    createNotify("info", message, position),
};
