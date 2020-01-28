import React, { useState, useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/css/swiper.css';
import { SliderContainer } from './style';

interface SliderProps {
  bannerList: { imageUrl: string }[];
}

export function Slider(props: SliderProps) {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper | null>(null);
  const { bannerList } = props;

  useEffect(() => {
    // 只有在有图片的时候，才会去做初始化
    if (bannerList.length && !sliderSwiper) {
      let sliderSwiper = new Swiper('.slider-container', {
        speed: 1000,
        loop: true,
        autoplay: true,
        pagination: { el: '.swiper-pagination' }
      });
      setSliderSwiper(sliderSwiper);
    }
  }, [bannerList, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {bannerList.map((slider, index) => {
            return (
              <div className="swiper-slide" key={slider.imageUrl}>
                <div className="slider-nav">
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  );
}

export default React.memo(Slider);
