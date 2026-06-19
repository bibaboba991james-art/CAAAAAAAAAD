import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name }) => {
  const [mainSlider, setMainSlider] = React.useState<Slider | null>(null);
  const [thumbnailSlider, setThumbnailSlider] = React.useState<Slider | null>(null);

  const mainSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  const thumbnailSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: images.length < 4 ? images.length : 4,
    slidesToScroll: 1,
    arrows: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: images.length < 3 ? images.length : 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: images.length < 3 ? images.length : 3,
        },
      },
    ],
  };

  return (
    <div className="product-gallery">
      <div className="mb-4 bg-white/75 backdrop-blur-sm rounded-lg overflow-hidden border border-secondary-100">
        <Slider
          {...mainSettings}
          ref={(slider) => setMainSlider(slider)}
          asNavFor={thumbnailSlider || undefined}
        >
          {images.map((image, index) => (
            <div key={index} className="aspect-w-4 aspect-h-3">
              <img
                src={image}
                alt={`${name} - Bild ${index + 1}`}
                className="w-full h-64 md:h-96 object-contain"
              />
            </div>
          ))}
        </Slider>
      </div>
      
      {images.length > 1 && (
        <div>
          <Slider
            {...thumbnailSettings}
            ref={(slider) => setThumbnailSlider(slider)}
            asNavFor={mainSlider || undefined}
          >
            {images.map((image, index) => (
              <div key={index} className="px-1">
                <div className="border border-secondary-200 rounded-md overflow-hidden cursor-pointer transition-all hover:opacity-80 focus:ring-2 focus:ring-primary-500">
                  <img
                    src={image}
                    alt={`${name} - Thumbnail ${index + 1}`}
                    className="w-full h-16 object-cover"
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;