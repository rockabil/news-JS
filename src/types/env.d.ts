declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_URL?: string;
    readonly API_KEY?: string;
    readonly NODE_ENV?: 'development' | 'production';
  }
}

declare const process: {
  readonly env: NodeJS.ProcessEnv;
};