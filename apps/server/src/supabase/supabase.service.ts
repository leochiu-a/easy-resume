import { Head, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private bucket: string;

  constructor(
    @Inject('SUPABASE') private readonly supabase: SupabaseClient,
    private configService: ConfigService,
  ) {
    const bucket = this.configService.get('SUPABASE_AVATAR_BUCKET');
    if (!bucket) {
      throw new Error('SUPABASE_AVATAR_BUCKET is not defined');
    }
    this.bucket = bucket;
  }

  /**
   * 確認檔案是否存在，但是 supabase 不支援直接檢查檔案是否存在，所以透過 HEAD request 來檢查
   * 相關 issue https://github.com/supabase/storage/issues/266
   */
  async checkFileExists(path: string) {
    const supabaseUrl = this.configService.get('SUPABASE_URL');
    const secretKey = this.configService.get('SUPABASE_SERVICE_KEY');
    if (!secretKey || !supabaseUrl) {
      console.log('secretKey', secretKey, 'supabaseUrl', supabaseUrl);
      throw new Error('SUPABASE_URL or SUPABASE_SERVICE_KEY is not defined');
    }

    const response = await fetch(
      `${supabaseUrl}/storage/v1/object/${this.bucket}/${path}`,
      {
        method: 'HEAD',
        headers: {
          authorization: secretKey,
        },
      },
    );

    return response.status === 200;
  }

  /**
   * 取得 avatar 的 signed url，會在 15 分鐘後過期
   */
  async retrieveAvatar(path: string) {
    const exists = await this.checkFileExists(path);

    if (exists) {
      const expiredIn15Minutes = 15 * 60;
      const { data, error } = await this.supabase.storage
        .from(this.bucket)
        .createSignedUrl(path, expiredIn15Minutes);

      if (error) {
        throw error;
      }

      return data.signedUrl;
    }

    return '';
  }

  async uploadAvatar(path: string, file: Express.Multer.File) {
    const { data, error } = await this.supabase.storage
      .from(this.bucket)
      .upload(path, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw error;
    }

    return data?.path;
  }
}
