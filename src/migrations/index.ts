import * as migration_20260902_135259 from './20260902_135259';
import * as migration_20260904_154854 from './20260904_154854';

export const migrations = [
  {
    up: migration_20260902_135259.up,
    down: migration_20260902_135259.down,
    name: '20260902_135259',
  },
  {
    up: migration_20260904_154854.up,
    down: migration_20260904_154854.down,
    name: '20260904_154854'
  },
];
