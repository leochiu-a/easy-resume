import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseService } from './supabase.service';
import { createClient } from '@supabase/supabase-js';

const supabaseProvider: Provider = {
  provide: 'SUPABASE',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const SUPABASE_URL = configService.get('SUPABASE_URL');
    const SERVICE_KEY = configService.get('SUPABASE_SERVICE_KEY');
    const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

    return supabase;
  },
};

@Module({
  imports: [ConfigModule],
  providers: [supabaseProvider, SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
