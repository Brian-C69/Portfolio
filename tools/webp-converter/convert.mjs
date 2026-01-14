import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

function printHelp() {
  const text = `
Usage:
  node convert.mjs [paths...] [options]

Paths:
  - File(s) or directory(s). If none provided, defaults to current directory.

Options:
  --out-dir <dir>            Write outputs under this folder (preserves relative paths per input root)
  --name-mode <mode>         simple | preserve-ext (default: simple)
  --quality <1..100>         Lossy WebP quality (default: 82)
  --effort <0..6>            WebP encode effort (default: 4)
  --png-mode <mode>          lossless | near-lossless | lossy (default: lossless)
  --near-lossless <0..100>   Near-lossless level for PNGs (default: 60)
  --concurrency <n>          Parallel encodes (default: 4)
  --overwrite                Overwrite existing .webp
  --keep-mtime               Copy source mtime to output
  --delete-original          Delete source after successful encode
  --dry-run                  Print actions only
  --help                     Show this help
`;
  process.stdout.write(text.trimStart());
  process.stdout.write('\n');
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const options = {
    outDir: null,
    nameMode: 'simple',
    quality: 82,
    effort: 4,
    pngMode: 'lossless',
    nearLossless: 60,
    concurrency: 4,
    overwrite: false,
    keepMtime: false,
    deleteOriginal: false,
    dryRun: false,
    help: false,
    paths: []
  };

  const takeValue = (index) => {
    const value = args[index + 1];
    if (!value || value.startsWith('--')) return null;
    return value;
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('--')) {
      options.paths.push(arg);
      continue;
    }

    if (arg === '--help') {
      options.help = true;
      continue;
    }
    if (arg === '--overwrite') {
      options.overwrite = true;
      continue;
    }
    if (arg === '--keep-mtime') {
      options.keepMtime = true;
      continue;
    }
    if (arg === '--delete-original') {
      options.deleteOriginal = true;
      continue;
    }
    if (arg === '--dry-run') {
      options.dryRun = true;
      continue;
    }

    const value = takeValue(index);
    if (arg === '--out-dir' && value) {
      options.outDir = value;
      index += 1;
      continue;
    }
    if (arg === '--name-mode' && value) {
      options.nameMode = value;
      index += 1;
      continue;
    }
    if (arg === '--quality' && value) {
      options.quality = Number.parseInt(value, 10);
      index += 1;
      continue;
    }
    if (arg === '--effort' && value) {
      options.effort = Number.parseInt(value, 10);
      index += 1;
      continue;
    }
    if (arg === '--png-mode' && value) {
      options.pngMode = value;
      index += 1;
      continue;
    }
    if (arg === '--near-lossless' && value) {
      options.nearLossless = Number.parseInt(value, 10);
      index += 1;
      continue;
    }
    if (arg === '--concurrency' && value) {
      options.concurrency = Number.parseInt(value, 10);
      index += 1;
      continue;
    }

    throw new Error(`Unknown or invalid option: ${arg}`);
  }

  return options;
}

function normalizeOptions(options) {
  if (!['simple', 'preserve-ext'].includes(options.nameMode)) {
    throw new Error('--name-mode must be: simple | preserve-ext');
  }
  if (!Number.isFinite(options.quality) || options.quality < 1 || options.quality > 100) {
    throw new Error('--quality must be 1..100');
  }
  if (!Number.isFinite(options.effort) || options.effort < 0 || options.effort > 6) {
    throw new Error('--effort must be 0..6');
  }
  if (!Number.isFinite(options.nearLossless) || options.nearLossless < 0 || options.nearLossless > 100) {
    throw new Error('--near-lossless must be 0..100');
  }
  if (!Number.isFinite(options.concurrency) || options.concurrency < 1) {
    throw new Error('--concurrency must be >= 1');
  }
  if (!['lossless', 'near-lossless', 'lossy'].includes(options.pngMode)) {
    throw new Error('--png-mode must be: lossless | near-lossless | lossy');
  }
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function* walkDir(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      yield* walkDir(fullPath);
      continue;
    }
    if (!entry.isFile()) continue;
    yield fullPath;
  }
}

function isConvertibleImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function toWebpPath(inputFilePath, nameMode) {
  const parsed = path.parse(inputFilePath);
  const outName = nameMode === 'preserve-ext' ? `${parsed.base}.webp` : `${parsed.name}.webp`;
  return path.join(parsed.dir, outName);
}

function toOutputPath({ inputFilePath, inputRoot, outDir, nameMode }) {
  if (!outDir) return toWebpPath(inputFilePath, nameMode);

  const relative = inputRoot ? path.relative(inputRoot, inputFilePath) : path.basename(inputFilePath);
  const parsed = path.parse(relative);
  const outName = nameMode === 'preserve-ext' ? `${parsed.base}.webp` : `${parsed.name}.webp`;
  return path.join(outDir, parsed.dir, outName);
}

