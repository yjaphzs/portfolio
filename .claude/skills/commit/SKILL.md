---
name: commit
description: Stage, write, and push commits in this repository, and open pull requests. Use whenever the user asks to commit, stage changes, write a commit message, amend, push, or open a PR. Encodes this repo's message format, the checks that gate deployment, and the fact that pushing to main ships to production.
---

# Committing in this repository

## The one thing to know first

**`.github/workflows/deploy.yml` deploys to production on every push to `main`.**
There is no staging environment and no manual approval step. A push to `main` is a
release to <https://yjaphzs.xyz>.

Two consequences:

- **Never push to `main` unless the user has asked for exactly that.** Work on a
  branch and let them merge. If you are on `main` and about to commit real changes,
  branch first.
- The deploy runs `lint` and `typecheck` as gating jobs before it builds. A commit
  that fails either one does not just fail CI — it blocks the deploy for everything
  behind it.

Changes limited to these paths do **not** trigger a deploy (`paths-ignore`):
`**/*.md`, `docs/**`, `LICENSE`, `.claude/**`, `models-src/**`.

## Before committing

There are no git hooks in this repo — nothing runs automatically, so run the same
gates CI will:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # eslint . — must be 0 errors; warnings are tolerated
```

Run `npm run build` too when the change touches routing, `next.config.ts`,
`src/app/**`, images, fonts, or CSS. The static export is where client/server
boundary mistakes surface — they do not appear in `next dev`.

Then read what you are about to commit:

```bash
git status --short
git diff --staged
```

## Message format

Recent work uses **Conventional Commits**, and new commits should follow it:

```
type(scope): imperative summary under ~72 chars

Optional body explaining WHY, wrapped at 72. Skip it when the subject
already says everything — most commits here are subject-only.
```

Older history is sentence-case and descriptive (`Added Carousel`, `Updated Bio`).
Do not go back and restyle it; just write new commits in the current format.

**Types**: `feat`, `fix`, `refactor`, `perf`, `style`, `docs`, `test`, `build`, `ci`, `chore`

**Scopes actually used in this codebase** — pick the narrowest that fits:

| Scope | Covers |
|---|---|
| `v3` | the live portfolio: `src/app/**`, `src/components/v3/**` |
| `v2`, `v1` | the archived versions under `src/app/archived/**`, `src/components/v1/**` |
| `seo` | metadata, sitemap, robots, structured data, `src/lib/seo.ts` |
| `stats` | presence counter, visitor stats, Firebase hooks |
| `tv` | the time machine, channel guide, retro TV canvas |
| `resume` | `/resume` and `src/data/resume.ts` |
| `ci` | `.github/workflows/**` |
| `deps` | dependency bumps |

Real examples from this history:

```
feat(v3): keyboard shortcuts, and a legend in the rail
fix(stats): await counter writes and stop swallowing rejections
fix(stats): self-heal visitor counters, add optional App Check
```

Write the subject as a command ("add", "fix", "move"), not a report ("added",
"fixes"). No trailing period.

## Never commit

- **`.env`** and anything matching `.env.*` except `.env.example`. It holds the real
  Firebase config. `.gitignore` covers it — do not force-add past it.
- `out/`, `.next/`, `node_modules/`, `next-env.d.ts` — all generated.
- Secrets of any kind. The `NEXT_PUBLIC_FIREBASE_*` values are public by design and
  live in GitHub repository *Variables*, not in the repo and not in Secrets.

If `git status` shows any of these as untracked, leave them alone rather than
adding a blanket `git add -A`.

## Staging

Prefer explicit paths over `git add -A`, so an unrelated stray file cannot ride
along:

```bash
git add src/app/page.tsx src/lib/seo.ts
```

Keep one logical change per commit. When a diff spans genuinely separate concerns,
make separate commits rather than one that needs "and" three times in its subject.

## Branches and PRs

Branch names follow `type/short-kebab-description`, matching the message types:

```
feat/v3-gear-cards
fix/stats-race
```

Create the branch before the first commit, not after:

```bash
git switch -c feat/v3-gear-cards
```

Push a branch with `git push -u origin <branch>`. For pull requests use the `gh`
CLI if it is installed (`gh pr create`); if it is not, push the branch and give the
user the compare URL rather than trying to install anything.

The repo has no merge commits — history is linear. Do not add merge commits
locally; rebase onto `main` if a branch falls behind.

## Rules of engagement

- **Commit and push only when asked.** Finishing a task is not an instruction to
  commit it.
- Prefer a new commit over `--amend`. Only amend a commit that has not been pushed,
  and never one that someone else may have pulled.
- Never use `--no-verify`, `--no-gpg-sign`, or `-c commit.gpgsign=false` unless the
  user explicitly asks. If something fails, fix the cause.
- Do not `git checkout --`, `git reset --hard`, or `git push --force` to tidy up
  without asking first — those discard work that may not be recoverable.
- Report honestly. If lint or typecheck failed and the user still wants the commit,
  say so plainly in your reply rather than quietly committing broken code.

## Attribution

End commit messages with:

```
Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
```

End PR bodies with:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```
