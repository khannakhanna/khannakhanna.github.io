// Runs after `npm install`.
//
// Astro's compiler ships as a prebuilt native binary. On some older x86-64
// CPUs (for example Intel Celeron J-series, which lack AVX) that binary dies
// with "Illegal instruction" as soon as it is loaded, which takes the whole
// build down. Astro also publishes the same compiler as WebAssembly, and its
// loader falls back to that when no native binary is installed.
//
// This script loads the native binary in a throwaway process. If that process
// crashes, it installs the WebAssembly build and removes the native one. On
// machines where the native binary works (including CI) it changes nothing.

import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const scope = path.join(root, 'node_modules', '@astrojs');
const loaderManifest = path.join(scope, 'compiler-binding', 'package.json');
const wasmName = 'compiler-binding-wasm32-wasi';

if (!existsSync(loaderManifest)) process.exit(0);

const nativeDirs = readdirSync(scope)
  .filter((name) => name.startsWith('compiler-binding-') && name !== wasmName)
  .map((name) => path.join(scope, name));

const crashes = (dir) => {
  const result = spawnSync(process.execPath, ['-e', `require(${JSON.stringify(dir)})`], { stdio: 'ignore' });
  return result.signal !== null;
};

const broken = nativeDirs.filter(crashes);
if (broken.length === 0) process.exit(0);

const { version } = JSON.parse(readFileSync(loaderManifest, 'utf8'));
const spec = `@astrojs/${wasmName}@${version}`;
const work = mkdtempSync(path.join(tmpdir(), 'astro-compiler-'));

try {
  console.log(`[ensure-compiler] Native Astro compiler is not usable on this CPU; installing ${spec}.`);
  execFileSync('npm', ['pack', spec, '--pack-destination', work], {
    stdio: ['ignore', 'ignore', 'inherit'],
    shell: process.platform === 'win32',
  });
  const tarball = readdirSync(work).find((name) => name.endsWith('.tgz'));
  execFileSync('tar', ['-xzf', path.join(work, tarball), '-C', work]);

  const target = path.join(scope, wasmName);
  rmSync(target, { recursive: true, force: true });
  cpSync(path.join(work, 'package'), target, { recursive: true });
  for (const dir of broken) rmSync(dir, { recursive: true, force: true });
  console.log('[ensure-compiler] Done. Builds will use the WebAssembly compiler.');
} catch (error) {
  console.warn(`[ensure-compiler] Could not install ${spec}: ${error.message}`);
  console.warn('[ensure-compiler] `astro build` will fail with "Illegal instruction" until this succeeds.');
} finally {
  rmSync(work, { recursive: true, force: true });
}
