$originalCode = @"
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: true, autoRefreshToken: true },
});
"@
[System.IO.File]::WriteAllText("$(Get-Location)\src\lib\supabase.ts", $originalCode, [System.Text.Encoding]::UTF8)