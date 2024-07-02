"use client";

import Image from "next/image";
import {
  Autoplay,
  EffectFade,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../styles/about.css";
import { def } from "../../styles/styles";
import { IAbout, IImage } from "../../types/layout";
import { useSelector } from "react-redux";
import { selectAbout } from "../../store/features/layout/layoutSlice";

export default function About() {
  const data: IAbout = useSelector(selectAbout);
  const {
    images,
    address: { lat, lng },
    messages: { definition, mission, address },
  } = data;

  return (
    <section className="container mx-auto pt-main font-Rubik pb-20">
      <div className="min-w-full flex flex-col gap-y-20">
        <div className="w-full flex flex-col items-center gap-y-6">
          <Header definition={definition} />
          <Images images={images} />
        </div>
        <OurMission message={mission} />
        <Address lat={lat} lng={lng} address={address} />
      </div>
    </section>
  );
}

function Header({ definition }: { definition: string }) {
  return (
    <header className="pt-5">
      <h1 className={`text-4xl font-medium mb-8 text-center ${def.text}`}>
        من نحن
      </h1>
      <p className={`${def.subtitle}`}>{definition}</p>
    </header>
  );
}

function Images({ images }: { images: IImage[] }) {
  return (
    <Swiper
      spaceBetween={30}
      effect={"fade"}
      fadeEffect={{ crossFade: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      pagination={{
        clickable: true,
      }}
      mousewheel={true}
      navigation={true}
      loop={true}
      modules={[EffectFade, Pagination, Autoplay, Navigation, Mousewheel]}
      className=" w-[90%] rounded-md shadow-sm h-[30rem] max-md:h-72"
    >
      {images.map((image) => (
        <SwiperSlide key={image._id}>
          <Image src={image.url} alt="About Image" layout="fill" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function OurMission({ message }: { message: string }) {
  return (
    <div className="text-start px-5 lg:pr-28">
      <h2 className={`text-4xl font-medium mb-8 ${def.text}`}>مهمتنا</h2>
      <p className={`${def.subtitle} pr-5`}>
        {message
          ? message
          : "في متجرنا، نسعى جاهدين لتحقيق رضا عملائنا من خلال تقديم منتجات عالية الجودة وخدمة عملاء مميزة."}
      </p>
    </div>
  );
}

function Address({
  lat,
  lng,
  address,
}: {
  lat: number;
  lng: number;
  address: string;
}) {
  const GOOGLE_MAPS = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=6&ie=UTF8&iwloc=&output=embed`;
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className={`text-4xl font-medium mb-8 ${def.text}`}>موقعنا</h2>
      {address && <p className={`${def.subtitle} mb-5`}>{address}</p>}
      <iframe
        src={GOOGLE_MAPS}
        className="w-[70%] h-[31rem] max-md:w-[90%] max-md:h-72 border-4 border-fourth dark:border-secondary shadow-md rounded-sm"
      />
    </div>
  );
}
