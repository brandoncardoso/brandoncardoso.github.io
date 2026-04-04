---
date: 2026-03-27
lastmod: 2026-03-27
title: "Shell"
status: "seedling"
tags: []
---

## Useful shortcuts
* <kbd>Ctrl</kbd><kbd>U</kbd> - Cut text from cursor to beginning of line.
* <kbd>Ctrl</kbd><kbd>K</kbd> - Cut text from cursor to end of line.
* <kbd>Ctrl</kbd><kbd>A</kbd> - Jump to beginning of line.
* <kbd>Ctrl</kbd><kbd>E</kbd> - Jump to end of line.
* <kbd>Ctrl</kbd><kbd>X</kbd> <span>then</span> <kbd>Ctrl</kbd><kbd>E</kbd> - Opens current command in ==$EDITOR==. Executes on save and exit. (related: [fc](#fc))
* <kbd>Alt</kbd><kbd>.</kbd> <span>or</span> <kbd>Esc</kbd><kbd>.</kbd> - Insert the last argument from previous command. Repeated use goes further in history.

## Useful commands
* `cd -` - Change to the previous directory.
* `> file.txt` - Completely empty file without deleting or recreating. Preserves file permissions, ownership, and doesn't interrupt processes that have the file open already.
* `$_` - Expands to the last argument of the previous command. `mkdir -p /some/long/path/newdir && cd $_`
* <span id="fc">`fc`</span> - Opens previous command in ==$EDITOR==. Re-executes on save and exit.

## Links
* [Shell Tricks - Larvitz Blog](https://blog.hofstede.it/shell-tricks-that-actually-make-life-easier-and-save-your-sanity/)
