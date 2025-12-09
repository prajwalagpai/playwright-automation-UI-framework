export type EnvironmentName = 'test' | 'stg';

const envs = {
  test: {
    baseURL: 'https://www.saucedemo.com',
  },
  stg: {
    baseURL: 'https://www.stgsaucedemo.com', // change if you have a dev URL
  },
};

export function getEnvConfig(env: EnvironmentName){
  return envs[env];
}