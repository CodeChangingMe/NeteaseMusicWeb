import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Container, TopDesc, Menu, SongList, SongItem } from './style';
import { CSSTransition } from 'react-transition-group';
import { RouteComponentProps } from 'react-router-dom';
import Header from '../../baseUI/header';
import Scroll from '../../baseUI/scroll';
import { getName, getCount, isEmptyObject } from './../../api/utils';
import style from '../../assets/global-style';
import { changeEnterLoading, getAlbumList } from './store/actionCreators';
import { connect } from 'react-redux';
import Loading from '../../baseUI/loading/index';

interface IProps extends RouteComponentProps<any> {
  currentAlbum: any;
  enterLoading: boolean;
  getAlbumDataDispatch: any;
}

const HEADER_HEIGHT = 45;

const Album: React.FC<IProps> = props => {
  const [showStatus, setShowStatus] = useState(true);

  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯

  const headerEl = useRef<HTMLDivElement>(null);

  // 从路由中拿到歌单的 id
  const id = props.match.params.id;

  const { currentAlbum: currentAlbumImmutable, enterLoading } = props;
  const { getAlbumDataDispatch } = props;

  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

  const currentAlbum = currentAlbumImmutable.toJS();

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    (pos: any) => {
      const minScrollY = -HEADER_HEIGHT;
      const percent = Math.abs(pos.y / minScrollY);
      const headerDom: HTMLDivElement = headerEl.current!;
      // 滑过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style['theme-color'];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2).toString();
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = '';
        headerDom.style.opacity = '1';
        setTitle('歌单');
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={props.history.goBack}>
      <Container>
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}></Header>
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              <TopDesc background={currentAlbum.coverImgUrl}>
                <div className="background">
                  <div className="filter"></div>
                </div>
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  <img src={currentAlbum.coverImgUrl} alt="" />
                  <div className="play_count">
                    <i className="iconfont play">&#xe885;</i>
                    <span className="count">
                      {Math.floor(currentAlbum.subscribedCount / 1000) / 10} 万{' '}
                    </span>
                  </div>
                </div>
                <div className="desc_wrapper">
                  <div className="title">{currentAlbum.name}</div>
                  <div className="person">
                    <div className="avatar">
                      <img src={currentAlbum.creator.avatarUrl} alt="" />
                    </div>
                    <div className="name">{currentAlbum.creator.nickname}</div>
                  </div>
                </div>
              </TopDesc>
              <Menu>
                <div>
                  <i className="iconfont">&#xe6ad;</i>
                  评论
                </div>
                <div>
                  <i className="iconfont">&#xe86f;</i>
                  点赞
                </div>
                <div>
                  <i className="iconfont">&#xe62d;</i>
                  收藏
                </div>
                <div>
                  <i className="iconfont">&#xe606;</i>
                  更多
                </div>
              </Menu>
              <SongList>
                <div className="first_line">
                  <div className="play_all">
                    <i className="iconfont">&#xe6e3;</i>
                    <span>
                      {' '}
                      播放全部{' '}
                      <span className="sum">
                        (共 {currentAlbum.tracks.length} 首)
                      </span>
                    </span>
                  </div>
                  <div className="add_list">
                    <i className="iconfont">&#xe62d;</i>
                    <span>
                      {' '}
                      收藏 ({getCount(currentAlbum.subscribedCount)})
                    </span>
                  </div>
                </div>
                <SongItem>
                  {currentAlbum.tracks.map((item: any, index: number) => {
                    return (
                      <li key={index}>
                        <span className="index">{index + 1}</span>
                        <div className="info">
                          <span>{item.name}</span>
                          <span>
                            {getName(item.ar)} - {item.al.name}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </SongItem>
              </SongList>
            </div>
          </Scroll>
        ) : null}
        {enterLoading ? <Loading></Loading> : null}
      </Container>
    </CSSTransition>
  );
};

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state: any) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading'])
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch: any) => {
  return {
    getAlbumDataDispatch(id: number) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album));
