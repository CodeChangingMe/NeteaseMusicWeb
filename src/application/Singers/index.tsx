import React, { useState, useEffect } from 'react';
import Horizen from '../../baseUI/horizen-item';
import { NavContainer, ListContainer, List, ListItem } from './style';
import Scroll from '../../baseUI/scroll';
import { Map } from 'immutable';
import {
  getHotSingerList,
  changePageCount,
  changeEnterLoading,
  getSingerList,
  changePullUpLoading,
  refreshMoreHotSingerList,
  refreshMoreSingerList,
  changePullDownLoading
} from './store/actionCreators';
import { connect } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/loading';

// 歌手种类
export const categoryTypes = [
  {
    name: '华语男',
    key: '1001'
  },
  {
    name: '华语女',
    key: '1002'
  },
  {
    name: '华语组合',
    key: '1003'
  },
  {
    name: '欧美男',
    key: '2001'
  },
  {
    name: '欧美女',
    key: '2002'
  },
  {
    name: '欧美组合',
    key: '2003'
  },
  {
    name: '日本男',
    key: '6001'
  },
  {
    name: '日本女',
    key: '6002'
  },
  {
    name: '日本组合',
    key: '6003'
  },
  {
    name: '韩国男',
    key: '7001'
  },
  {
    name: '韩国女',
    key: '7002'
  },
  {
    name: '韩国组合',
    key: '7003'
  },
  {
    name: '其他男歌手',
    key: '4001'
  },
  {
    name: '其他女歌手',
    key: '4002'
  },
  {
    name: '其他组合',
    key: '4003'
  }
];

// 歌手首字母
export const alphaTypes = [
  {
    key: 'A',
    name: 'A'
  },
  {
    key: 'B',
    name: 'B'
  },
  {
    key: 'C',
    name: 'C'
  },
  {
    key: 'D',
    name: 'D'
  },
  {
    key: 'E',
    name: 'E'
  },
  {
    key: 'F',
    name: 'F'
  },
  {
    key: 'G',
    name: 'G'
  },
  {
    key: 'H',
    name: 'H'
  },
  {
    key: 'I',
    name: 'I'
  },
  {
    key: 'J',
    name: 'J'
  },
  {
    key: 'K',
    name: 'K'
  },
  {
    key: 'L',
    name: 'L'
  },
  {
    key: 'M',
    name: 'M'
  },
  {
    key: 'N',
    name: 'N'
  },
  {
    key: 'O',
    name: 'O'
  },
  {
    key: 'P',
    name: 'P'
  },
  {
    key: 'Q',
    name: 'Q'
  },
  {
    key: 'R',
    name: 'R'
  },
  {
    key: 'S',
    name: 'S'
  },
  {
    key: 'T',
    name: 'T'
  },
  {
    key: 'U',
    name: 'U'
  },
  {
    key: 'V',
    name: 'V'
  },
  {
    key: 'W',
    name: 'W'
  },
  {
    key: 'X',
    name: 'X'
  },
  {
    key: 'Y',
    name: 'Y'
  },
  {
    key: 'Z',
    name: 'Z'
  }
];

//mock 歌手列表数据
const singerList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(item => {
  return {
    picUrl:
      'https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg',
    name: '隔壁老樊',
    accountId: 277313426
  };
});

function Singers(props: any) {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');

  const {
    singerList,
    pageCount,
    pullUpLoading,
    pullDownLoading,
    enterLoading
  } = props;

  const {
    getHotSingerDispatch,
    updateDispatch,
    pullDownRefreshDispatch,
    pullUpRefreshDispatch
  } = props;

  useEffect(() => {
    getHotSingerDispatch();
    // eslint-disable-next-line
  }, []);

  const handleUpdateCatetory = (val: string) => {
    setCategory(val);
    updateDispatch(val, alpha);
  };

  const handleUpdateAlpha = (val: string) => {
    setAlpha(val);
    updateDispatch(category, val);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  const renderSingerList = () => {
    const list = singerList ? singerList.toJS() : [];
    console.log(props);
    return (
      <List>
        {list.map((item: any, index: number) => {
          return (
            <ListItem key={item.accountId + '' + index}>
              <div className="img_wrapper">
                <LazyLoad
                  placeholder={
                    <div
                      style={{
                        width: '50px',
                        height: '50px'
                      }}></div>
                  }>
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="music"
                  />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={'分类 (默认热门):'}
          oldVal={category}
          handleClick={(val: string) => handleUpdateCatetory(val)}></Horizen>
        <Horizen
          list={alphaTypes}
          title={'首字母:'}
          oldVal={alpha}
          handleClick={(val: string) => handleUpdateAlpha(val)}></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}>
          {renderSingerList()}
        </Scroll>
        {enterLoading ? <Loading></Loading> : null}
      </ListContainer>
    </div>
  );
}

const mapStateToProps = (state: Map<string, any>) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});
const mapDispatchToProps = (dispatch: any) => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category: string, alpha: string) {
      dispatch(changePageCount(0)); //改变分类时，所以pageCount清零
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(
      category: string,
      alpha: string,
      hot: boolean,
      count: number
    ) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category: string, alpha: string) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (category === '' && alpha === '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
