import * as process from 'process'
import LuigiClient from './luigi-client'

class Initialize {
  luigi: any;

  token: string = "";
  currentEnvironmentId: string = "";

  constructor(luigiClient: any) {
      this.luigi = LuigiClient;
  }

  init() {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, 1000);
      this.luigi.addInitListener((e: any) => {
        this.currentEnvironmentId = e.environmentId;
        this.token = e.idToken;
        clearTimeout(timeout);
        resolve();
      });
    });
  }

  getBearerToken() {
    if (!this.token) {
      return null;
    }
    return `Bearer ${this.token}`;
  }

  getCurrentEnvironmentId() {
    return this.currentEnvironmentId;
  }
}

export default new Initialize(LuigiClient);
