import { join } from 'node:path';
import { expect } from 'vitest';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  /**
   * __image_snapshost__ is default folder name
   * Use explicit directory configuration to allow
   * storing snapshots from any nested test file
   */
  customSnapshotsDir: join(__dirname, 'src', '__image_snapshots__'),
});

expect.extend({ toMatchImageSnapshot });
