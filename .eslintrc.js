module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true
	},
	parserOptions: {
		parser: "babel-eslint"
	},
	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		"plugin:vue/essential"
	],
	// required to lint *.vue files
	plugins: ["vue"],
	// add your custom rules here
	rules: {
		"no-alert": 1, //禁止使用alert confirm prompt
		"no-console": "off", //禁止使用console
		"no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
		"no-var": 1, //禁用var，用let和const代替
		"no-const-assign": 2, //禁止修改const声明的变量
		"no-eval": 1, //禁止使用eval
		"no-eq-null": 2, //禁止对null使用==或!=运算符
		"no-div-regex": 1, //不能使用看起来像除法的正则表达式/=foo/
		"no-else-return": 2, //如果if语句里面有return,后面不能跟else语句
		"no-multi-spaces": 1, //不能用多余的空格no-multi-str
		"no-magic-numbers": [1, { ignoreArrayIndexes: true, ignore: [1, 0, -1] }],
		"no-undef": 1, //不能有未定义的变量
		"no-use-before-define": 2, //未定义前不能使用
		eqeqeq: 2, //必须使用全等
		// semi: [2, "always"], //强制分号结束
		"semi-spacing": [0, { before: false, after: true }], //分号前后空格
		indent: [1, 2], //缩进风格
		"linebreak-style": 0, //["error", "unix"], //换行风格
		// quotes: ["error", "double"], //强制双引号
		"arrow-spacing": 0, //=>的前/后括号
		"arrow-parens": 0, //箭头函数用小括号括起来
		"space-in-parens": [0, "never"], //小括号里面要不要有空格
		"object-curly-spacing": [0, "never"], //大括号内是否允许不必要的空格
		"array-bracket-spacing": [2, "never"], //是否允许非空数组里面有多余的空格
		"comma-spacing": 0, //逗号前后的空格
		"callback-return": 1, //避免多次调用回调什么的
		"consistent-return": 0, //return 后面是否允许省略
		"default-case": 2, //switch语句最后必须有default
		"generator-star-spacing": 0, //生成器函数*的前后空格
		"comma-dangle": [2, "never"], //对象字面量项尾不能有逗号
		"space-before-blocks": [0, "always"] //不以新行开始的块{前面要不要有空格
	}
};
