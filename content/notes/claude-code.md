+++
date =  2026-03-01
lastmod = 2026-03-01
title = 'Claude Code'
slug = 'claude-code'
status = "seedling"
tags = ["ai"]
+++

## Key Concepts

### Skills and Commands

`.claude/skills/`
`.claude/commands/`

* skills are stored workflows targeting a specific scope, shorthand for prompts structured for a specific task
    * e.g. a "refactor/clean" skill goes through and refactors all Code
* skills are a broader workflow definition
* commands are skills that are executed by a slash command
* commands are quick executable prompts


### Hooks

`.claude/hooks/`

* trigger based automations that fire on specific events
* restricted to tool calls and lifecycle events

#### Hook Types
* **PreToolUse** - before a tool executes*
* **PostToolUse** - after a tool has finished executing
* **UserPromptSubmit** - when user sends a message
* **Stop** - when Claude finishes responding
* **PreCompact** - before context is compacted
* **Notification** - on permission request


### Subagents

`~/.claude/agents/`

* processes that are orchestrated by Claude to delegate tasks with limited scopes
* can run in background or foreground
* a subagents can be assigned a subset of skills, and sandboxed with specific tool access


### Rules and Memory

* define rules and best practices that Claude should always follow

Two approaches:
* single `.claude/CLAUDE.md` file with everything, user or project level
* multiple `.claude/rules/<...>.md` files grouped by concern: security, testing, coding-style, etc.

#### Example Rules
* never commit console.log
* follow SOLID principles
* always test code before deployment


### Model Context Protocol (MCP)

* an MCP connects Claude to external services
* prompt driven wrapper around an API, allowing more flexibility

#### **CRITICAL** - Context Window Management

* keep unused MCPs disabled
* performance/context usage degrades rapidly with many enabled


### Plugins

* packaged tools for easy installation
* can contain skills, MCP, hooks, tools, or some combination


## Tips and Tricks

`/fork` - forks a conversation to do non-overlapping tasks in parallel instead of queuing messages

**git worktrees** - for overlapping parallel Claude instances without conflicts. Each worktree is an independent checkout

### Useful commands
* `/rewind` - go back to previous state
* `/statusline` - customize the Claude status line (branch name, context %, todos, etc)
* `/compact` - manually trigger context compaction

## Context and Memory Management

## Links

[everything claude code]( https://github.com/affaan-m/everything-claude-code ) - structured claude code configs for full product development
