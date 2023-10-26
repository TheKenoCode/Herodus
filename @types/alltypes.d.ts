import _mongoose from 'mongoose';

declare module 'globalThis' {
  var mongoose: {
    promise: ReturnType<typeof _mongoose.connect> | null;
    conn: typeof _mongoose | null;
  };
}
declare module 'react-hashtag';
declare module 'react-modal-image';
declare global {
  var mongoose: {
    conn: typeof _mongoose | null;
    promise: ReturnType<typeof connect> | null;
  };
}
