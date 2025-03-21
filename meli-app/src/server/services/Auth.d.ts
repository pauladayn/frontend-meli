export declare function setTokens(newAccess: string, newRefresh: string): void;
export declare function getAccessToken(): string;
export declare function getRefreshToken(): string;
export declare function refreshTokens(): Promise<void>;
