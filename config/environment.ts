export type EnvironmentName = 'test' ;

const envs = {
  test: {
    baseURL: 'https://www.saucedemo.com',
    apiBaseURL : 'https://reqres.in/api'
  },
  stg: {
    baseURL: 'https://www.stgsaucedemo.com', // change if you have a stg URL
    apiBaseURL : 'https://reqres.in/api'
  },
};

export function getEnvConfig(env: EnvironmentName){
  return envs[env];
}