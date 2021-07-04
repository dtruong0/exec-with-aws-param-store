
const awsParamStore = require('aws-param-store');
const { config } = require('./config')

const paramStoreConfig = { region: config.region }

async function loadParams() {
  const parmStorePath = `/${config.application}/${config.env}/env/`

  console.log(config.region)
  try {
    const params = await awsParamStore.getParametersByPath(parmStorePath, paramStoreConfig)
    const reducer = (acc, val) => {
      const name = val.Name.split('/').pop()
      acc[name] = val.Value
      return acc
    }
    const data = params.reduce(reducer, {})
    return [data, null]
  } catch (err) {
    console.error('Failed to load from param store', err)
    return [null, err]
  }
}


module.exports = {
  loadParams
}