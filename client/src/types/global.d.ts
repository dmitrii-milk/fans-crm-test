declare global {
  interface Window {
    env: {
      API_URL?: string;
      JWT_TOKEN?: string;
    };
  }
}

export {};
