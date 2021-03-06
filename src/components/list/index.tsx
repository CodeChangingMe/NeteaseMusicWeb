import React from 'react';
import { ListWrapper, List, ListItem } from './style';
import { getCount } from '../../api/utils';
import LazyLoad from 'react-lazyload';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps<any> {
  recommendList: any[];
}

const RecommendList: React.FC<IProps> = props => {
  const enterDetail = (id: any) => {
    props.history.push(`/recommend/${id}`);
  };

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {props.recommendList.map((item, index) => {
          return (
            <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad
                  placeholder={
                    <div
                      style={{
                        width: '100%',
                        height: '100%'
                      }}></div>
                  }>
                  <img src={item.picUrl + '?param=300x300'} alt="music" />
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
};

export default React.memo(withRouter(RecommendList));
