export declare module Express {
  export interface Session {
    data: {
      state: string;
      authURL?: string;
      refreshToken?: string;
    };
  }
}
