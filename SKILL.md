# SKILL: README Update Helper

Purpose

- Capture a lightweight, repeatable process for updating the project README based on code and git history.
- Save the author's preferred writing approach so future README updates are fast and consistent.

When to run

- After a set of commits that introduce new features, configuration, components, or dependency changes.
- Before publishing releases or deploying, to keep documentation in sync.

Principles (author's preferred approach)

1. Keep it short and action-oriented: one-line summary per change.
2. Surface only user-facing changes and notable dev tasks (new pages, APIs, env variables, build changes).
3. Preserve existing content — append or add a discrete "Changes" section rather than rewriting.
4. Use bullet lists and link to code files when helpful.
5. Add a brief "How I verified" line when relevant (manual steps or tests run).

Step-by-step template (what the skill does)

1. Run a git query to collect today's commits:
   - `git log --since="midnight" --pretty=format:"%h %ad %s" --date=local`
   - If you prefer a range: `git log --since="2026-06-13" --until="2026-06-13 23:59" --pretty=format:"%h %ad %s" --date=local`
2. Scan changed files in the commit list and map to documentation areas:
   - `src/` changes → features/components update
   - `src/store/` → include Redux setup and slice examples (store, slices, Provider usage)
   - `config/` or `package.json` → setup/env/dependencies
   - `public/` or `index.html` → public assets or build steps
3. Prepare a short bullet for each meaningful change (one line each):
   - Start: verb (Added / Fixed / Updated) + target (component/file) + purpose
   - Example: `Added Footer and Header components — provide site frame and navigation.`
4. Append a new subsection at the end of `Readme.md` titled `Recent changes (automated reflection)` and paste the bullets.
5. Save commit references (short SHA) in parenthesis if you want traceability.
6. Optionally add a short verification note (tests run, manual smoke test steps).

Template snippet (copy/paste into README)

---

**Recent changes (automated reflection)**

- Added: <short description> (commit <sha>)
- Updated: <short description> (commit <sha>)

If the repo contains Redux state under `src/store/`, also include a short "Redux (example)" section with:

- `src/store/store.js` (store configuration)
- `src/store/<slice>.js` (example slice showing initial state and reducers)
- provider usage from `src/main.jsx` and a small example of dispatch usage (e.g., `login` / `logout` in `App.jsx`).

Notes: For exact per-day commits run: `git log --since="midnight" --pretty=format:"%h %ad %s" --date=local`

Example prompts to call this skill

- "Update README with today's changes"
- "Append today's commits summary to README"
- "Create README reflection for latest commits"

Suggested next customizations

- Add a small script `scripts/generate-readme-reflection.sh` that runs `git` and outputs a markdown snippet to append.
- Add a GitHub Action that automatically appends a changelog fragment to the README on merges to `main` (opt-in).

Notes for the agent

- Do not modify existing README sections; always append a distinct block.
- If local git data is unavailable, add a placeholder reminding the user to run the `git log` command and paste results.

Saved by: README Update Helper skill
