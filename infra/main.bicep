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
//DO NOT CHANGE F1
  sku: { name: 'F1' }
  properties: { reserved: true }
}

// Web app: the site that runs on the plan above. HTTPS only.
// No alwaysOn (not supported on F1).
resource app 'Microsoft.Web/sites@2023-12-01' = {
  name: 'app-${appName}-${env}'
  location: location
  properties: {
    serverFarmId: plan.id
    httpsOnly: true
  }
}

// Prints the site URL after deploy (this is what gets submitted to Canvas)
output webAppUrl string = 'https://${app.properties.defaultHostName}'
