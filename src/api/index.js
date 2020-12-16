import importAllModule from "../common/js/importAllModule"

// eslint-disable-next-line no-undef
const api = importAllModule(require.context("api", true, /\.api.js$/), /\.api.js$/g)

export default api
