# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Library and FrameWork Guild

- React Query: Data fetching was handled with React query due to it simplicity and effeciency in fetching(provides loading,error states) and Optimization(catching of data and refetching of data at intervals)

- Tailwindcss: Styling of this Application was done using Tailwindcss library V4 with Vite https://tailwindcss.com/docs/installation/using-vite

-React-Icons: Icons were gotten from React icons

## Starting up Application

To install dependencies run "npm start" in the terminal
To start up the Application run "npm run dev" in the terminal

## Basic Function and Application About

This is a simulation of an e-commerce site with fetching of data and filtering

- You can search for items whose title or description match your search term and if there is no match a list of all the available product is returned
- You filter the displayed items based on category , price or both. if there is no match to your filter all products are returned. you can also search for a group of products and use the filters to narrow it down
- You can view more details of a Product by clicking on the Spectific item and it lead to the Product details page
  -These Application is responsive on all Devices

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
