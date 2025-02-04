export interface Config {
  enabled: boolean;
  route: string;
  match: string;
}

const DEFAULT_CONFIG: Config = {
  enabled: true,
  route: "stories",
  match: "**/*.stories.tsx",
};

let config: Config;

export const setConfig = (options?: Partial<Config>): Config => {
  config = {
    ...DEFAULT_CONFIG,
    ...options,
  };
  return config;
};

export const getConfig = (): Config => {
  return config;
};
