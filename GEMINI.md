# Project: Toss-Inspired Recipe Scaler (New Development)

## 1. Project Vision & Core Principles

This document outlines the strategy for developing a _new_ Recipe Scaling Application from scratch, heavily inspired by the **Toss mobile app's exceptional UX/UI**. The goal is to create a highly intuitive, efficient, and aesthetically pleasing web application for mobile users, deployable via GitHub Pages, with Google AdSense as the monetization model.

**Core Principles:**

- **User-Centricity:** Prioritize the user's needs, making recipe scaling effortless and enjoyable.
- **Efficiency & Speed:** Minimize user effort and steps, providing instant feedback and results.
- **Aesthetic Excellence:** Embrace a clean, modern, minimalist design language, mirroring Toss's clarity and sophistication.
- **Robustness & Stability:** Build with reliable technologies, ensuring high performance and maintainability.
- **Adaptability:** The UI must intelligently adapt to varying content (e.g., number of ingredients) to maintain optimal UX.

## 2. Technology Stack

Chosen for stability, efficiency, ease of implementation, aesthetic control, and compatibility with GitHub Pages deployment.

- **Frontend Framework:** **React**
  - **Rationale:** Component-based architecture facilitates modular development, reusability, and efficient UI updates. Its vast ecosystem and strong community support ensure stability and access to numerous development resources.
- **Build Tool:** **Vite**
  - **Rationale:** Offers an extremely fast development server and optimized production builds, significantly improving developer experience and final application performance.
- **Styling:** **Tailwind CSS**
  - **Rationale:** A utility-first CSS framework that provides unparalleled control over styling. This is crucial for precisely replicating Toss's minimalist, clean, and highly customized aesthetic without fighting opinionated component libraries. It promotes rapid UI development and consistent design.
- **State Management:** **React Context API + `useState`/`useReducer`**
  - **Rationale:** React's built-in state management solutions are efficient and sufficient for this application's scope. `useState` for local component state and `useReducer` with Context API for more complex, global state logic, keeping the bundle size small and avoiding external dependencies unless absolutely necessary.
- **Testing:** **Vitest + React Testing Library**
  - **Rationale:** Vitest provides a fast and modern testing framework. React Testing Library encourages writing tests that focus on user behavior, ensuring the application functions as expected from a user's perspective.

## 3. Core Features & UX/UI Strategy (Toss Benchmark)

The application's core functionality is **Recipe Scaling**. All UX/UI decisions are geared towards making this process seamless, intuitive, and visually appealing, drawing heavily from Toss's design philosophy.

### 3.1. Recipe Scaling (Central Feature)

- **Adaptive Selection UI for "Base Ingredient":**
  - **Few Ingredients (e.g., <= 7):** Each ingredient card will feature a clear, Toss-like "Set as Base" button. The selected base ingredient will be visually highlighted (e.g., subtle background change, distinct border, checkmark icon) to provide immediate feedback.
  - **Many Ingredients (e.g., > 7):** A single, prominent "Select Base Ingredient" button will be displayed. Tapping it will trigger a **Toss-like Bottom Sheet or Full-Screen Modal** containing a searchable list of all ingredients. This provides ample space for many items and allows for quick navigation via search.
