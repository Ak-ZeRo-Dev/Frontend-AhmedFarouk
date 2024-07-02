import Image from "next/image";
import React from "react";
import { EffectCreative, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { IImage } from "../../types/layout";

type Props = {
  title: string;
  images: any;
};

export default function ProductsCards({ images, title }: Props) {
  return (
    <div className="w-full h-[75%] overflow-hidden bg-white relative">
      {images.length > 1 ? (
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          effect={"creative"}
          loop={true}
          grabCursor={true}
          navigation={true}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["-100%", 0, 0],
            },
          }}
          modules={[Navigation, EffectCreative]}
          className="w-full h-full"
        >
          {images.map((image: IImage) => (
            <SwiperSlide key={image._id}>
              <Image
                src={image.url}
                alt={`${title}-Image`}
                width={0}
                height={0}
                decoding="async"
                priority
                sizes="w-full h-full"
                className="w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Image
          src={images[0].url}
          alt={`${title}-Image`}
          width={0}
          height={0}
          decoding="async"
          priority
          sizes="w-full h-full"
          className="w-full h-full"
        />
      )}
    </div>
  );
}
