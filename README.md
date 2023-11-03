# React-Context 🎨

<!-- Placeholder for the library logo -->
<!-- ![React-Context Logo](path-to-your-logo) -->

<!-- License Badge -->
![GitHub](https://img.shields.io/github/license/prabhuignoto/react-pointer-plus)

<!-- Version Badge -->
![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/prabhuignoto/react-pointer-plus)

<!-- Build Status Badge -->
<!-- ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/prabhuignoto/repo/workflow-name) -->

<!-- Code Coverage Badge -->
<!-- ![Coverage](https://img.shields.io/codecov/c/github/prabhuignoto/react-pointer-plus) -->

<!-- Code Quality Badge -->
<!-- ![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/prabhuignoto/react-pointer-plus) -->

<!-- Dependency Status Badge -->
![David](https://img.shields.io/david/prabhuignoto/repo)

<!-- Open Issues Badge -->
<!-- ![GitHub issues](https://img.shields.io/github/issues/username/repo) -->

<!-- Pull Requests Badge -->
<!-- ![GitHub pull requests](https://img.shields.io/github/issues-pr/username/repo) -->

<!-- Downloads Badge -->
<!-- ![GitHub downloads](https://img.shields.io/github/downloads/username/repo/total) -->

<!-- Stars Badge -->
<!-- ![GitHub stars](https://img.shields.io/github/stars/username/repo) -->

<!-- Forks Badge -->
<!-- ![GitHub forks](https://img.shields.io/github/forks/username/repo) -->

<!-- Twitter Follow Badge -->
<!-- ![Twitter Follow](https://img.shields.io/twitter/follow/yourhandle?style=social) -->

Customize the mouse pointer, mouse selection, and context menu in React applications with ease using React-Context.

## Introduction 🚀

React-Context is a powerful and customizable library designed to enhance the user experience by providing full control over the mouse pointer, selection, and context menu within your React applications. It's perfect for creating a more interactive and visually appealing web application.

## Features ✨

- 🎨 Customizable mouse pointers with different styles and sizes.
- 🖱️ Enhanced mouse selection with customizable appearance.
- 📋 Custom context menus with optional icons and action callbacks.
- 🌗 Full support for light and dark themes.
- 🛠️ Extendable with custom icons and toolbar options.
- 📐 Easy to use with clear and concise API.

## Installation 🔧

Install the package using npm:

```bash
npm install react-context
```

Or using yarn:

```bash
yarn add react-context
```

## Usage 🛠️

Here's a quick example to get you started:

```jsx
import React, { useRef } from 'react';
import { useMouseSelection } from 'react-context';

function App() {
  const ref = useRef();

  useMouseSelection({
    targetRef: ref,
    // ...other options
  });

  return <div ref={ref}>Your content here</div>;
}
```

## Props 📐

| Prop                    | Type      | Default                       | Description                                    |
| ----------------------- | --------- | ----------------------------- | ---------------------------------------------- |
| `targetRef`             | React Ref | -                             | Ref object pointing to the target element.     |
| `pointerStyle`          | Object    | `{ color: "#000", size: 20 }` | Defines the style of the mouse pointer.        |
| `selectionStyle`        | Object    | `selectionStyleDefaults`      | Style of the selection box.                    |
| `status`                | String    | `"default"`                   | The status of the mouse selection.             |
| `contextMenu`           | Object    | -                             | Defines the context menu options.              |
| `theme`                 | Object    | `defaultTheme`                | Theme settings for the component.              |
| `icons`                 | Object    | `defaultIcons`                | Icons for different statuses.                  |
| `toolbar`               | Object    | -                             | Defines the toolbar icons.                     |
| `darkMode`              | Boolean   | -                             | Enables dark mode.                             |
| `onContextMenuSelected` | Function  | -                             | Callback when a context menu item is selected. |
| `popupGap`              | Number    | `10`                          | Gap between the popup and the selected area.   |

## Examples 📚

### Basic Example

```jsx
import React, { useRef } from 'react';
import { useMouseSelection } from 'react-context';

function BasicExample() {
  const ref = useRef();

  useMouseSelection({
    targetRef: ref,
    // Default options will be used
  });

  return <div ref={ref}>Your interactive content here</div>;
}
```

### Custom Pointer Style

```jsx
import React, { useRef } from 'react';
import { useMouseSelection } from 'react-context';

function CustomPointerExample() {
  const ref = useRef();

  useMouseSelection({
    targetRef: ref,
    pointerStyle: {
      color: 'red',
      size: 25
    },
  });

  return <div ref={ref}>Hover over me with a custom pointer!</div>;
}
```

### Custom Selection Style

```jsx
import React, { useRef } from 'react';
import { useMouseSelection } from 'react-context';

function CustomSelectionExample() {
  const ref = useRef();

  useMouseSelection({
    targetRef: ref,
    selectionStyle: {
      backgroundColor: 'rgba(0, 123, 255, 0.2)',
      borderColor: 'blue',
      borderStyle: 'dashed',
      borderWidth: 2
    },
  });

  return <div ref={ref}>Try selecting me!</div>;
}
```

### Dark Mode with Custom Theme

```jsx
import React, { useRef } from 'react';
import { useMouseSelection } from 'react-context';

function DarkModeExample() {
  const ref = useRef();

  useMouseSelection({
    targetRef: ref,
    darkMode: true,
    theme: {
      primary: '#007FFF',
      secondary: '#6495ED',
      iconSize: '1rem',
      darkMode: {
        menuBackgroundColor: '#1E1E1E',
        menuColor: '#fff',
        menuItemHoverColor: '#333'
      }
    },
  });

  return <div ref={ref} style={{ backgroundColor: '#333', color: '#fff' }}>Dark mode is cool!</div>;
}
```

### Advanced Usage with Toolbar and Custom Context Menu

```jsx
import React, { useRef } from 'react';
import { useMouseSelection } from 'react-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCut, faPaste, faTrashAlt, faSave } from '@fortawesome/free-solid-svg-icons';

function AdvancedExample() {
  const ref = useRef();

  useMouseSelection({
    targetRef: ref,
    toolbar: {
      icons: [
        { name: "copy", icon: <FontAwesomeIcon icon={faCopy} size="2x" /> },
        { name: "cut", icon: <FontAwesomeIcon icon={faCut} size="2x" /> },
        { name: "paste", icon: <FontAwesomeIcon icon={faPaste} size="2x" /> },
        { name: "delete", icon: <FontAwesomeIcon icon={faTrashAlt} size="2x" /> },
        { name: "save", icon: <FontAwesomeIcon icon={faSave} size="2x" /> },
      ],
    },
    contextMenu: {
      items: [
        { name: "Copy", icon: <FontAwesomeIcon icon={faCopy} />, action: () => console.log("Copy action") },
        { name: "Cut", icon: <FontAwesomeIcon icon={faCut} />, action: () => console.log("Cut action") },
        { divider: true },
        { name: "Paste", icon: <FontAwesomeIcon icon={faPaste} />, action: () => console.log("Paste action") },
        { name: "Delete", icon: <FontAwesomeIcon icon={faTrashAlt} />, action: () => console.log("Delete action") },
        { divider: true },
        { name: "Select All", action: () => console.log("Select All action"), disabled: true },
        { name: "Save", icon: <FontAwesomeIcon icon={faSave} />, action: () => console.log("Save action") },
        { name: "Discard", icon: <FontAwesomeIcon icon={faTrashAlt} />, action: () => console.log("Discard action") },
      ],
    },
    onContextMenuSelected: (item) => {
      console.log(item.name + ' selected');
    },
  });

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', border: '1px solid #ccc' }}>
      Right-click or select content in this area to see the custom context menu and toolbar.
    </div>
  );
}

```

## License 📜

Distributed under the MIT License. See `LICENSE` for more information.

## Contributing 🤝

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- Markdown link & img dfn's -->