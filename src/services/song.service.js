import http from "@/utils/http";

export default class SongService {
  static getUrl(id) {
    return http.get("//song/url?id=" + id);
  }
}
