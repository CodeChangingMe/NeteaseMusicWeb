import { axiosInstance } from './config';

// 推荐页
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};

export const getRecommendListRequest = () => {
  return axiosInstance.get('personalized');
};

// 歌手列表页
export const getHotSingerListRequest = (count: number) => {
  return axiosInstance.get(`/top/artists?offset=${count}`);
};

export const getSingerListRequest = (
  category: string,
  alpha: string,
  count: number
) => {
  return axiosInstance.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

// 排行榜
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};

// 歌单
export const getAlbumDetailRequest = (id: number) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};