- **Real-time Calculation & Feedback:**
  - As the user selects a base ingredient or adjusts its available amount, the scaled recipe results will update **instantly** in the `resultDiv`.
  - Visual cues like subtle number counting animations or brief fade-in/out effects (similar to Toss's dynamic number displays) will be used to emphasize the real-time changes.

### 3.2. Ingredient Management

- **Smart Input Field (Toss-Inspired Input Experience):**
  - **Single Input Field:** A unified text input for adding ingredients (e.g., `ingredientNameInput`).
  - **Real-time Chip Preview:** As the user types, the input will be parsed in real-time. Recognized components (`amount`, `unit`, `name`) will be displayed immediately below the input field as distinct, Toss-style **chips**.
    - _Example:_ Typing "200g flour" would show `[200]` `[g]` `[flour]` chips.
    - _Feedback:_ Unrecognized or ambiguous parts will be visually distinct (e.g., plain text, or a "parsing..." chip) until fully identified.
  - **Flexible Input Order:** The parsing logic will intelligently recognize various input orders (e.g., "200g flour", "flour 200g", "200 flour g").
  - **Unit Suggestions:** Contextual unit chips (e.g., `[g]`, `[ml]`, `[cup]`) will appear below the input field after an amount is entered, allowing for quick selection.
- **Bulk Input:**
  _ The same smart input field will support multiple ingredients separated by delimiters (e.g., `;`, `
`).
  _ **Multi-Chip Set Preview:** Each parsed ingredient from bulk input will be displayed as its own set of chips, stacked vertically, providing a clear overview before adding to the recipe. \* **Error Highlighting:** Invalid or unparseable lines in bulk input will be clearly highlighted (e.g., red border around the chip set) for easy correction.
- **Ingredient List Display:**
  - Clean, card-based UI for each ingredient, similar to Toss's list items (e.g., transaction history). Each card will clearly display the amount, unit, and name.
- **Edit/Delete Actions:**
  - Clear, minimalist action buttons (Edit, Delete) on each ingredient card.
  - Consider implementing **Toss-like swipe gestures** (e.g., swipe left to delete, swipe right to edit) for quick, intuitive actions, complementing or replacing explicit buttons for space efficiency.

### 3.3. Feedback & Notifications

- **Non-Intrusive Inline Error Messages:**
  - Instead of disruptive modals, error messages will appear directly below the relevant input field, styled minimally (e.g., small, red text) like Toss's inline validation.
- **Toast Messages:**
  - For success confirmations or general information, brief, non-blocking **Toss-style toast messages** will appear at the bottom of the screen and auto-dismiss.
- **Clear Modals:**
  - For critical actions requiring user confirmation (e.g., deleting an ingredient), clear, concise modals will be used, mirroring Toss's clean modal designs.

## 4. Design Aesthetics (Toss Benchmark)

The visual design will strictly adhere to Toss's minimalist, modern, and user-friendly aesthetic.

- **Color Palette:**
  - **Primary Accent:** A vibrant, yet calming teal/blue (Toss's signature color) for primary actions, selected states, and key highlights.
  - **Neutrals:** Extensive use of clean whites, soft grays, and subtle off-whites for backgrounds, text, and subtle dividers, ensuring visual clarity and ample whitespace.
  - **Feedback Colors:** A clear, but not aggressive, red for errors; a soft green for success.
- **Typography:**
  - **Font:** A highly legible sans-serif font (e.g., Noto Sans KR, or a similar open-source alternative to Tossface) will be used consistently.
  - **Hierarchy:** Clear visual hierarchy established through varying font sizes and weights (e.g., large, bold numbers for amounts; smaller, lighter text for units).
  - **Spacing:** Generous line-height and letter-spacing for optimal readability.
- **Layout & Spacing:**
  - **Whitespace:** Abundant use of whitespace to reduce visual clutter and draw focus to key information, a hallmark of Toss's clean design.
  - **Alignment:** Strict grid-based alignment for all elements, ensuring visual order and professionalism.
- **Animations & Transitions:**
  - Subtle, smooth, and fast animations for all UI interactions (e.g., button presses, element appearance/disappearance, state changes). These will enhance the perceived responsiveness and provide a delightful user experience, akin to Toss's fluid interactions.
- **Iconography:**
  - Simple, clear, and consistent line-art or filled icons that are immediately recognizable and align with Toss's minimalist icon style.
- **Component Styling:**
  - Minimal borders, subtle (almost imperceptible) shadows for depth where needed (e.g., cards, modals), and consistently rounded corners for a soft, modern feel. Avoid gradients and heavy ornamentation.

## 5. Monetization Strategy

- **Google AdSense Integration:**
  - Ad units will be strategically placed to generate revenue without disrupting the core user experience.
  - **Placement Considerations:**
    - Below the main recipe list (after ingredient input).
    - At the bottom of the scaled results display.
    - Consider "in-feed" or "in-article" ad formats that blend more naturally with the content.
  - **Responsiveness:** Ad units must be fully responsive to adapt to various mobile screen sizes.
  - **User Experience First:** Ad placements will be carefully tested to ensure they do not obstruct critical information or user actions.
  - **AdSense Identifiers:**
    - **`data-ad-client` (Publisher ID):** `ca-pub-4410729598083068` (Replace with your actual Publisher ID)
    - These identifiers will be integrated into the HTML structure where ad units are to be displayed, typically within `<ins class="adsbygoogle" ...>` tags, and the AdSense JavaScript library will be loaded in the `<head>` section of `index.html`.

## 6. Deployment Strategy

- **GitHub Pages:**
  - The chosen technology stack (React, Vite, Tailwind CSS) generates static HTML, CSS, and JavaScript files, which are perfectly suited for hosting on GitHub Pages.
  - **Automated Deployment:** A GitHub Actions workflow will be configured to automatically build the application and deploy it to GitHub Pages upon pushes to the `main` branch, ensuring continuous delivery.
  - **Custom Domain:** Option to configure a custom domain for a more professional appearance.

## 7. Development Guidelines

- **Code Identifiers:** Where logical and appropriate, existing application's identifiers (variable names like `recipe`, `availableIngredients`, function names like `addIngredient`, `calculate`, `updateRecipeList`) will be maintained to preserve the core logic's naming convention and intent.
- **Modularity & Reusability:** Develop the application using a strict component-based architecture. Each UI element and logical unit should be encapsulated in a reusable React component.
- **Code Quality:** Adhere to strict ESLint rules and Prettier formatting for consistent, readable code. Implement TypeScript for enhanced type safety and improved developer experience.
- **Testing:** Implement comprehensive unit tests for core logic (parsing, calculation) using Vitest, and integration tests for critical UI components and user flows using React Testing Library.
- **Documentation:** Maintain clear, concise documentation for components, state management, and core logic. Update the project's `README.md` with setup, usage, and contribution guidelines.
- **Performance:** Continuously monitor and optimize application performance, focusing on fast loading times and smooth interactions, critical for a good mobile experience.
