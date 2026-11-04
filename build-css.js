const fs = require('fs');
const path = require('path');
const { Scanner } = require('@tailwindcss/oxide');
const { compile } = require('@tailwindcss/node');

async function buildCSS() {
  const root = process.cwd();
  const scanner = new Scanner({
    sources: [
      { base: path.join(root, 'app'), pattern: '**/*.{js,jsx}', negated: false },
      { base: path.join(root, 'components'), pattern: '**/*.{js,jsx}', negated: false },
      { base: path.join(root, 'data'), pattern: '**/*.{js,jsx}', negated: false },
    ]
  });

  const candidates = scanner.scan();
  console.log('Scanned candidates count:', candidates.length);

  const rawCss = `
@import "tailwindcss";

:root {
  --background: #FDFBF7;
  --foreground: #1E1B4B;
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: 'Plus Jakarta Sans', 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

@keyframes floatSlow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: floatSlow 5s ease-in-out infinite;
}
`;

  const compiler = await compile(rawCss, {
    base: root,
    onDependency: () => {}
  });

  const compiled = compiler.build(candidates);
  fs.writeFileSync(path.join(root, 'app', 'globals.css'), compiled, 'utf8');
  console.log('Successfully written app/globals.css! Size:', compiled.length, 'bytes');
}

buildCSS().catch(err => {
  console.error('Build CSS failed:', err);
  process.exit(1);
});

