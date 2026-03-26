# Venator — React UI Infrastructure

Venator is a React + TypeScript monorepo that provides design tokens, UI components, and structural layouts as reusable packages. It eliminates the recurring setup cost of making the same architectural decisions — token system, component primitives, layout structure — at the start of every project.

## Overview

Venator is built for developers who start multiple projects and need to move fast without re-litigating the same structural choices every time.

It works well alongside generative UI tools like v0 or Lovable. Those tools are good at producing UI — Venator gives that UI somewhere to land: an architecture with consistent tokens, typed components, and layout conventions already in place.

Designed for:

- dashboards and internal tools
- admin panels and data-driven interfaces
- AI-assisted workflows
- any project where you want structure without boilerplate

## Architecture

Venator is a monorepo using npm workspaces. The three packages form a deliberate dependency chain: tokens feed the design system, ui provides the primitives, patterns compose them into deployable layouts.

```
venator/
├── apps/
│   └── docs/              # Next.js documentation and playground
├── packages/
│   ├── tokens/            # Design tokens (colors, spacing, typography)
│   ├── ui/                # Core UI components
│   └── patterns/          # Structural layouts and UI patterns
```

### Packages

**@venator/tokens**

The foundation. Design tokens consumed by every other package and available as a Tailwind preset.

- colors, spacing, typography, radius, shadows, breakpoints
- `venatorPreset` for `tailwind.config.js`

**@venator/ui**

Typed, unstyled-friendly component primitives. Small surface area by design.

- Button, Card, Input, Badge

**@venator/patterns**

Structural layouts — not full pages, not demo screens. These are the architectural abstractions you fill with your own content.

- `DashboardLayout` — sidebar + header shell, responsive (static on desktop, drawer on mobile)
- PageHeader, StatCard, ActivityFeed

## Getting Started

### Requirements

- Node.js >= 18
- npm >= 7

### Install dependencies

```bash
npm install
```

### Development

```bash
# Run docs site (http://localhost:3000)
npm run dev

# Build all packages
npm run build

# Type check all packages
npm run type-check

# Lint all packages
npm run lint

# Clean build artifacts
npm run clean
```

## Example

```tsx
import { Button } from "@venator/ui";
import { DashboardLayout } from "@venator/patterns";

function App() {
  return (
    <DashboardLayout
      sidebar={<Navigation />}
      header={<Header />}
    >
      <Button variant="primary">Click me</Button>
    </DashboardLayout>
  );
}
```

---

## Design Goals

- Tokens, components, and layouts are separate packages with a one-directional dependency chain.
- Each package can be adopted independently.
- All packages are written in TypeScript with strict mode enabled.
- Layouts define structure only — no content, no opinions on what goes inside.
- Compatible with generative UI tools (v0, Lovable) as a structural target for generated components.

---

## License

MIT
