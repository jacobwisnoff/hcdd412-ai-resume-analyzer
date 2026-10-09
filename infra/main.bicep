// Inputs supplied at deploy time
param appName string

@allowed(['dev', 'staging', 'prod'])
param env string = 'dev'

param location string = resourceGroup().location

// App Service plan: the Linux server the web app runs on.
// F1 = free tier ($0). Attempting to use free tier. 
resource plan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: 'plan-${appName}-${env}'
  location: location
  kind: 'linux'
  sku: { name: 'F1' }
  properties: { reserved: true }
}