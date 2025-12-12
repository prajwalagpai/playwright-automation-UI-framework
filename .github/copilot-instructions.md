# Copilot / AI Agent Instructions — Playwright UI Framework

Purpose: Help an AI coding assistant become productive quickly in this repo.

**Big Picture**
- **Stack:** Playwright + TypeScript. Main config: `playwright.config.ts`.
- **Architecture:** Page Object Model (POM). Page classes live in `Pages/` and expose high-level actions (e.g., `loginPage.login(...)`, `productsPage.addItemToCartByName(...)`). Tests live under `tests/` (UI tests in `tests/ui`).
- **Config & env:** Environment-specific base URLs are in `config/environment.ts`. The active environment is selected via `ENV` (e.g., `ENV=test`) and consumed by `playwright.config.ts`.

**Key Files to Read First**
- `Pages/BasePage.ts` — shared helpers (click, type, wait). Use these helpers when adding new page actions.
- `Pages/*.ts` — page classes implement user flows and selectors.
- `tests/ui/*.spec.ts` — concrete examples of how test flows call page methods.
- `playwright.config.ts` — global test options (reporter, traces, artifacts, `baseURL`, CI toggles).
- `config/environment.ts` — environment map (base URLs).
- `utils/aiClient.ts` — optional OpenAI integration used for failure analysis (optional, may rely on `openai` package and `dotenv`).

**Developer Workflows / Commands**
- Install deps: `npm install`
- Install browsers: `npx playwright install`
- Run all tests: `npm test` (runs `playwright test`)
- Run UI tests only: `npm run test:ui` (runs `playwright test tests/ui`)
- Run smoke tests: `npm run test:smoke` (uses `-g '@smoke'` to match test titles)
- Open HTML report: `npm run test:report` or `npx playwright show-report`
- Select environment: `ENV=stg npm test` (Windows PowerShell: `$env:ENV='stg'; npm test`)

**Project-specific Conventions**
- Tests follow Playwright's `spec.ts` naming and live in `tests/ui` for UI scenarios.
- Use the Page Objects in `Pages/` instead of direct `page` interactions inside tests — tests should call high-level methods (e.g., `loginPage.login`, `productsPage.addItemToCartByName`).
- Test tagging: include `@smoke` in test titles to run smoke suite with `-g '@smoke'`.
- Environment selection: rely on `ENV` to pick `baseURL` from `config/environment.ts` rather than hard-coding URLs.
- Keep reporter and artifact settings centralized in `playwright.config.ts` (screenshots, video, trace are enabled there).

**Integration Points & External Dependencies**
- `openai` is listed in `package.json` and used by `utils/aiClient.ts` for optional failure analysis. If modifying, check API key handling (likely via `.env` / `dotenv`).
- `dotenv` is present as a dependency suggestion in the config comments but is commented out — enable consciously and document `.env` keys.

**Adding Features / Tests — Quick checklist for the agent**
- Read `Pages/BasePage.ts` to reuse helpers.
- Add selectors and actions to an appropriate `Pages/*.ts` file, keeping names descriptive (`clickCheckout`, `fillCheckoutInformation`).
- Add a test under `tests/ui` referencing page methods; keep titles consistent and tag with `@smoke` if needed.
- Run `npm run test:ui` locally and verify artifacts in `playwright-report/` using `npx playwright show-report`.

**Avoid making assumptions**
- Do not change `playwright.config.ts` defaults without confirming impact on CI (retries, workers, headless toggles are tied to `CI` env).
- When using AI helpers (`utils/aiClient.ts`), ensure secrets are not committed; prefer `.env` and local secrets in CI.

If anything here is unclear or you want more examples (e.g., a new page + test scaffold), tell me which area to expand and I will iterate.
