import React from 'react';
import styled from 'styled-components';
import style from '../../assets/global-style';
import PropTypes from 'prop-types';

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

interface Iprops {
  handleClick: () => void;
  title: string;
}

const Header: React.FC<Iprops> = React.forwardRef((props, ref: any) => {
  const { handleClick, title } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      <h1>{title}</h1>
    </HeaderContainer>
  );
});

Header.defaultProps = {
  handleClick: () => {},
  title: '标题'
};

export default React.memo(Header);
