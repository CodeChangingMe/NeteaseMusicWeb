import React, { memo, useEffect, useRef } from 'react';
import Scroll from '../scroll';
import { List, ListItem } from './style';

interface HorizenProps {
  list: any[]; // 列表数据
  oldVal?: string; // 当前值
  title: string; // 列表左边的标题
  handleClick?: any; // 点击不同的item时执行的方法
}

const Horizen: React.FC<HorizenProps> = props => {
  const { list, oldVal, title } = props;
  const { handleClick } = props;

  const Category = useRef(document.createElement('div'));

  // 设置容器宽度
  useEffect(() => {
    let categoryDOM = Category.current;
    let tagElems = categoryDOM.querySelectorAll('span');
    let totalWidth = 10;
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth; //元素的宽度，包含了border，但是不包含margin
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  return (
    <Scroll direction="horizental">
      <List ref={Category}>
        <span>{title}</span>
        {list.map((item: { key: string; name: string }) => {
          return (
            <ListItem
              key={item.key}
              className={oldVal === item.key ? 'selected' : ''}
              onClick={() => handleClick(item.key)}>
              {item.name}
            </ListItem>
          );
        })}
      </List>
    </Scroll>
  );
};

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
};

export default memo(Horizen);
