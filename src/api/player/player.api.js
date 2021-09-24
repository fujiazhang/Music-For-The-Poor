import { Http } from '../http';


export class PlayerApi extends Http {

  async getSongPlayUrl(songmids) {
    const res = await this.get(`/song/urls?id=${songmids}`)
    return res
  }

  async getMvList() {
    const res = await this.get(`/mv/list`)
    return res
  }

  async getMv(mvid) {
    const res = await this.get(`/mv/url?id=${mvid}`)
    return res
  }

  async getComments(id) {
    const res = await this.get(`/comment?id=${id}&biztype=5`)
    return res
  }

}
