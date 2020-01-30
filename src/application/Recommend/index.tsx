import React, { useEffect } from 'react';
import Slider from '../../components/slider';
import RecommendList from '../../components/list';
import { Map } from 'immutable';
import * as actionTypes from './store/actionCreators';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import Loading from '../../baseUI/loading/index';

function Recommend(props: any) {
  const { bannerList, recommendList, enterLoading } = props;
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <div>
      <Slider bannerList={bannerListJS}></Slider>
      {enterLoading ? (
        <Loading></Loading>
      ) : (
        <RecommendList recommendList={recommendListJS}></RecommendList>
      )}
    </div>
  );
}

// 映射Redux全局的state到组件的Props上
const mapStateToProps = (state: Map<string, any>) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn(['recommend', 'enterLoading'])
});

// 映射dispatch到Props上
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
