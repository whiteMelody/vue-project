import Vue from "vue";
import axios from 'axios'
import QS from 'qs';
import {
    Toast
} from 'vant';
Vue.use(Toast);


//axios:请求拦截器
axios.interceptors.request.use(function (config) {
    return config;
});


// http 响应response 拦截器
axios.interceptors.response.use(response => {
    switch (response.data.status) {
        case 0:
            return response;
            break;
        default:
            return response;
            break;
    }
}, error => {
    switch (error.response.status) {
        case 404:
            Toast({
                message: '网络请求不存在',
                duration: 1500,
                forbidClick: true
            });
            break;
        case 401:
            Toast({
                message: '登录失效,请重新登录',
                duration: 1500,
                forbidClick: true,
                onClose:function () {
                    localStorage.removeItem("getToken");
                    window.location.href = '/Login'
                }
            });
            break;
        case 419:
            Toast({
                message: '登录失效,请重新登录',
                duration: 1500,
                forbidClick: true,
                onClose:function () {
                    localStorage.removeItem("getToken");
                    window.location.href = '/Login'
                }
            });
            break;
        default:
            return response;
            break;
    }

    return response;
});


export function getRequest(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function postRequest(url, params = {}) {
    let getTokenLocal = localStorage.getItem("getToken");
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + getTokenLocal
                }
            })
            .then(response => {
                resolve(response.data);

            }, err => {
                reject(err)
            })
    })
}

export default axios