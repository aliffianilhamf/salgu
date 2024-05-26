import loadConfig from './configuration';

export const DRIVE_CONSTANTS = (() => {
  const loadedConfig = loadConfig();
  return {
    pathLength: loadedConfig.drive.path_length,
    nameLength: loadedConfig.drive.name_length,
    maxFileSize: loadedConfig.drive.max_file_size,
    root: loadedConfig.drive.root,
  };
})();
