/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        "surface-tint": "rgb(var(--surface-tint) / <alpha-value>)",
        "on-primary": "rgb(var(--on-primary) / <alpha-value>)",
        "primary-container": "rgb(var(--primary-container) / <alpha-value>)",
        "on-primary-container":
          "rgb(var(--on-primary-container) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "on-secondary": "rgb(var(--on-secondary) / <alpha-value>)",
        "secondary-container":
          "rgb(var(--secondary-container) / <alpha-value>)",
        "on-secondary-container":
          "rgb(var(--on-secondary-container) / <alpha-value>)",
        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
        "on-tertiary": "rgb(var(--on-tertiary) / <alpha-value>)",
        "tertiary-container": "rgb(var(--tertiary-container) / <alpha-value>)",
        "on-tertiary-container":
          "rgb(var(--on-tertiary-container) / <alpha-value>)",
        error: "rgb(var(--error) / <alpha-value>)",
        "on-error": "rgb(var(--on-error) / <alpha-value>)",
        "error-container": "rgb(var(--error-container) / <alpha-value>)",
        "on-error-container": "rgb(var(--on-error-container) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        "on-background": "rgb(var(--on-background) / <alpha-value>)",
        "on-background-op-12": "rgb(var(--on-background) / 12%)",
        "on-background-op-38": "rgb(var(--on-background) / 38%)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "on-surface": "rgb(var(--on-surface) / <alpha-value>)",
        "surface-variant": "rgb(var(--surface-variant) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--on-surface-variant) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        "outline-variant": "rgb(var(--outline-variant) / <alpha-value>)",
        shadow: "rgb(var(--shadow) / <alpha-value>)",
        scrim: "rgb(var(--scrim) / <alpha-value>)",
        "inverse-surface": "rgb(var(--inverse-surface) / <alpha-value>)",
        "inverse-primary": "rgb(var(--inverse-primary) / <alpha-value>)",
        "primary-fixed": "rgb(var(--primary-fixed) / <alpha-value>)",
        "on-primary-fixed": "rgb(var(--on-primary-fixed) / <alpha-value>)",
        "primary-fixed-dim": "rgb(var(--primary-fixed-dim) / <alpha-value>)",
        "on-primary-fixed-variant":
          "rgb(var(--on-primary-fixed-variant) / <alpha-value>)",
        "secondary-fixed": "rgb(var(--secondary-fixed) / <alpha-value>)",
        "on-secondary-fixed": "rgb(var(--on-secondary-fixed) / <alpha-value>)",
        "secondary-fixed-dim":
          "rgb(var(--secondary-fixed-dim) / <alpha-value>)",
        "on-secondary-fixed-variant":
          "rgb(var(--on-secondary-fixed-variant) / <alpha-value>)",
        "tertiary-fixed": "rgb(var(--tertiary-fixed) / <alpha-value>)",
        "on-tertiary-fixed": "rgb(var(--on-tertiary-fixed) / <alpha-value>)",
        "tertiary-fixed-dim": "rgb(var(--tertiary-fixed-dim) / <alpha-value>)",
        "on-tertiary-fixed-variant":
          "rgb(var(--on-tertiary-fixed-variant) / <alpha-value>)",
        "surface-dim": "rgb(var(--surface-dim) / <alpha-value>)",
        "surface-bright": "rgb(var(--surface-bright) / <alpha-value>)",
        "surface-container-lowest":
          "rgb(var(--surface-container-lowest) / <alpha-value>)",
        "surface-container-low":
          "rgb(var(--surface-container-low) / <alpha-value>)",
        "surface-container": "rgb(var(--surface-container) / <alpha-value>)",
        "surface-container-high":
          "rgb(var(--surface-container-high) / <alpha-value>)",
        "surface-container-highest":
          "rgb(var(--surface-container-highest) / <alpha-value>)",
      },
      screens: {
        xxs: "375px",
        xs: "425px",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        ["elevation-1"]:
          "0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        ["elevation-2"]:
          "0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)",
        ["elevation-3"]:
          "0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
        ["elevation-4"]:
          "0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)",
        ["elevation-5"]:
          "0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)",
      },
      gridTemplateRows: {
        layout: "auto 1fr auto",
      },
    },
  },
  plugins: [],
};
