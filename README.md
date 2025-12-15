 Playwright Automation Framework (UI + API)

![UI Tests](https://github.com/prajwalagpai/playwright-automation-UI-framework/actions/workflows/ui-tests.yml/badge.svg)
![API Tests](https://github.com/prajwalagpai/playwright-automation-UI-framework/actions/workflows/api-tests.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-45ba4b?logo=playwright&logoColor=white)


**Author:** Prajwala Govind Pai  
**Location:** Melbourne, Australia  
**Role:** QA Automation Engineer  
**Tech Stack:** Playwright, TypeScript, UI & API Automation, CI/CD  

---

This repository contains a **Playwright + TypeScript automation framework** designed to demonstrate **real-world UI and API automation practices**, including **visual regression testing** and **CI/CD integration using GitHub Actions**.

The framework is intentionally structured to be **scalable, maintainable, and production-ready**, rather than a simple demo project.

---

## 🛠️ Setup & Installation

This project is built using **Playwright with Node.js** and was developed using **Visual Studio Code**. 
The setup is minimal and straightforward.

---

### Prerequisites
The following must be installed on the machine before working with this project:

- **Node.js (LTS)** – required to run Playwright (npm comes bundled)
- **Git** – required for cloning the repository and version control

---

### Tools Installed
After setting up the IDE, the following tools were installed as part of the project setup:

- **Playwright (project-level installation via npm)** 
  Installed using:
  ```bash
  npm install
  npx playwright install

### VS Code Extensions Installed
- **Playwright Test for VS Code**
- **GitHub Copilot**
- **GitHub Copilot Chat**

### CI Setup
- **GitHub Actions** (configured under `.github/workflows/` to run Playwright tests in CI)

## ✨ Key Features

- UI automation using Playwright with TypeScript  
- API automation using Playwright `APIRequestContext`  
- Visual regression testing for critical UI pages  
- Page Object Model (POM) implementation  
- Environment-based configuration  
- Secure secrets management  
- CI/CD integration using GitHub Actions  
- Separate pipelines for UI and API tests  
- Cross-browser testing support  
- GitHub Copilot-assisted development  

---

## 🧱 Framework Architecture

### Page Object Model (POM)
- Clear separation between test logic and UI interactions  
- Reusable page classes for improved maintainability  
- Reduced duplication and better readability  

### Separation of Concerns
- UI tests and API tests are fully isolated  
- API logic implemented through a dedicated client layer  
- Independent execution paths for faster and clearer feedback  

## 🌍 Environment Configuration

- Supports multiple environments (e.g. `test`, `stg`)  
- Centralised configuration through a config loader  
- Environment selected via `process.env.ENV`  
- Clean separation between UI and API configuration  

---

## 🔐 Secrets Management

- Local execution uses a `.env` file (never committed)  
- CI/CD uses **GitHub Actions Secrets**  
- API keys and sensitive values are injected securely at runtime  
- Secrets are never exposed in source code or logs  

---

## 🧪 UI Automation

- Functional UI tests covering:
  - Login  
  - Product listing  
  - Cart  
  - Checkout flows  
- Uses Playwright assertions and fixtures  
- Screenshots, videos, and traces captured on failures  
- Cross-browser execution supported  

---

## 🔗 API Automation

- API automation built using Playwright `APIRequestContext`  
- Tests implemented against the public **Reqres API** (https://reqres.in)  
- Dedicated API client layer for clean request handling  
- Covers:
  - Positive API scenarios  
  - Negative and validation scenarios  
- API tests run independently from UI tests  

### API Configuration
- Base API URL configured via `config/environment.ts`  
- API authentication handled using environment variables  
- `REQRES_API_KEY`:
  - Stored in `.env` for local execution  
  - Stored in GitHub Actions Secrets for CI/CD  
- API-specific configuration isolated in `config/apiEnv.ts`  

---

## 👀 Visual Regression Testing

- Minimal visual regression implemented for the **Login page**  
- Covers:
  - Default state  
  - Error state  
- Snapshot-based comparison using Playwright  
- Baseline screenshots committed and validated in CI  
- Designed to be stable and low-maintenance  

---

## 🌐 Cross-Browser Testing

Configured using Playwright projects:
- Chromium (Chrome)  
- Microsoft Edge  

Browser configuration is defined in `playwright.config.ts`.

---

## 🚀 CI/CD – GitHub Actions

### UI Pipeline
- Runs UI functional tests  
- Executes visual regression tests  
- Runs on Chromium and Microsoft Edge  
- Uploads Playwright reports and artifacts  

### API Pipeline
- Runs API tests independently  
- Injects API secrets securely  
- Provides fast feedback for backend validation  

Both pipelines run on **GitHub-hosted Ubuntu runners**.

---

### CI Test Artifacts (GitHub Actions)
- When tests run in CI, Playwright reports and screenshots are uploaded as artifacts
- To view them:
1. Go to the **Actions** tab in this repository
2. Select a workflow run (UI or API pipeline)
3. Scroll to **Artifacts**
4. Download the Playwright report
5. Open `index.html` locally to view screenshots, videos, and trace files

## ▶️ Running Tests Locally

```bash
npm install
```

**Run UI tests**
```bash
npx playwright test tests/ui
```

**Run API tests**
```bash
npx playwright test tests/api
```

**Update visual regression snapshots**
```bash
npx playwright test tests/ui/visual-login.spec.ts --update-snapshots
```

---

## 🎯 Why This Framework?

This framework demonstrates:
- End-to-end automation ownership  
- UI, API, and visual testing in a single solution  
- CI/CD-ready automation practices  
- Secure configuration and secrets handling  
- Scalable design aligned with enterprise automation standards  

