# MCP Server Troubleshooting: Windows npx ENOENT Error

## Symptoms

- Error: `spawn npx ENOENT` when attempting to connect to MCP server
- Server works in some directories but not others
- Particularly occurs in AppData/Roaming directories

## Root Cause

- Windows PATH environment variable not properly inherited
- npx executable not found in execution context
- Common issue with Node.js child processes on Windows

## Solution

Add `cmd /c` prefix to the command in MCP server configuration:

```json
"context7": {
  "command": "cmd",
  "args": [
    "/c",
    "npx",
    "-y",
    "@upstash/context7-mcp@latest"
  ]
}
```

## Why It Works

1. Forces execution through Windows Command Prompt (cmd.exe)
2. cmd.exe has more complete PATH environment configuration
3. Properly inherits Node.js/npm installation paths
4. Provides standardized execution environment

## Alternative Solutions

1. Global installation:
   ```bash
   npm install -g @upstash/context7-mcp
   ```
2. Explicit working directory setting:
   ```json
   "cwd": "C:\\path\\to\\working\\directory"
   ```
3. Symbolic link from AppData to working directory

## Prevention

- Always test MCP servers in target execution environment
- Consider using absolute paths for critical dependencies
- Document environment requirements clearly
