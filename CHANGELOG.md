# Change Log

All notable changes to the "vscode-emacs-indent" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

## [0.0.3] - 2026-03-18

### Changed

- Modernized development environment (toolchain, dependencies, and build configuration)
- Keybinding `when` condition extended: added `!editorReadonly` and `!inSnippetMode` to avoid overriding Tab behavior in read-only files and snippet navigation

### Fixed

- Crash when all lines above the cursor are empty: added bounds check after the whitespace-scanning loop

## [0.0.1] - Initial release

- Initial release
