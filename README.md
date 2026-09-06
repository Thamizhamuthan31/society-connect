# SocietyConnect — Community Management Web App

SocietyConnect is a responsive frontend web application for a residential society or community. It was created for the Horizon Broadband technical assessment and focuses on a smaller set of complete, explainable workflows instead of claiming to implement every possible society feature.

> **Important:** This repository is intentionally a frontend assessment demo. It uses local mock data, React state, and `localStorage` (for requests, RSVPs, bookings, and the poll vote) so that every interaction can be demonstrated and survives a page refresh without a backend. The production architecture section explains where authentication, authorization, API validation, database persistence, and notifications would be added.

## What is implemented

| Area | Included behavior |
|---|---|
| Resident overview | Dashboard summary, community pulse, quick actions, notice previews, activity chart |
| Digital notice board | Searchable announcements, categories, pinned notices, save-for-later feedback |
| Service requests | Filter by status, request table, create-request modal, persisted to `localStorage` |
| Events | Event cards, RSVP toggle (persisted), attendee counts, committee event placeholder feedback |
| Facilities | Shared facility list, availability labels, booking toggle (persisted), booking confirmation |
| Resident directory | Search by name, unit, or role; privacy-minded contact feedback |
| Polls | Select an option, submit a vote (persisted), see percentages after submission |
| Visitor pass | Form validation, date selection, live pass preview, success state |
| Responsive behavior | Persistent desktop navigation rail and mobile navigation drawer |
| UI quality | Loading-free mock state, empty/search state, toast feedback, focus states, reduced-motion support |

## Technology stack

- **React 19** with TypeScript for reusable UI components and local state.
- **Vite** for the development server and production build pipeline.
- **Tailwind CSS 4** for responsive utility styling, combined with a small set of project-specific CSS classes.
- **Lucide React** for consistent interface icons.
- **Wouter** for the top-level route fallback.
- **Sonner** for lightweight action feedback.
- **Generated visual assets** for the SocietyConnect brand mark and editorial community imagery.

## Architecture used

The project uses a simple frontend feature architecture that is easy to explain in an interview: a single shell owns navigation and routing between views, each feature screen is its own component, and shared UI and data live in their own modules.

```text
App.tsx
  └── ThemeProvider + Router + Toaster
        └── pages/Home.tsx                 (shell: sidebar, header, view switch, new-request modal)
              ├── components/primitives.tsx        (Icon, BrandMark, Avatar, StatusTag, SectionHeading, Button)
              └── components/views/
                    ├── OverviewView.tsx
                    ├── AnnouncementsView.tsx
                    ├── RequestsView.tsx
                    ├── EventsView.tsx
                    ├── FacilitiesView.tsx
                    ├── DirectoryView.tsx
                    ├── PollsView.tsx
                    └── VisitorsView.tsx

hooks/useLocalStorage.ts
  └── syncs a piece of React state to localStorage (requests, RSVPs, bookings, poll vote)

lib/societyData.ts
  └── domain types + mock repository data

index.css
  └── Civic Signal design tokens, typography, surfaces, motion, responsive rules
```

Each feature view is a standalone component that only receives the props it needs, so it can be read, tested, or replaced without touching the others. In a production version, `societyData.ts` would be replaced by a repository that calls an API, and `useLocalStorage` would be replaced by data fetched from that API.

## Project structure

```text
client/
  index.html                       # document metadata and app entry point
  src/
    App.tsx                        # route and global providers
    index.css                      # global design system and responsive CSS
    main.tsx                       # React DOM entry point
    lib/societyData.ts             # typed mock domain data
    hooks/useLocalStorage.ts       # localStorage-backed state hook
    pages/Home.tsx                 # app shell: navigation, header, routing, request modal
    components/
      primitives.tsx               # shared display primitives (Icon, Avatar, Button, ...)
      views/                       # one file per feature screen
      ui/                          # reusable shadcn/ui primitives from the scaffold
    contexts/                      # theme context from the scaffold
server/                            # scaffold compatibility server; not modified for the demo
architecture.mmd                   # application flow diagram source
```

## Setup instructions

The repository is managed with `pnpm`.

```bash
pnpm install
pnpm dev
```

Then open the local URL printed by Vite. For a production-style check:

```bash
pnpm check
pnpm build
```

The project does not require an API key or database for the assessment demo.

## Application flow

1. The resident opens the overview and sees the current community pulse.
2. The resident can open the notice board, requests, events, facilities, directory, polls, or visitor pass using the left navigation.
3. Quick actions on the overview move the resident directly into the relevant workflow.
4. Form actions update local React state and show feedback using a toast.
5. Search and filter states are handled in the page component that owns the feature.
6. A future API repository can replace the local data module without changing the visual contract of each view.

## How to explain the code in the interview

**Why React?** React lets the app be decomposed into reusable components and lets the UI update when local state changes. The official React learning material describes components, JSX, lists, events, and `useState` as core concepts for daily React work.[1]

**Why Vite?** Vite supplies the dev server with fast hot updates and a production build command. The app uses Vite’s standard React entry structure.[2]

**Why Tailwind?** Tailwind keeps responsive layout decisions close to the markup and provides state and breakpoint variants. SocietyConnect combines utilities with a small global CSS layer for design tokens and reusable surfaces.[3]

**Why local state and localStorage?** The assessment allows JSON, local storage, or local data. In-memory state keeps most of the demo deterministic and easy to run, while `localStorage` is used for the interactions a resident would expect to survive a refresh (open requests, RSVPs, bookings, the poll vote). The `useLocalStorage` hook is the one seam that would change to call an API in production — nothing else in the views would need to.

**How would production differ?** Authentication would identify a resident; role-based authorization would protect committee and security actions; a backend would validate every request; a database would persist announcements, bookings, votes, and visitors; and notifications would be delivered through a server-side integration.

## Known limitations

The demo does not include production authentication, real role-based permissions, a database, server-side validation, payment tracking, push notifications, file uploads, or a live visitor/security integration. It also uses clearly labeled fictional demo residents and does not present fabricated reviews, ratings, or testimonials.

## Future improvements

The next sensible step would be to add a backend repository with a relational data model for societies, buildings, units, users, roles, announcements, requests, events, bookings, votes, and visitor passes. The UI could then add login, admin and security roles, request timelines, notification preferences, audit logs, and optimistic updates with retry states.

## Git submission checklist

Use multiple descriptive commits rather than one final commit. A simple history could be:

```bash
git add . && git commit -m "chore: scaffold SocietyConnect frontend"
git add . && git commit -m "feat: add civic dashboard shell and navigation"
git add . && git commit -m "feat: add resident workflows and local interactions"
git add . && git commit -m "refactor: split feature screens into their own components"
git add . && git commit -m "feat: persist requests, RSVPs, bookings, and poll vote to localStorage"
git add . && git commit -m "docs: document architecture, setup, and known limitations"
```

Before sharing the repository, confirm that the GitHub repository is accessible to the evaluators, add screenshots, record a short walkthrough video, and include the repository and video links in the submission email. Do not claim backend features that are not present in this demo.

## References

[1]: https://react.dev/learn "React Quick Start"
[2]: https://vite.dev/guide/ "Vite Getting Started Guide"
[3]: https://tailwindcss.com/docs/styling-with-utility-classes "Tailwind CSS: Styling with utility classes"
[4]: https://git-scm.com/book/en/v2 "Pro Git Book"
