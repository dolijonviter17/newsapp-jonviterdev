import { vars } from "nativewind";

export const themes = {
  light: vars({
    "--color-primary": "#000000",
    "--color-invert": "#ffffff",
    "--color-secondary": "#ffffff",
    "--color-background": "#F4F4F5",
    "--color-darker": "#F4F4F5",
    "--color-text": "#000000",
    "--color-highlight": "#7E55D8",
    "--color-border": "rgba(0, 0, 0, 0.15)",
  }),
  dark: vars({
    "--color-primary": "#ffffff",
    "--color-invert": "#000000",
    "--color-secondary": "#1e1e1e",
    "--color-background": "#141414",
    "--color-darker": "#000000",
    "--color-text": "#ffffff",
    "--color-highlight": "#7E55D8",
    "--color-border": "rgba(255, 255, 255, 0.15)",
  }),
};
