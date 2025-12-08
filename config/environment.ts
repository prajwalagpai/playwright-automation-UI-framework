export type EnvironmentName = 'test' | 'dev';

const envs = {
  test: {
    baseURL: 'https://www.saucedemo.com',
  },
  dev: {
    baseURL: 'https://www.devsaucedemo.com', // change if you have a dev URL
  },
};

export function getEnvConfig(env: EnvironmentName){
  return envs[env];
}