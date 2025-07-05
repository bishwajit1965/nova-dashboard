# Nova Dashboard

## Purpose

Admin system to manage users, roles, permissions with gated feature access via plan tier.

### Features

- Role-based dashboard navigation
- Audit log with plan-based visibility
- Plan upgrade mechanism
- Contacts inbox for user queries

### Tech Stack

- React + Tailwind + Vite
- Node.js + Express + MongoDB

### Role & plan rules

### Folder map

src/
├── components/ # Reusable UI components (e.g., Button, Modal)
├── features/
│ ├── auth/ # login, register, session logic
│ ├── users/ # UserTable, CreateUserForm, userRoutes
│ ├── audit-log/ # AuditLogPage, AuditLogTable
│ ├── plans/ # PlanSelectionPage, usePlan, useFeatureAccess
│ └── contact/ # InboxPage, ContactCard
├── hooks/ # useAuth, useFeatureAccess, useNavAccess
├── config/ # navConfig.js, planConfig.js
├── lib/ # helper functions
├── routes/ # route guards, route layout
├── context/ # ThemeContext, AuthContext
├── pages/ # LandingPage, NotFoundPage
└── App.jsx

### Pending tasks
