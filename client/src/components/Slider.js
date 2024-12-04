import React, { memo } from 'react';
import Slider from "react-slick";

const SliderCustom = ({ images }) => {
    // Move `settings` here so it has access to `images` prop
    const settings = {
        dots: false,
        infinite: images.length > 1, // Now `images` is accessible here
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className='w-full'>
            {images?.length > 1 ? (
                <Slider {...settings}>
                    {images.map((item, index) => (
                        <div key={index} className='bg-black flex justify-center h-[320px] px-12'>
                            <img src={item} alt="slider" className='object-contain m-auto h-full' />
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className='bg-black flex justify-center h-[320px] px-12'>
                    <img src={images[0]} alt="slider" className='object-contain m-auto h-full' />
                </div>
            )}
        </div>
    );
}

export default memo(SliderCustom);
