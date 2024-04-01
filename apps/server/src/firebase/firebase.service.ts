import { Inject, Injectable } from '@nestjs/common';
import { FirebaseApp } from 'firebase/app';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

@Injectable()
export class FirebaseService {
  storage: FirebaseStorage;

  constructor(@Inject('FIREBASE') private firebaseApp: FirebaseApp) {
    this.storage = getStorage(firebaseApp);
  }

  async getAvatarUrl(path: string) {
    const avatarRef = ref(this.storage, path);
    return getDownloadURL(avatarRef);
  }

  async uploadAvatar(path: string, file: Express.Multer.File) {
    const avatarRef = ref(this.storage, path);
    const snapshot = await uploadBytes(avatarRef, file.buffer);

    return snapshot.ref.fullPath;
  }
}
