import { ApiClient, apiClient } from "@/lib/api-client";

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
  }): Promise<unknown> {
    try {
      await this.apiClient.post("auth/login", {
        email,
        password,
      });
      console.log(`Logging in user: ${email} with password: ${password}`);
      return true;
    } catch (error) {
      console.log("error ", error);
    }
  }

  public register() {
    return true;
  }

  public logout(): void {
    console.log("User logged out");
  }
}

export default AuthenticationService;
