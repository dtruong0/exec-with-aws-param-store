const config = {
  region: process.env.AWS_REGION || 'ap-southeast-2',
  application: process.env.APPLICATION || 'test-app',
  env: process.env.ENV || 'dev'
}

module.exports = {
  config
}