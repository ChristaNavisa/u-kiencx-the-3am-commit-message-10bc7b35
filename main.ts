import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
// (Never process.cwd(): the grader may invoke us from anywhere.)
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One line: a git commit message an AI coding agent types at 3am after
// a long night of fixing its own bugs. The numbers up front are the
// concrete situation — 47 tests passing, one lying — and the punchline
// is the exhaustion at the end: too tired to find out which. The "fix:"
// prefix is part of the voice: a real commit line, not a caption.
const entry =
  "fix: 47 tests pass, 1 test is lying, and I am too tired to find out which";

// The gate only accepts 1 to 139 characters of UTF-8 text on a single
// line, so refuse loudly instead of ever writing an entry the scorer
// would reject. The entry below is 73 characters, well inside the gate,
// and the guard below keeps it that way if the line is ever reworded.
if (entry.length < 1 || entry.length > 139) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-139 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
