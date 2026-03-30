import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Label,
} from '@venator/ui';

const features = [
  {
    pkg: '@venator/tokens',
    title: 'Design Tokens',
    description:
      'Shared color palettes, spacing scales, and typography values — the single source of truth for the entire design system.',
  },
  {
    pkg: '@venator/ui',
    title: 'UI Components',
    description:
      'Accessible, composable primitives built with Tailwind CSS: buttons, cards, modals, tables, toasts, and more.',
  },
  {
    pkg: '@venator/patterns',
    title: 'Patterns',
    description:
      'Opinionated layout compositions like DashboardLayout and PageHeader for rapidly scaffolding data-driven interfaces.',
  },
] as const;

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-6">
        <Badge variant="default">React · TypeScript · Tailwind CSS</Badge>
        <h1 className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Venator UI
        </h1>
        <p className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
          A React + TypeScript UI infrastructure for building modern web interfaces, data-driven
          tools, and AI-assisted applications.
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Button variant="primary" size="lg">
            <a href="/docs/getting-started/introduction">Get Started</a>
          </Button>
          <Button variant="outline" size="lg">
            <a href="#">GitHub</a>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center mb-10">
            Three focused packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ pkg, title, description }) => (
              <Card key={pkg}>
                <CardHeader>
                  <Badge variant="primary" className="w-fit text-xs font-mono">
                    {pkg}
                  </Badge>
                  <h3 className="mt-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    {title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Component preview */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center mb-10">
            Component preview
          </h2>
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Buttons
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Badges
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="error">Error</Badge>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Alert
                </p>
                <Alert variant="info">
                  <AlertTitle>Heads up</AlertTitle>
                  <AlertDescription>
                    This is an informational alert using the info variant.
                  </AlertDescription>
                </Alert>
              </div>

              <div>
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                  Input
                </p>
                <div className="space-y-1.5">
                  <Label htmlFor="preview-input">Email address</Label>
                  <Input id="preview-input" type="email" placeholder="you@example.com" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-center text-sm text-neutral-400 dark:text-neutral-500">
          Built with Venator UI · MIT License
        </p>
      </footer>
    </div>
  );
}
