import { HomeApi } from "./home";



const isSuccess = (res) => {
  return res && res.code === 1;
};

export const Api = {
  isSuccess: isSuccess,
  HomeApi: new HomeApi(),
};
