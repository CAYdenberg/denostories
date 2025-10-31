export interface Config {
  enabled: boolean;
  route: string;
  match: string;
  runHeadlessChecks: boolean;
  exitBuildOnFailedCheck: boolean;
}

const DEFAULT_CONFIG: Config = {
  enabled: true,
  route: "stories",
  match: "**/*.stories.tsx",
  runHeadlessChecks: true,
  exitBuildOnFailedCheck: true,
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
