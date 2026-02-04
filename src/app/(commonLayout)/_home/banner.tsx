"use client";
import Autoplay from "embla-carousel-autoplay";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselBanner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  const data = ["/images/banner2.jpg", "/images/banner3.jpg"];

  return (
    <div className="mx-auto w-full lg:h-105 md:h-80 h-60">
      <Carousel plugins={[plugin.current]} setApi={setApi} className="h-full">
        <CarouselContent className="h-full">
          {data?.map((item, index) => (
            <CarouselItem key={index} className="h-full rounded-md">
              <Image
                src={item}
                alt=""
                width={1920}
                height={300}
                className="lg:h-105 md:h-80 h-60 rounded-md"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="md:block hidden">
          <CarouselPrevious />
        </div>
        <div className="md:block hidden">
          <CarouselNext />
        </div>
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} of {count}
      </div>
    </div>
  );
}
