const axios = require('axios');

axios.defaults.headers.common['x-user-id'] = window.localStorage.getItem('user-id');

module.exports = axios;