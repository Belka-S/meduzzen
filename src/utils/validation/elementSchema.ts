import * as Yup from 'yup';

// message
const message = Yup.string().min(1, 'is too short').required('is required');

// file
const MAX_SIZE = 1024 * 1024;
const MB = 1024 * 1024; // const kB = 1024;

const files = Yup.mixed<FileList>().test(
  'size',
  `You need to provide a file, max size: ${MAX_SIZE / MB}MB`,
  async files => {
    if (files) return true;
    // if (files) return files[0].size <= MAX_SIZE;
    return false;
  },
);

export const messageSchema = Yup.object().shape({ message, files });
