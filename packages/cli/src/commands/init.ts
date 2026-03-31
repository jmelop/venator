import pc from 'picocolors';

const SUPPORTED_ARCHETYPES = ['dashboard'] as const;
type Archetype = (typeof SUPPORTED_ARCHETYPES)[number];

function isSupportedArchetype(name: string): name is Archetype {
  return (SUPPORTED_ARCHETYPES as readonly string[]).includes(name);
}

export async function initCommand(archetype: string): Promise<void> {
  if (!isSupportedArchetype(archetype)) {
    console.error(
      pc.red(
        `Unknown archetype "${archetype}". Supported archetypes: ${SUPPORTED_ARCHETYPES.join(', ')}`,
      ),
    );
    process.exit(1);
  }

  console.log(pc.yellow(`venator init ${archetype} — coming soon`));
  console.log(
    pc.yellow(
      `The "${archetype}" archetype deployment is not yet implemented. Check back in a future release.`,
    ),
  );
}
