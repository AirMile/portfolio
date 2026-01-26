#!/usr/bin/env node
// Format-on-save hook for React + TypeScript (Prettier)

const { execSync } = require('child_process');
const path = require('path');

const EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.md', '.html'];

let input = '';
process.stdin.setEncoding('utf8');

process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path || data.tool_response?.filePath;

    if (!filePath) process.exit(0);

    const ext = path.extname(filePath).toLowerCase();
    if (!EXTENSIONS.includes(ext)) process.exit(0);

    const cwd = process.env.CLAUDE_PROJECT_DIR || process.cwd();
    execSync(`npx prettier --write "${filePath}"`, { stdio: 'ignore', cwd });
  } catch {
    process.exit(0);
  }
});
