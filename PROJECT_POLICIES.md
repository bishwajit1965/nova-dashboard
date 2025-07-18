from pathlib import Path

# Define the content for the PROJECT_POLICIES.md file

markdown_content = """

# 🌐 Nova Dashboard SaaS Project Policies

---

## 📄 General Overview

Nova Dashboard is a **multi-tenant SaaS admin system** where different organizations/teams can manage users, roles, permissions, and plan-specific features. Each team operates in an isolated data space.

---

## 💲 Ownership & Platform Management

- **Platform Owner:** You (the developer) are the sole owner and super admin of the platform.
- **Super Admin Role:** Has access to all teams, plans, billing, and global audit logs.
- **Delegation:** Future support for platform-level moderators/admins can be added.

---

## 🏢 Team Structure & Management

- **Team Creation:**
  - Only authenticated users can create a team.
  - A user can **only create one team**.
- **Team Admin:**
  - The creator of a team is automatically granted the `admin` role within that team.
  - The team admin can:
    - Invite users by email
    - Assign roles to users
    - Remove or disable users
    - Manage team-specific resources

---

## 👥 User Roles & Permissions

- **System Roles:** Defined globally (`admin`, `editor`, `member`)
- **Team Roles:** Assigned per user within the team context
- **Permissions:** Derived from roles, can also be assigned directly

---

## 🚫 Data Isolation

- All major models (e.g., users, logs, resources) include `teamId`
- Users only access data from their team
- Super Admin can access all data across all teams

---

## 📢 Invitations & Membership

- **Invite Flow:**
  - Team admins invite by email
  - If user exists and belongs to another team: ❌ rejected
  - If user exists in same team: ✅ role updated
  - If user doesn't exist:
    - An invite is generated
    - A signup link is emailed
    - On signup, the user is auto-assigned to the team and role

---

## 📆 Plans & Feature Gating

- Teams and users are linked to a plan (`Free`, `Pro`, `Enterprise`, etc.)
- Plan defines:
  - Feature access
  - Max users or seats
  - Storage and API quotas
- Upgrading/Downgrading plans is done through the UI

---

## ⚖️ Admin UI & Controls

- **Super Admin Dashboard:**

  - View/manage all teams and users
  - Force delete teams or users
  - Monitor audit logs
  - Override roles and permissions

- **Team Admin Dashboard:**
  - Limited to own team’s data and users

---

## ⏳ Expiration, Cleanup & Maintenance

- Invite links expire after **10 minutes**
- Future support for:
  - CRON jobs for cleanup
  - Inactivity flags
  - Storage monitoring
  - Email reminders

---

## 📅 Future-Proofing

- Tenant ID abstracted → ready to become `orgId` if needed
- Third-party tools (e.g., Stripe, SendGrid) modularized
- Support for plugin-based feature toggles by plan

---

## ✅ Final Notes

- The platform is built to be scalable, secure, and user-focused
- Policy decisions can evolve over time
- Ownership remains centralized unless delegated

---

**Author:** System Architect  
**Last Updated:** July 17, 2025
"""

# Save the content to a markdown file

file_path = Path("/mnt/data/PROJECT_POLICIES.md")
file_path.write_text(markdown_content)

file_path.name
