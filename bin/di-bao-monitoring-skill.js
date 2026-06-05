#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");

const packageRoot = path.resolve(__dirname, "..");
const sourceSkill = path.join(packageRoot, "skill", "di-bao-monitoring");
const packageJson = require(path.join(packageRoot, "package.json"));

function usage() {
  console.log(`
di-bao-monitoring-skill ${packageJson.version}

Usage:
  di-bao-monitoring-skill install [--force] [--target <skills-dir>]
  di-bao-monitoring-skill where
  di-bao-monitoring-skill version

Default target:
  $CODEX_HOME/skills when CODEX_HOME is set, otherwise ~/.codex/skills
`);
}

function defaultSkillsDir() {
  if (process.env.CODEX_SKILLS_DIR) return process.env.CODEX_SKILLS_DIR;
  if (process.env.CODEX_HOME) return path.join(process.env.CODEX_HOME, "skills");
  return path.join(os.homedir(), ".codex", "skills");
}

function parseArgs(argv) {
  const args = { command: argv[2] || "help", force: false, target: defaultSkillsDir() };
  for (let index = 3; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--force" || arg === "-f") {
      args.force = true;
    } else if (arg === "--target") {
      index += 1;
      if (!argv[index]) throw new Error("--target requires a directory");
      args.target = argv[index];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function copySkill(targetDir, force) {
  if (!fs.existsSync(sourceSkill)) {
    throw new Error(`Bundled skill not found: ${sourceSkill}`);
  }
  const destination = path.resolve(targetDir, "di-bao-monitoring");
  if (fs.existsSync(destination)) {
    if (!force) {
      throw new Error(`Skill already exists at ${destination}. Re-run with --force to update it.`);
    }
    fs.rmSync(destination, { recursive: true, force: true });
  }
  fs.mkdirSync(targetDir, { recursive: true });
  fs.cpSync(sourceSkill, destination, { recursive: true });
  return destination;
}

function main() {
  const args = parseArgs(process.argv);
  if (args.command === "help" || args.command === "--help" || args.command === "-h") {
    usage();
    return;
  }
  if (args.command === "version" || args.command === "--version" || args.command === "-v") {
    console.log(packageJson.version);
    return;
  }
  if (args.command === "where") {
    console.log(path.resolve(args.target, "di-bao-monitoring"));
    return;
  }
  if (args.command !== "install") {
    throw new Error(`Unknown command: ${args.command}`);
  }
  const destination = copySkill(args.target, args.force);
  console.log(`Installed di-bao-monitoring skill to ${destination}`);
  console.log("Restart Codex or reload skills if the skill list does not refresh immediately.");
}

try {
  main();
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
