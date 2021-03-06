import React, {
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
  useEffect,
  useMemo
} from 'react';
import styled from 'styled-components';
import BScroll from 'better-scroll';
import { debounce } from '../../api/utils';
import Loading from '../loading-v2/index';

const SrollContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const PullDownLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0px;
  height: 30px;
  margin: auto;
  z-index: 100;
`;

interface ScrollProps {
  direction?: 'vertical' | 'horizental';
  click?: boolean;
  refresh?: boolean;
  onScroll?: any; // 滚动时，执行的回调
  pullUp?: any;
  pullDown?: any;
  pullUpLoading?: boolean;
  pullDownLoading?: boolean;
  bounceTop?: boolean; // 是否支持向上吸顶
  bounceBottom?: boolean; // 是否支持向上吸顶
}

const Scroll: React.FunctionComponent<ScrollProps> = forwardRef(
  (props, ref) => {
    const [bScroll, setBScroll] = useState<BScroll | null>();

    const scrollContaninerRef = useRef(document.createElement('div'));

    const { direction, click, refresh, bounceTop, bounceBottom } = props;

    const { pullUp, pullDown, onScroll, pullDownLoading } = props;

    useEffect(() => {
      const scroll = new BScroll(scrollContaninerRef.current, {
        scrollX: direction === 'horizental',
        scrollY: direction === 'vertical',
        probeType: 3, // 在惯性滚动的过程中也分发scroll事件
        click: click, // 点击滚动时，是否分发一个click事件
        bounce: {
          // 是否需要回弹效果
          top: bounceTop,
          bottom: bounceBottom
        },
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
      });
      setBScroll(scroll);
      return () => {
        setBScroll(null);
      };
      // eslint-disable-next-line
    }, []);

    // 滚动时执行回调
    useEffect(() => {
      if (!bScroll || !onScroll) return;
      bScroll.on('scroll', (scroll: BScroll) => {
        onScroll(scroll);
      });
      return () => {
        bScroll.off('scroll');
      };
    }, [onScroll, bScroll]);

    // 下拉上滑回调函数的防抖
    let pullUpDebounce = useMemo(() => {
      return debounce(pullUp, 300);
    }, [pullUp]);

    let pullDownDebounce = useMemo(() => {
      return debounce(pullDown, 300);
    }, [pullDown]);

    // 滑动到底部，执行的回调
    useEffect(() => {
      if (!bScroll || !pullUp) return;
      // 滑动结束的事件
      bScroll.on('scrollEnd', () => {
        // 判断滑动结束时，是否滑动到了底部
        if (bScroll.y <= bScroll.maxScrollY + 100) {
          pullUpDebounce();
        }
      });
      return () => {
        bScroll.off('scrollEnd');
      };
    }, [pullUp, bScroll, pullUpDebounce]);

    useEffect(() => {
      if (!bScroll || !pullDown) return;
      bScroll.on('touchEnd', (pos: { x: number; y: number }) => {
        // 判断用户的下拉动作，超过50像素时，执行回调
        if (pos.y > 50) {
          pullDownDebounce();
        }
      });
      return () => {
        bScroll.off('touchEnd');
      };
    }, [pullDown, bScroll, pullDownDebounce]);

    // 重新渲染可能会有DOM结构的改变，调用refresh，以保证scroll正常
    useEffect(() => {
      if (refresh && bScroll) {
        bScroll.refresh();
      }
    });

    useImperativeHandle(ref, () => ({
      // 把这两个方法暴露给父组件
      refresh() {
        if (bScroll) {
          bScroll.refresh();
          bScroll.scrollTo(0, 0);
        }
      },
      getBScroll() {
        if (bScroll) {
          return bScroll;
        }
      }
    }));

    return (
      <SrollContainer ref={scrollContaninerRef}>
        {props.children}
        {pullDownLoading ? (
          <PullDownLoading>
            <Loading />
          </PullDownLoading>
        ) : null}
      </SrollContainer>
    );
  }
);

// props默认值
Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

export default Scroll;
