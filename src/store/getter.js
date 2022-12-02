const getters = {
    sidebar: state => state.app.sidebar,
    errorLogs: state => state.errorLog.logs,
    imports: state => state.imports    // 存储上面设置的 imports 字段
  }
  export default getters
  