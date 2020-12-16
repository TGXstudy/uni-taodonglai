// eslint-disable-next-line no-undef
module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ["eslint:recommended", "plugin:vue/essential"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module"
	},
	plugins: ["vue", "prettier"],
	rules: {
		"no-console": "off",
		"generator-star-spacing": "off"
	}
}
