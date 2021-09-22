import { HomeApi } from "./home";
import { PlayerApi } from './player'



const isSuccess = (res) => {
  return res && res.code === 1;
};

export const Api = {
  isSuccess: isSuccess,
  HomeApi: new HomeApi(),
  PlayerApi: new PlayerApi(),
};
