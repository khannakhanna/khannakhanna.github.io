import { existsSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL and BASE_PATH are supplied at deploy time, so the same code works
// on a custom domain (BASE_PATH unset) and on a GitHub project page
// (BASE_PATH=/repo-name). Internal links go through src/lib/url.ts.
const site = process.env.SITE_URL || 'https://example.com';
const base = process.env.BASE_PATH || '/';

// Without SITE_URL a deploy would succeed with example.com in every canonical
// URL, the sitemap and the share image. Stop it in CI instead.
if (process.env.CI && !process.env.SITE_URL) {
  throw new Error(
    'SITE_URL is not set. Add it under Settings > Secrets and variables > Actions > Variables ' +
      '(for example https://<username>.github.io), then re-run the workflow.',
  );
}

// The sitemap is written after the pages, so each built page can be read back:
// anything marked noindex (the Work and Writing lists while they are empty)
// is left out of the sitemap too.
const outDir = new URL('./dist/', import.meta.url);
const rootPath = new URL(base.replace(/\/?$/, '/'), site).pathname;
const isIndexable = (pageUrl) => {
  const relative = new URL(pageUrl).pathname.slice(rootPath.length);
  const file = new URL(`${relative}index.html`, outDir);
  return !(existsSync(file) && /<meta name="robots" content="noindex/.test(readFileSync(file, 'utf8')));
};

export default defineConfig({
  site,
  base,
  // Astro 7 defaults to JSX-style whitespace collapsing; keep HTML semantics.
  compressHTML: true,
  integrations: [sitemap({ filter: isIndexable })],
});
