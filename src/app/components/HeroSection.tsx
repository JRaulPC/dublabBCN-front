"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import TextBackgorund from "./TextBackground";
import { useSlideOver } from "../contexts/useContexts";

const HeroSection = (): React.ReactElement => {
  const { isOpen } = useSlideOver();

  return (
    <section className="h-[348px] relative ">
      <TextBackgorund />

      <div className="bottom-0 absolute w-full h-[42px] bg-black flex">
        {!isOpen && (
          <Marquee>
            <span className=" text-white tracking-[3.8px] flex whitespace-nowrap justify-center ">
              {
                "/// LATEST /// LATEST /// LATEST /// LATEST /// LATEST /// LATEST ///"
              }
              {
                "LATEST /// LATEST /// LATEST /// LATEST /// LATEST /// LATEST ///"
              }
              {"LATEST /// LATEST /// LATEST /// LATEST /// LATEST /// LATEST"}
            </span>
          </Marquee>
        )}
      </div>
    </section>
  );
};
export default HeroSection;
