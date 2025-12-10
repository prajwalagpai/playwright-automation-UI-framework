export type EnvironmentName = 'test' ;

const envs = {
  test: {
    baseURL: 'https://www.saucedemo.com',
  },
  stg: {
    baseURL: 'https://www.stgsaucedemo.com', // change if you have a stg URL
  },
};

export function getEnvConfig(env: EnvironmentName){
  return envs[env];
}