# SocietyConnect — Community Management Web App

SocietyConnect is a responsive frontend web application for a residential society or community. It focuses on a smaller set of complete, well-explained workflows rather than trying to cover every possible feature a community app could have — the goal is depth and clarity over breadth.

> **Note:** This is a frontend demo. It uses local mock data, React state, and `localStorage` (for requests, RSVPs, bookings, and the poll vote) so every interaction can be tried out and survives a page refresh without a backend. See "Future improvements" below for how this would evolve into a full production system.

## Features

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
| UI quality | Empty/search states, toast feedback, focus states, reduced-motion support |

## Technology stack

- **React 19** with TypeScript for reusable UI components and local state.
- **Vite** for the development server and production build pipeline.
- **Tailwind CSS 4** for responsive utility styling, combined with a small set of project-specific CSS classes.
- **Lucide React** for consistent interface icons.
- **Wouter** for lightweight client-side routing.
- **Sonner** for lightweight action feedback (toasts).

## Architecture

The project uses a simple frontend feature architecture: a single shell owns navigation and routing between views, each feature screen is its own component, and shared UI and data live in their own modules.

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
  └── design tokens, typography, surfaces, motion, responsive rules
```

Each feature view is a standalone component that only receives the props it needs, so it can be read, tested, or replaced independently of the others. In a production version, `societyData.ts` would be replaced by a repository that calls an API, and `useLocalStorage` would be replaced by data fetched from that API — no other view logic would need to change.

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
server/                            # scaffold compatibility server; not modified for this demo
architecture.mmd                   # application flow diagram source
```

## Getting started

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

No API key or database is required to run the project.

## Application flow

1. The resident opens the overview and sees the current community pulse.
2. The resident can open the notice board, requests, events, facilities, directory, polls, or visitor pass using the left navigation.
3. Quick actions on the overview move the resident directly into the relevant workflow.
4. Form actions update local React state and show feedback using a toast.
5. Search and filter states are handled in the page component that owns the feature.
6. A future API repository can replace the local data module without changing the visual contract of each view.

## Design decisions

**Why React?** Components and local state (`useState`) make it straightforward to break the app into independent, reusable pieces that re-render as state changes.

**Why Vite?** Fast dev-server hot reloads and a simple production build pipeline, with React's standard entry structure.

**Why Tailwind?** Keeps responsive layout decisions close to the markup, with state and breakpoint variants, combined with a small global CSS layer for design tokens and shared surfaces.

**Why local state and localStorage?** In-memory state keeps most of the demo deterministic and easy to run, while `localStorage` is used for the interactions a resident would expect to survive a refresh (open requests, RSVPs, bookings, the poll vote). `useLocalStorage` is the single seam that would change to call a real API in production — nothing else in the views would need to.

**How would production differ?** Authentication would identify a resident; role-based authorization would protect committee and security actions; a backend would validate every request; a database would persist announcements, bookings, votes, and visitors; and notifications would be delivered through a server-side integration.

## Known limitations

This demo does not include production authentication, real role-based permissions, a database, server-side validation, payment tracking, push notifications, file uploads, or a live visitor/security integration. Demo residents are clearly fictional, and no fabricated reviews, ratings, or testimonials are presented.

## Future improvements

The next step would be a backend with a relational data model for societies, buildings, units, users, roles, announcements, requests, events, bookings, votes, and visitor passes. On top of that, the UI could add login, admin and security roles, request timelines, notification preferences, audit logs, and optimistic updates with retry states.

## References

- [React Quick Start](https://react.dev/learn)
- [Vite Getting Started Guide](https://vite.dev/guide/)
- [Tailwind CSS: Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Pro Git Book](https://git-scm.com/book/en/v2)
