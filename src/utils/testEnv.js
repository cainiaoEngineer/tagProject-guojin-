const { noGateWay } = window
const baseUrl = noGateWay
  ? `${noGateWay.protocol}://${noGateWay.ip}:${noGateWay.port}/${noGateWay.ajaxPrefix}`
  : `` //根据需要填写本地的代理前缀例如：'testApi'
export default baseUrl
