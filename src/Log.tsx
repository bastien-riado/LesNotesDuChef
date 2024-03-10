import FileSystem from 'react-native-fs';
import { fileAsyncTransport, logger } from 'react-native-logs';

const log = logger.createLogger({
  transport: fileAsyncTransport,
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
    devNotice: 4,
  },
  transportOptions: {
    FS: FileSystem,
    fileName: 'logs.txt',
    filePath: FileSystem.DocumentDirectoryPath,
    colors: {
      debug: 'white',
      info: 'green',
      warn: 'yellow',
      error: 'red',
      devNotice: 'blue',
    },
  },
});

export default log;
