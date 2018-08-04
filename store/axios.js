import axios from "axios";

//axios.defaults.timeout = TIMEOUT; //tslint:disable-line

// 禁止缓存
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.get["Content-Type"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
//request to show loading

axios.interceptors.request.use(
  config => {
    //	const { token } = cookies.get("globals") ? cookies.get("globals") : "";
    // if (config.url.indexOf("kyc") > 0) {
    // 	config.baseURL = configs.kycUrl;
    // 	if (token) {
    // 		config.headers.token = token;
    // 	}
    // } else if (config.url.indexOf("google") > 0 && config.url.indexOf("user") > 0) {
    // 	config.baseURL = configs.googleUrl;
    // 	if (token) {
    // 		config.headers.token = token;
    // 	}
    // } else if (config.url.indexOf("user") > 0) {
    // 	config.baseURL = configs.userUrl;
    // 	if (token) {
    // 		config.headers.token = token;
    // 	}
    // } else if (config.url.indexOf("ticket") > 0) {
    // 	config.baseURL = configs.workorder;
    // 	if (token) {
    // 		config.headers.token = token;
    // 	}
    // } else {
    // 	config.baseURL = configs.baseUrl;
    // }
    //	config.baseURL = configs.baseUrl;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//response to hide loading
axios.interceptors.response.use(
  response => {
    return response;
    // const code = response && response.data ? response.data.code : 200;

    // const errorCode =
    // 	(response && response.data && response.data.code && response.data.code != 200) || false;

    // //映射错误消息
    // if (response && response.data && Utils.isObject(response.data) && errorCode && ErrorCode) {
    // 	let message = ErrorCode[code];
    // 	if (code == 452 || code == 224) {
    // 		message = message.replace(/count/, response.data.description);
    // 	}
    // 	response.data.message = message;
    // }

    // if (code === 401) {
    // 	// message.error("登录状态已失效");
    // 	cookies.remove("globals", { path: "/" });
    // 	cookies.remove("isLogin", { path: "/" });
    // 	cookies.remove("username", { path: "/" });
    // 	Router.push(`/${cookies.get("locale")}/login`);
    // } else {
    // 	return response && response.data
    // 		? response.data
    // 		: response && response.status
    // 			? response.status
    // 			: null;
    // }
  },
  error => {
    // let code = error.response ? error.response.status : "";
    // //没有权限，登出，跳转登录
    // if (code === 401) {
    // 	// message.error("登录状态已失效");
    // 	cookies.remove("globals", { path: "/" });
    // 	cookies.remove("isLogin", { path: "/" });
    // 	cookies.remove("username", { path: "/" });
    // 	Router.push(`/${cookies.get("locale")}/login`);
    // }
  }
);

// debug(axios.defaults)
export default axios;
