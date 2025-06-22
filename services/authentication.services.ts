import { ApiClient, apiClient } from "@/lib/api-client";
import { AxiosError } from "axios";

class AuthenticationService {
  private static instance: AuthenticationService;
  private apiClient: ApiClient;

  private constructor(client: ApiClient) {
    this.apiClient = client;
  }

  public static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService(apiClient);
    }
    return AuthenticationService.instance;
  }

  public async login({
    password,
    email,
  }: {
    email: string;
    password: string;
  }): Promise<void> {
    try {
      const res = await this.apiClient.post("auth/login", {
        email,
        password,
      });
      // TODO: Handle successful login, e.g., store tokens or user data
      console.log(res.data);
    } catch (error) {
      console.log("authentication.services.ts: Error during login:", error);
      if (error instanceof AxiosError) {
        throw error.response?.data ?? error.message;
      }
      throw error;
    }
  }

  public register() {
    return true;
  }

  public logout(): void {
    console.log("User logged out");
  }

  public resetPassword() {}

  public sendPasswordRecoveryMail() {}

  public refreshAccessToken() {}
}

export default AuthenticationService;
