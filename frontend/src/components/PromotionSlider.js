// PromotionSlider.js
import React ,{ useState }from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import imgPromotion1 from '../assets/promo.png';
import imgPromotion2 from '../assets/promo2.png';
import imgPromotion3 from '../assets/promo3.png';

const PromotionSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleSlideChange = (index) => {
      setCurrentSlide(index);
    };

    const sliderContainerStyle = {
        position: 'relative',
        margin: '20px 0',
      };
  return (
    <div style={sliderContainerStyle}>
      <Carousel
      selectedItem={currentSlide} // Menyinkronkan selectedItem dengan state
      onChange={handleSlideChange} 
      showArrows={false} 
      infiniteLoop={true} 
      showThumbs={false}
      autoPlay={true}
      interval={3000}>
        <div>
          <img src={imgPromotion1} alt="Promotion 1" 
          style={{ width: '50%', height: 'auto', marginRight: '10px',border: '1px solid transparent',borderRadius:'24px'}} />
        </div>
        <div>
          <img src={imgPromotion2} alt="Promotion 2" 
          style={{ width: '50%', height: 'auto', marginRight: '10px',border: '1px solid transparent',borderRadius:'24px'}} />
        </div>
        <div>
          <img src={imgPromotion3} alt="Promotion 3" 
          style={{ width: '50%', height: 'auto', marginRight: '10px',border: '1px solid transparent',borderRadius:'24px'}} />
        </div>
      </Carousel>
    </div>
  );
};

export default PromotionSlider;
