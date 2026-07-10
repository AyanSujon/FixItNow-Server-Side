import { ILoginUser } from "./auth.interface";
export declare const authService: {
    loginUser: (payload: ILoginUser) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken: (refreshToken: string) => Promise<{
        accessToken: string;
    }>;
};
//# sourceMappingURL=auth.service.d.ts.map