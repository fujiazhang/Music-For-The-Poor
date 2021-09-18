import { Http } from '../http';


export class HomeApi extends Http {

  // 按分类推荐歌单
  async getRecommendList() {
    const res = await this.get('/recommend/playlist')
    return res
  }

  // 根据分类获取歌单
  async getNewSong() {
    const res = await this.get('/songlist/list?sort=2')
    return res
  }

  // 获取歌单详情
  async getSongList(id) {
    const res = await this.get(`/songlist?id=${id}`)
    return res
  }


  async getHotWordsSearch(key) {
    const res = await this.get(`/search?key=${key}`)
    return res
  }

  async getHotWords() {
    const res = await this.get('/search/hot')
    return res
  }

}
