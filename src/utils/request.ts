import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const API_HOST =
    process.env.NODE_ENV === "development"
        ? window.location.origin + "/api"
        : window.location.origin;

const service: AxiosInstance = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: API_HOST,
    // 超时
    timeout: 10000,
});

type reqHeaderOtherConfigDto = {
    requestContentType: string;
    isHaveToken: boolean;
};

let reqHeaderOtherConfig: reqHeaderOtherConfigDto = {
    requestContentType: "",
    isHaveToken: false,
};

// request拦截器
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 让每个请求携带自定义token
        if (config.headers) {
            reqHeaderOtherConfig.isHaveToken &&
                (config.headers.Authorization =
                    localStorage.getItem("WORKSYSTEMTOKEN") || "");
            config.headers["Content-Type"] =
                reqHeaderOtherConfig.requestContentType;
        }

        // 请求映射params参数
        if (config.params) {
            let url = config.url + "?" + tansParams(config.params);
            url = url.slice(0, -1);
            config.params = {};
            config.url = url;
        }
        return config;
    },
    (error) => {
        console.log(error);
        Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (res: AxiosResponse) => {
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200;

        // 二进制数据则直接返回
        if (
            res.request.responseType === "blob" ||
            res.request.responseType === "arraybuffer"
        ) {
            return res;
        }
        if (code === 200) {
            return Promise.resolve(res);
        } else {
            return Promise.reject(res);
        }
    },
    (error) => {
        const { response } = error;
        return Promise.reject(response);
    }
);

/**
 * @description: HTTP内容类型
 */
const contentTypes: { [name: string]: any } = {
    form: "application/x-www-form-urlencoded; charset=utf-8",
    json: "application/json; charset=utf-8",
};

const reqTypes: Array<string> = ["POST", "GET", "DELETE", "PUT"];

function setContentType(type: string) {
    return Object.keys(contentTypes).includes(type)
        ? contentTypes[type]
        : contentTypes.form;
}

interface dataConfig {
    [name: string]: any;
}

type optionsDto = {
    reqUrl: string; // 请求地址
    data: dataConfig; // 请求数据
    contentType?: string; // HTTP内容类型; 默认json
    type?: string; // 请求方式; 默认POST
    isHaveToken?: boolean; // 是否需要在请求头加token; 默认加token(true)
};

/**
 * @description: 封装请求
 * @param { optionsDto } options
 * reqUrl : 请求地址 |
 * data : 请求数据 |
 * contentType : HTTP内容类型 |
 * type : 请求方式 |
 * isHaveToken: 是否需要在请求头加token |
 * @returns axios
 */
export function fetchEndpoint(options: optionsDto) {
    const {
        reqUrl,
        data,
        contentType = "json",
        type = "POST",
        isHaveToken = true,
    } = options;

    let urlArr = reqUrl.split("/:");
    let url = `${urlArr[0]}${urlArr.length > 1 ? "/" + data[urlArr[1]] : ""}`;

    reqHeaderOtherConfig.isHaveToken = isHaveToken;
    reqHeaderOtherConfig.requestContentType = setContentType(
        contentType.toLowerCase()
    );

    let reqData = {
        method: reqTypes.includes(type.toUpperCase())
            ? type.toUpperCase()
            : "POST",
        url,
        data: urlArr.length > 1 ? {} : contentType ? data : {},
        params: urlArr.length > 1 ? {} : contentType ? {} : data,
    };
    return service({
        ...reqData,
    });
}
/**
 * @description 参数处理
 * @param {*} params  参数
 */
export function tansParams(params: any): string {
    let result = "";
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
            if (typeof value === "object") {
                for (const key of Object.keys(value)) {
                    if (
                        value[key] !== null &&
                        typeof value[key] !== "undefined"
                    ) {
                        let params = propName + "[" + key + "]";
                        var subPart = encodeURIComponent(params) + "=";
                        result +=
                            subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result;
}

export function downloadFile(url: string, params: object, filename: string) {
    service(url, params)
        .then((res) => {
            const { data } = res.data;
            let name = filename ? filename : new Date().getTime().toString();
            download(data, name);
        })
        .catch((res) => {
            console.log(res);
        });
}

function download(content: any, fileName: string) {
    let blob = new Blob([content]);
    let url = window.URL.createObjectURL(blob);
    let dom = document.createElement("a");
    dom.style.display = "none";
    dom.href = url;
    dom.setAttribute("download", fileName);
    document.body.appendChild(dom);
    dom.click();
}
