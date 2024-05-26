import * as nodePath from 'path';

export function stripTrailingSlashes(p: string) {
  return p.replace(/\/+$/, '');
}

export function getParentPath(p: string) {
  return nodePath.posix.normalize(nodePath.posix.join(p, '../'));
}
