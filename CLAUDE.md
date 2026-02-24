# Daemon — Claude Code Standards

## Runtime
- Always use Bun, never Node/npm/pnpm/yarn
- Run scripts: `bun run build`, `bun scripts/prepare-daemon.ts`

## Personal content
- `public/daemon.md` is gitignored — generated at build time
- Personal daemon.md lives at `~/.config/daemon/daemon.md` (outside repo)
- Edit that file, then `bun run build` to rebuild
- Template: `public/daemon.example.md`

## MCP endpoint
- Future MCP server: `https://mcp.daemon.rlyehnet.xyz`
- Not yet deployed — dashboard will show loading/error until MCP server is built

## Deployment
- Host: shadowland (opc@161.153.18.230), `/opt/daemon/`
- Rebuild: `cd /opt/daemon && bun run build`
- nginx serves `/opt/daemon/dist/` directly (no daemon process needed)
