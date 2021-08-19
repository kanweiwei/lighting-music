import Axios from 'axios';

const http = Axios.create({
    withCredentials: false
});

const BASE_URL = 'https://qcz1as.app.cloudendpoint.cn';


http.interceptors.request.use(config => {
    if (config.url.startsWith('/')) {
        config.url = BASE_URL + config.url;
    }
   
    return config;
})

http.interceptors.response.use(response => {
    // console.log(response);
    if(response.status === 200){
        return response.data
    }
    return response;
})

export default http;