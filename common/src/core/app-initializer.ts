import { luigiClient } from './luigi';
import { BackendModules } from '../services/global/global.types';

interface InitializerReturnType {
  currentNamespace: string;
  backendModules: BackendModules[];
}

class AppInitializer {
  private token: string | null = '';

  init() {
    return new Promise<InitializerReturnType>((resolve, _) => {
      const timeout = setTimeout(resolve, 1000);

      luigiClient.addInitListener((e: any) => {
        this.token = e.idToken;

        clearTimeout(timeout);
        resolve({
          currentNamespace: e.namespaceId,
          backendModules: e.backendModules,
          ...e,
        });
      });
    });
  }

  getBearerToken(): string | null {
    if (!this.token) {
      return null;
    }
    return `Bearer ${this.token}`;
  }
}

export const appInitializer = new AppInitializer();
