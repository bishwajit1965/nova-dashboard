# Nova‑Dashboard — Final Roadmap

> Work left before v1.0 launch

## 1. Core Features

- [x] Auth (email, Google, Facebook)
- [x] Role & permission CRUD
- [x] Plan CRUD + plan gating
- [x] Plan upgrade / delete mutations
- [x] User CRUD + pagination
- [x] Activity chart & toast system
- [x] Contact form (save + email)
- [x] Audit‑log table basic view
- [x] Audit‑log **filters** (date, user)

## 2. Global UX polish

- [x] **404 / fallback** route styling
- [ ] **Full‑screen loading spinner** while auth + settings load
- [ ] **Global error boundary** (nice message + “Go Home” link)
- [ ] Mobile sidebar auto‑collapse

## 3. Settings System

- [x] Settings CRUD in admin
- [ ] **Public settings endpoint** (`/api/settings/public`)
- [ ] **SettingsProvider** front‑end context
- [ ] Use settings for: site title, colors, footer HTML

## 4. Remaining Plan/Card bug (optional)

- [ ] Investigate `userPlan` first‑load mismatch (low priority – guarded)

## 5. Optional “Wow” extras (skip for v1.0 if time tight)

- [ ] Stripe billing integration (upgrade/downgrade + webhooks)
- [ ] Notification center (bell icon)
- [ ] Plan expiry reminder emails

## 6. Documentation & Deployment

- [ ] README screenshots + GIF
- [ ] Seed script docs (`npm run seed:dev`)
- [ ] Render/Vercel deploy script
- [ ] Tag `v1.0.0` release

---

### Recommended Attack Order

1. **Global UX polish**  
   _404, spinner, error boundary_ → quick wins, high impact.
2. **Settings integration**  
   Finish public endpoint, SettingsProvider, wire title/footer.
3. **Audit‑log filters**  
   Add date & user query params + front‑end controls.
4. **Small plan/card mismatch**  
   Circle back only if it still annoys you.
5. **Docs & deployment**  
   Final README polish, push to live, tag release.

Ship v1.0, then decide if Stripe/Notifications are worth a v1.1 sprint.

### Nova‑Dashboard — Roadmap

_Last updated: **[2025‑07‑05]**_

## 1. Core Features

| Task                             | Status | Notes                                                 |
| -------------------------------- | ------ | ----------------------------------------------------- |
| Auth (email / Google / Facebook) | ✅     |                                                       |
| Role & Permission CRUD           | ✅     |                                                       |
| Plan CRUD + Upgrade / Delete     | ✅     | UI shows correct plan but needs bug revisit (see 4.1) |
| User CRUD (pagination)           | ✅     |                                                       |
| Contact Form (save + email)      | ✅     |                                                       |
| Audit‑Log Table basic            | ✅     |                                                       |

### 1.1 Missing Core Enhancements

| Task                               | Status | Notes                          |
| ---------------------------------- | ------ | ------------------------------ |
| Audit‑Log **filters** (date, user) | ⬜     | Add query params + UI controls |

---

## 2. Global UX & Reliability

| Task                                                  | Status | Notes                            |
| ----------------------------------------------------- | ------ | -------------------------------- |
| Full‑screen loader (**SplashScreen** + `StartupGate`) | ✅     |                                  |
| Global **ErrorBoundary** with custom `ErrorFallback`  | ✅     |                                  |
| Local ErrorBoundary on **PlanCard**                   | ✅     | replicate on other risky widgets |
| Mobile sidebar auto‑collapse                          | ⬜     |                                  |

---

## 3. Settings System

| Task                                       | Status | Notes                                    |
| ------------------------------------------ | ------ | ---------------------------------------- |
| Settings CRUD UI (admin)                   | ✅     |                                          |
| `SettingsProvider` (stub)                  | ✅     | returns `settings:null`, `loading:false` |
| Public Settings API `GET /settings/public` | ⬜     | backend                                  |
| Wire real fetch inside SettingsProvider    | ⬜     | replace stub with `useApiQuery`          |
| Use settings: site title, colors, footer   | ⬜     |                                          |

---

## 4. Bugs / Technical Debt

| ID  | Description                                            | Status                                                       |
| --- | ------------------------------------------------------ | ------------------------------------------------------------ |
| 4.1 | PlanCard state desync on fast login‑switch             | 🟡 mitigated (boundary & guards); revisit after all features |
| 4.2 | Add `Array.isArray` guards in components that map data | 🟡 PlanCard done; audit remaining tables                     |

---

## 5. Optional “Wow” Extras (post‑v1.0)

| Task                               | Status | Notes |
| ---------------------------------- | ------ | ----- |
| Stripe billing (upgrade/downgrade) | ⬜     |       |
| Notification center (bell icon)    | ⬜     |       |
| Plan expiry reminder emails        | ⬜     |       |

---

## 6. Documentation & Deployment

| Task                                  | Status | Notes |
| ------------------------------------- | ------ | ----- |
| README screenshots + GIF              | ⬜     |       |
| Seed script docs (`npm run seed:dev`) | ⬜     |       |
| Render / Vercel deploy script         | ⬜     |       |
| Tag **v1.0.0** release                | ⬜     |       |

---

### Current Recommended Focus

1. **Finish Settings System**

   - Public endpoint
   - Real SettingsProvider fetch
   - Apply siteName, footer

2. **Audit‑Log filters**

3. **Mobile sidebar auto‑collapse**

4. Resolve bug **4.1** if time remains.
