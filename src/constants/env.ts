export const ENVIRONMENTS = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  STAGING: "staging",
} as const;

export type Environment = (typeof ENVIRONMENTS)[keyof typeof ENVIRONMENTS];

export const CURRENT_ENV: Environment =
  import.meta.env.MODE as Environment;

export const isProd = CURRENT_ENV === ENVIRONMENTS.PRODUCTION;
export const isDev = CURRENT_ENV === ENVIRONMENTS.DEVELOPMENT;
export const isStaging = CURRENT_ENV === ENVIRONMENTS.STAGING;
