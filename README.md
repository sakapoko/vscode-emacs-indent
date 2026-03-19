# vscode-emacs-indent

Provides Emacs-like Tab behavior for VS Code.

In Emacs, pressing Tab on any column reindents the current line to the correct indentation level, rather than inserting a tab character or spaces at the cursor position. This extension replicates that behavior.

## Features

- **Tab reindents the current line** — pressing Tab anywhere on a line applies `editor.action.reindentselectedlines`, moving the cursor to the correct indent position afterward
- **Plain text fallback** — in plain text files, Tab falls back to the standard `editor.action.indentLines`
- **Blank line handling** — when the line above the cursor is empty, the extension expands the selection upward to the nearest non-empty line before reindenting, matching Emacs behavior

## Keybinding

| Key   | Command                            | Condition                                                                                   |
| ----- | ---------------------------------- | ------------------------------------------------------------------------------------------- |
| `Tab` | `emacs-indent.reindentCurrentLine` | Editor focused, not read-only, not in snippet mode, no suggestion/inline suggestion visible |

To disable or remap, open **Keyboard Shortcuts** (`Ctrl+K Ctrl+S`) and search for `emacs-indent.reindentCurrentLine`.

## Requirements

VS Code 1.85.0 or later.

## Usage with a Formatter

This extension handles **reindentation** (moving a line to the correct indent level), not formatting. For full code formatting, pair it with a formatter such as [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Recommended `.vscode/settings.json` for TypeScript projects:

```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  }
}
```

With this setup, Tab reindents the current line immediately (this extension), and the file is fully formatted on save (Prettier).
