export const environment = {
  production: false,

  //tankiqApiBaseUrl: 'http://localhost:8080/api/v1',

  tankiqApiBaseUrl: 'https://hydroteam-backend.onrender.com/api/v1',

  monitoringApiBaseUrl: 'https://hydroteam-backend.onrender.com/api/v1',
  //databaseProviderApiBaseUrl: 'http://localhost:8080/api/v1',
databaseProviderApiBaseUrl: 'https://hydroteam-backend.onrender.com/api/v1',

  databaseProviderUsersEndpointPath: '/users',
  databaseProviderBuildingsEndpointPath: '/buildings',
  databaseProviderUserBuildingsEndpointPath: '/user_buildings',
  databaseProviderCisternsEndpointPath: '/cisterns',
  databaseProviderSensorsEndpointPath: '/sensors',
  databaseProviderWaterLevelReadingsEndpointPath: '/water_level_readings',
  databaseProviderRefillsEndpointPath: '/refills',
  databaseProviderWaterConsumptionsEndpointPath: '/water_consumptions',
  databaseProviderAlertsEndpointPath: '/alerts',
  databaseProviderReportsEndpointPath: '/reports',
  databaseProviderPlansEndpointPath: '/plans',
  databaseProviderSubscriptionsEndpointPath: '/subscriptions',
};
