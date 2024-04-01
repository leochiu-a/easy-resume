import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { FirebaseService } from './firebase.service';

const firebaseProvider = {
  provide: 'FIREBASE',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const firebaseConfig: FirebaseOptions = {
      projectId: configService.get('FIREBASE_PROJECT_ID'),
      storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
    };

    return initializeApp(firebaseConfig);
  },
};

@Module({
  imports: [ConfigModule],
  providers: [firebaseProvider, FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
