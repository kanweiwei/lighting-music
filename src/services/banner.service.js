import http from "@/utils/http";
import { stringify } from "query-string";

export default class BannerService {
    /**
     * @description 获取 banner 轮播图
     * type 0 pc, 1 android, 2 iphone, 3 ipad
     * 
     */
    static get(data){
        return http.get('/banner?'+ stringify(data))
    }
}
