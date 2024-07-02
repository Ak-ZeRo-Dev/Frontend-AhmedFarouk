"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { IImage } from "../../types/layout";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./style.css";
import { Box } from "@mui/material";

type Props = {
  images: IImage[];
};

export default function ProductImages({ images }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const data = images.map((image) => (
    <SwiperSlide key={image._id} className="relative w-full h-full">
      <Image src={image.url} alt="صورة النتج" fill />
    </SwiperSlide>
  ));
  return (
    <div className="!h-full flex-[0.7] flex flex-row-reverse gap-2 overflow-hidden">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {data}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        direction="vertical"
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper w-1"
      >
        {data}
      </Swiper>
    </div>
  );
}
