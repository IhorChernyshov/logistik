## 1. Do not run build or dev commands
Never execute commands like `npm start`, `npm run dev`, or similar — only write and explain code.

---

## 2. Follow my styling syntax
- Always use **BEM methodology** for HTML and CSS class naming.
- Use my existing **SCSS mixins** for all styles (e.g., media queries, typography, spacing).
- Never define inline styles or unscoped class names.
- Use **predefined styles from `@shared.scss` and other files in the `assets` folder.
- Use `@use` instead of `@import` in styles to prevent deprecation where it's needed in styles files

---

## 2.1. Place `@include adaptiveValue()` mixins or any other mixins at the end of each class

---

## 3. Use semantic HTML tags for SEO
- Always choose the **most appropriate HTML tag** for each element to support base SEO (e.g., `<header>`, `<main>`, `<article>`, `<section>`, `<nav>`, `<footer>`, `<h1>`–`<h6>`).
- Include `alt`, `title`, and `aria` attributes where relevant.

---

## 4. Avoid deprecated or outdated code
- Follow **Angular 20+** and **TypeScript 5+** syntax.
- Prefer **modern APIs** and language features.
- Never use deprecated decorators, functions, or lifecycle hooks.

---

## 5. Use Angular Signals instead of Inputs/Outputs
- Replace `@Input()` and `@Output()` with the new **signal-based approach**.
- Use `input()` and `output()` functions accordingly.

---

## 6. Consult library documentation using context7
- When using third-party libraries, refer to **context7** to find the latest documentation and examples before generating code.

---

## 7. Component reuse and modularization
- If an element (e.g., title, text, button) is used repeatedly, check existing **done-components**.
- If not available, create a new component following the same design and coding principles.

---

## 8. Maintain asynchronous and typed logic
- Always use `async/await`, `Promise.all()`, and **typed variables** (`string`, `number`, `boolean`, etc.).
- Avoid untyped or callback-based async code.

---

## 9. Prefer modern iteration patterns
- **Do not use** `forEach` loops.
- Use `.map()` combined with `Promise.all()` for cleaner, asynchronous, and immutable operations.

---

## 10. Code structure and commenting
- Comment **every line** of code to explain what it does and why it’s needed.
- Add a short **function-level summary comment** above each function or class describing its purpose.
- Keep comments concise, clear, and written in **English** for team readability, write them not for every line of code and just in .ts files for functions and variables with signals.
- Use consistent indentation and code formatting aligned with **Prettier + ESLint defaults**.
- Ensure imports are **complete and ordered logically** (Angular core first, then shared, then local).

---
