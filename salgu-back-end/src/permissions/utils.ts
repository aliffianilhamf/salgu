import AppError from 'src/errors/app-error';
import { Subject } from './types';

export const getSubjectAndId = (
  dirId?: string,
  fileId?: string,
): [Subject, number] => {
  if (dirId) return ['dir', +dirId];
  if (fileId) return ['file', +fileId];

  throw new AppError("Can't determine subject and ID from path", 400);
};
