import React from 'react';
import styled, { keyframes } from 'styled-components';
import style from '../../assets/global-style';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${style['font-color-light']};
  .back {
    margin-right: 5px;
    font-size: 20px;
    width: 20px;
  }
  > h1 {
    font-size: ${style['font-size-l']};
    font-weight: 700;
  }
`;

const marqueeKeyframes = keyframes`
  0% {
    transform: translateX(100%)
  }

  100% {
    transform: translateX(-100%);
  }
`;

const Marquee = styled.div`
  flex: 1;
  overflow: hidden;
  h1 {
    animation: ${marqueeKeyframes} 7s linear infinite;
  }
`;

interface Iprops {
  handleClick: () => void;
  title: string;
  isMarquee: boolean;
}

const Header: React.ForwardRefExoticComponent<Iprops &
  React.RefAttributes<HTMLDivElement>> = React.forwardRef(
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { handleClick, title, isMarquee } = props;
    return (
      <HeaderContainer ref={ref}>
        <i className="iconfont back" onClick={handleClick}>
          &#xe655;
        </i>
        {isMarquee ? (
          <Marquee>
            <h1>{title}</h1>
          </Marquee>
        ) : (
          <h1>{title}</h1>
        )}
      </HeaderContainer>
    );
  }
);

Header.defaultProps = {
  handleClick: () => {},
  title: '标题'
};

export default React.memo(Header);
