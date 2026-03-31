import pc from 'picocolors';

const KNOWN_PATTERNS = [
  'DashboardLayout',
  'PageHeader',
  'ModuleGrid',
] as const;
type Pattern = (typeof KNOWN_PATTERNS)[number];

function isKnownPattern(name: string): name is Pattern {
  return (KNOWN_PATTERNS as readonly string[]).includes(name);
}

export async function addCommand(pattern: string): Promise<void> {
  if (!isKnownPattern(pattern)) {
    console.error(
      pc.red(
        `Unknown pattern "${pattern}". Known patterns: ${KNOWN_PATTERNS.join(', ')}`,
      ),
    );
    process.exit(1);
  }

  console.log(pc.yellow(`venator add ${pattern} — coming soon`));
  console.log(
    pc.yellow(
      `The "${pattern}" pattern installation is not yet implemented. Check back in a future release.`,
    ),
  );
}
