# Coding Challenge: Create a Combobox with Arrow Navigation

## Goal
Design and implement a combobox (autocomplete input) as a React component. The component should be fully navigable via keyboard and follow accessibility best practices.

For reference, consult the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/).

## Tech Stack

- React
- TypeScript
- Vite

## Requirements:

### Getting Started

To get your environment up and running:

1.Fork this repository to your GitHub account.
2.Clone your fork locally.
3.Run npm install to set up dependencies.
4.Start the development server with npm run dev.
5.Build your combobox inside the project.

- You may change or delete any existing boilerplate as needed.
- Please refrain from using external libraries that aren't already in the repository.

### Core Functionality

Your combobox should:
 - Show an input field for user text entry.
 - Filter a predefined list of options based on the user’s input (case-insensitive).
 - Display a list of matching results below the input.
 - Let users navigate the results using:
   - Arrow Up / Down keys to highlight an item.
   - Enter to select an item.
   - Mouse clicks for selection.
 - Hide the dropdown when:
   - The input loses focus.
   - The Escape key is pressed.
 - Display a “No results” message when no matches are found.

### Accessibility:

- Ensure the component is keyboard-navigable.

### Bonus (Optional if time permits):

- Add appropriate ARIA attributes (aria-expanded, aria-controls, etc.).
- Allow for multiple selection (tags-style).
