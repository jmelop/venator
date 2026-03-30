import { Alert, AlertTitle, AlertDescription, Card, CardContent, CodeBlock } from '@venator/ui';
import { PageHeader } from '@venator/patterns';

const installCode = `# Install the packages
npm install @venator/ui @venator/patterns @venator/tokens`;

const usageCode = `import { Button, Card, CardContent } from '@venator/ui';

export function Example() {
  return (
    <Card>
      <CardContent>
        <Button variant="primary">Get started</Button>
      </CardContent>
    </Card>
  );
}`;

export default function IntroductionPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <PageHeader
        title="Introduction"
        description="Venator is a React + TypeScript UI infrastructure for building modern web interfaces, data-driven tools and AI-assisted applications."
      />

      <Alert variant="info">
        <AlertTitle>Early development</AlertTitle>
        <AlertDescription>
          Venator is under active development. APIs may change between releases.
        </AlertDescription>
      </Alert>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          What is Venator?
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Venator provides a set of composable, accessible, and fully typed UI primitives built on
          Tailwind CSS. It is organized into three packages: <strong>@venator/tokens</strong> for
          design tokens, <strong>@venator/ui</strong> for base components, and{' '}
          <strong>@venator/patterns</strong> for higher-level layout compositions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Installation
        </h2>
        <CodeBlock code={installCode} language="bash" filename="Terminal" />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          Quick start
        </h2>
        <CodeBlock code={usageCode} language="tsx" filename="Example.tsx" />
      </section>

      <Card>
        <CardContent className="pt-6">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Browse the <strong>Components</strong> section in the sidebar to explore all available
            primitives, or jump to <strong>Patterns</strong> to see full layout compositions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
