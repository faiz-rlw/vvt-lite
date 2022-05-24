import { fetchEndpoint } from "~/utils/request";

/**
 *
 * reqUrl : 请求地址
 * data : 请求数据
 * contentType : HTTP内容类型; 默认json类型('json'|'form')
 * type : 请求方式 ; 默认POST('POST'|'GET')
 * isHaveToken: 是否需要在请求头加token
 */
export default {
    login: (data: object) =>
        fetchEndpoint({
            reqUrl: "/login",
            data,
            type: "POST",
            contentType: "json",
            isHaveToken: false,
        }),
};
