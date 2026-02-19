# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`music12` is a TypeScript library for music theory calculations, providing object-oriented APIs for notes, intervals, chords, and scales. The core design philosophy is to represent abstract music theory concepts as objects that can be manipulated programmatically.

## Commands

```bash
# Build the library (outputs to dist/)
pnpm build

# Run development server (Vite with web_test/)
pnpm dev

# Run tests
pnpm vitest

# Run a single test file
pnpm vitest test/common.test.ts
```

## Architecture

The library is organized into domain modules under `src/`:

| Module | Purpose |
|--------|---------|
| `note/` | `Note` class - pitch, MIDI values, enharmonic equivalents |
| `interval/` | `Interval` class - distance between notes |
| `chord/` | `Chord` class - root + intervals, transformations (b9, #11, etc.) |
| `scale/` | `Scale` class - modes, diatonic chords, degree notes |
| `factory/` | Convenience functions: `getNote()`, `getChord()`, `getScale()`, `getInterval()` |
| `find/` | Reverse lookup: find chords/scales from note lists |
| `circleOfFifths/` | Circle of fifths calculations |
| `stave/` | Staff/key signature utilities |
| `common/radix/` | Base-7 and Base-12 radix math for music calculations |

### Key Patterns

- **Classes with class methods**: Each domain has a main class (e.g., `NoteClass.ts`, `ChordClass.ts`, `ScaleClass.ts`) with helper functions in `cls/classFn/` directories
- **Type definitions**: Each module has `static/types.ts` defining its TypeScript types
- **Presets/Meta**: Static data like chord types (`chordKeys.ts`), scale modes (`scaleModeNames.ts`) in `presets/` and `static/` directories
- **Factory pattern**: Use `factory.getNote('C', 0, 4)` instead of `new Note('C', 0, 4)` for convenience

### Entry Points

- `src/index.ts` - Main library export
- `dist/index.js` - Built output (ESM)
- `web_test/` - Vite-based development playground with React
