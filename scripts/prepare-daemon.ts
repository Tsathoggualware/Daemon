#!/usr/bin/env bun
/**
 * prepare-daemon.ts
 *
 * Resolves your personal daemon.md from outside the repo (XDG config)
 * and copies it into public/daemon.md for the Astro build.
 *
 * Path resolution order:
 *   1. $DAEMON_MD_PATH environment variable (CI/CD override)
 *   2. $XDG_CONFIG_HOME/daemon/daemon.md
 *   3. ~/.config/daemon/daemon.md  (default)
 *   4. public/daemon.example.md   (fallback — template only)
 */

import { copyFileSync, existsSync } from "fs";
import { join } from "path";

const OUT = join(import.meta.dir, "..", "public", "daemon.md");
const EXAMPLE = join(import.meta.dir, "..", "public", "daemon.example.md");

function resolve(): { path: string; source: string } {
  if (process.env.DAEMON_MD_PATH) {
    return { path: process.env.DAEMON_MD_PATH, source: "$DAEMON_MD_PATH" };
  }
  const xdgBase = process.env.XDG_CONFIG_HOME ?? join(process.env.HOME!, ".config");
  const xdgPath = join(xdgBase, "daemon", "daemon.md");
  if (existsSync(xdgPath)) {
    return { path: xdgPath, source: "XDG (~/.config/daemon/daemon.md)" };
  }
  return { path: EXAMPLE, source: "daemon.example.md (template — customize ~/.config/daemon/daemon.md)" };
}

const { path, source } = resolve();
copyFileSync(path, OUT);
console.log(`[prepare-daemon] Using: ${source}`);
