import styled from 'styled-components';
import style from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: ${style['background-color']};
  transform-origin: left bottom;
  &.fly-enter,
  &.fly-appear {
    transform: translateX(100%);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transform: translateX(0);
    transition: transform 300ms;
  }
  &.fly-exit {
    transform: translateX(0);
  }
  &.fly-exit-active {
    transform: translateX(100%);
    transition: transform 300ms;
  }
`;
