function responseData(code, desc, data) {
  const response = {
    error_code: code,
    error_desc: desc,
    data: data ?? [],
  };
  return response;
}

module.exports = {
  responseData,
};
