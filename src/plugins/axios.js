import Vue from 'vue';
import axios from 'axios';
import router from '../router';
import { Toast, Dialog } from 'vant';


//nodejs暴露给执行脚本的系统环境变量
var isDev = process.env.NODE_ENV === 'development';

let redirectTo = null;

var ajax = axios.create({
    baseURL:'https://api-hw.fjdaze.com',
    timeout:0 //请求超时时间
})


//请求拦截(在请求事前进行一些配置)
ajax.interceptors.request.use(config => {
    //判断接口有'/tool/c/'统一加上参数用户id
    if (config.url.indexOf('/tool/c/') !== -1) {
        let obj = JSON.parse(config.data)
        if (!obj.userId) {
            Object.assign(obj, {
                userId: localStorage.getItem('visitCId')
            })
            config.data = JSON.stringify(obj);
        }
    }

    let token = localStorage.getItem('xcToken');
    if (isDev) {
        localStorage.setItem("xcToken", token);
    }
    if (token && token != 'null') {
        var commonObj = {
            token: token,
        }
        Object.assign(config.headers, commonObj);

    } else {
        return config;
    }

    if (config.loading) {
        Toast.loading({
            duration: 0,
            icon: "https://oss.fjdaze.com/toolsApp/common/skeletonLoading.gif",
            className: "user-loading"
        });
    }
    return config;
})
//响应了拦截器（在响应之后对数据进行一些处理）
ajax.interceptors.response.use(function (res) {
    console.log(res);
    //请求成功200
    if(res.status == 200){
        if(res.data.Success) {
            return Promise.resolve(res.data);
        }
        if(res.data.code == 200) {
            //请求成功关闭提示
            if(res.config.loading) {
                Toast.clear();
            }
            return Promise.resolve(res.data);
        }
        //未登录，需要重新登录
        else if(res.data.code == 4000 || res.data.code == 9001){
            //重新登录清除token
            localStorage.removeItem('xcToken');
            router.push({
                path: '/login'
            });
            return Promise.reject(res.data.msg);
        }
        //黑名单
        else if(res.data.code == 8000){

            Toast.clear();
            if (redirectTo) {
                return Promise.reject(res.data.msg);
            }
            redirectTo = setTimeout(() => {
                redirectTo = null;
            }, 1000);
            router.push({
                path: '/blackPage',
                query:{title:'黑名单'}
            });
            return Promise.reject(res.data.msg);
        } else {
            Toast.clear();
            return Promise.reject(res.data.msg);
        }
    }

}, function (error){
    console.log(error);
    return Promise.reject(error)
});

Vue.prototype.$ajax = ajax;