async function ensureDir(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function convertOne({ inputFilePath, outputFilePath, options }) {
  const ext = path.extname(inputFilePath).toLowerCase();
  const isPng = ext === '.png';

  const webpOptions = {
    quality: options.quality,
    effort: options.effort
  };

  if (isPng) {
    if (options.pngMode === 'lossless') {
      webpOptions.lossless = true;
    } else if (options.pngMode === 'near-lossless') {
      webpOptions.nearLossless = true;
      webpOptions.quality = options.nearLossless;
    } else if (options.pngMode === 'lossy') {
      webpOptions.lossless = false;
    }
  }

  if (options.dryRun) {
    return { ok: true, skipped: false, action: 'dry-run' };
  }

  await ensureDir(outputFilePath);
  await sharp(inputFilePath).webp(webpOptions).toFile(outputFilePath);

  if (options.keepMtime) {
    const stat = await fs.stat(inputFilePath);
    await fs.utimes(outputFilePath, stat.atime, stat.mtime);
  }

  if (options.deleteOriginal) {
    await fs.unlink(inputFilePath);
  }

  return { ok: true, skipped: false, action: 'converted' };
}

async function runWithConcurrency(tasks, concurrency) {
  const results = [];
  const pending = new Set();

  for (const task of tasks) {
    const promise = Promise.resolve().then(task);
    results.push(promise);
    pending.add(promise);
    promise.finally(() => pending.delete(promise));

    if (pending.size >= concurrency) {
      await Promise.race(pending);
    }
  }

  return Promise.allSettled(results);
}

async function main() {
  const options = parseArgs(process.argv);
  if (options.help) {
    printHelp();
    return;
  }
  normalizeOptions(options);

  const inputPaths = options.paths.length ? options.paths : ['.'];
  const filesToConvert = [];

  for (const inputPath of inputPaths) {
    const resolved = path.resolve(process.cwd(), inputPath);
    const stat = await fs.stat(resolved);
    if (stat.isDirectory()) {
      for await (const item of walkDir(resolved)) {
        if (isConvertibleImage(item)) filesToConvert.push({ file: item, root: resolved });
      }
      continue;
    }
    if (stat.isFile()) {
      if (isConvertibleImage(resolved)) filesToConvert.push({ file: resolved, root: path.dirname(resolved) });
      continue;
    }
  }

  if (!filesToConvert.length) {
    process.stdout.write('No .png/.jpg/.jpeg files found.\n');
    return;
  }

  const outputsByPath = new Map();
  for (const { file, root } of filesToConvert) {
    const outputFilePath = toOutputPath({
      inputFilePath: file,
      inputRoot: root,
      outDir: options.outDir,
      nameMode: options.nameMode
    });

    const previous = outputsByPath.get(outputFilePath);
    if (previous) {
      if (options.nameMode === 'simple') {
        throw new Error(
          `Output collision: "${previous}" and "${file}" both map to "${outputFilePath}". ` +
            'Use `--name-mode preserve-ext` to avoid collisions.'
        );
      }
    } else {
      outputsByPath.set(outputFilePath, file);
    }
  }

  const tasks = [];
  let skipped = 0;
  let planned = 0;

  for (const { file, root } of filesToConvert) {
    const outputFilePath = toOutputPath({
      inputFilePath: file,
      inputRoot: root,
      outDir: options.outDir,
      nameMode: options.nameMode
    });

    tasks.push(async () => {
      const outputExists = await exists(outputFilePath);
      if (outputExists && !options.overwrite) {
        skipped += 1;
        process.stdout.write(`skip  ${file} -> ${outputFilePath} (exists)\n`);
        return { ok: true, skipped: true, action: 'exists' };
      }

      planned += 1;
      process.stdout.write(`${options.dryRun ? 'plan ' : 'conv '} ${file} -> ${outputFilePath}\n`);
      await convertOne({ inputFilePath: file, outputFilePath, options });
      return { ok: true, skipped: false, action: options.dryRun ? 'planned' : 'converted' };
    });
  }

  const settled = await runWithConcurrency(tasks, options.concurrency);
  const failures = settled.filter((r) => r.status === 'rejected');

  process.stdout.write('\n');
  const actionLabel = options.dryRun ? 'Planned' : 'Converted';
  process.stdout.write(`Total: ${filesToConvert.length}  ${actionLabel}: ${planned}  Skipped: ${skipped}  Failed: ${failures.length}\n`);

  if (failures.length) {
    process.stdout.write('\nFailures:\n');
    for (const failure of failures) {
      process.stdout.write(`- ${failure.reason?.message || String(failure.reason)}\n`);
    }
    process.exitCode = 1;
  }
}

main().catch((error) => {
  process.stderr.write((error && error.stack) ? `${error.stack}\n` : `${String(error)}\n`);
  process.exitCode = 1;
});
