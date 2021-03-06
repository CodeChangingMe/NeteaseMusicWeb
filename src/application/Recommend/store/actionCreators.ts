import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import {
  getBannerRequest,
  getRecommendListRequest
} from '../../../api/request';

export const changeBannerList = (data: any) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
});

export const changeRecommendList = (data: any) => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
});

export const changeEnterLoading = (data: any) => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const getBannerList = () => {
  return (dispatch: any) => {
    getBannerRequest()
      .then((data: any) => {
        dispatch(changeBannerList(data.banners));
      })
      .catch(() => {
        console.log('轮播图数据传输错误');
      });
  };
};

export const getRecommendList = () => {
  return (dispatch: any) => {
    getRecommendListRequest()
      .then((data: any) => {
        dispatch(changeRecommendList(data.result));
        dispatch(changeEnterLoading(false));
      })
      .catch(() => {
        console.log('推荐歌单数据传输错误');
      });
  };
};
