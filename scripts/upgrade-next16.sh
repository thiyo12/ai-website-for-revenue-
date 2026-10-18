#!/usr/bin/env bash
set -euo pipefail

# Controlled migration to a patched framework. Run on a disposable branch
# with a clean worktree, and review the resulting package-lock.json diff.
if [ -n "$(git status --porcelain)" ]; then
  echo "Refusing to modify a dirty worktree. Commit or stash your changes first." >&2
  exit 1
fi
node -e 'if (+process.versions.node.split(".")[0] < 22) { console.error("Node.js 22+ is required."); process.exit(1) }'
echo "Upgrading to the candidate versions tested in GitHub Actions…"
npm install --save --legacy-peer-deps next@16.4.2 react@19.2.0 react-dom@19.2.0
npm install --save-dev --legacy-peer-deps @types/react@19 @types/react-dom@19 eslint-config-next@16.4.2 eslint@9
# npm audit fix (without --force) should apply only compatible patch/minor resolutions.
# It may still leave findings requiring explicit analysis.
npm audit fix --legacy-peer-deps || true
npx prisma generate
npm run build -- --webpack
npx playwright test
node scripts/audit-production.mjs --enforce
echo "Migration build, browser checks, and production audit passed."
echo "Review changed package.json, package-lock.json and tsconfig.json before committing."
