import { Http } from '../http';


export class PlayerApi extends Http {

  async getSongPlayUrl(songmids) {
    const res = await this.get(`/song/urls?id=${songmids}`)
    return res
  }


}
