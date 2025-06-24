interface ImportMetaEnv {
  VITE_APP_BACKEND_URL: string;
  VITE_APP_API_KEY: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
