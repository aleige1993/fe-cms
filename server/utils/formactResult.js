
var formactResult = {

  success(result = null, reMsg = '成功') {
    return {
      body: result,
      reMsg: reMsg,
      success: true
    }
  },

  error(reMsg = '失败', result = null) {
    // if (result && result.name) {
    //   result = result.name;
    // }
    return {
      body: result,
      reMsg: reMsg,
      success: false
    }
  }
}

module.exports = formactResult;
