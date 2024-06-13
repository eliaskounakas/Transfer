interface ImportMetaEnv {
    readonly SUPABASE_URL: string
    readonly SUPABASE_ANON_KEY: string
    readonly SUPABASE_FILE_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}