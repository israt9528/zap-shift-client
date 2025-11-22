import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner/banner1.png";
import bannerImg2 from "../../../assets/banner/banner2.png";
import bannerImg3 from "../../../assets/banner/banner3.png";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true}>
      <div className="relative">
        <img src={bannerImg1} />
        <div className="flex items-center absolute bottom-16 left-22">
          <button type="button" className="btn bg-primary rounded-3xl">
            Track Your Parcel
          </button>
          <BsArrowUpRightCircleFill size={28} className="mr-3" />
          <button type="button" className="btn">
            Be A Rider
          </button>
        </div>
      </div>
      <div className="relative">
        <img src={bannerImg2} />
        <div className="flex items-center absolute bottom-16 left-22">
          <button type="button" className="btn bg-primary rounded-3xl">
            Track Your Parcel
          </button>
          <BsArrowUpRightCircleFill size={28} className="mr-3" />
          <button type="button" className="btn">
            Be A Rider
          </button>
        </div>
      </div>
      <div className="relative">
        <img src={bannerImg3} />
        <div className="flex items-center absolute bottom-16 left-22">
          <button type="button" className="btn bg-primary rounded-3xl">
            Track Your Parcel
          </button>
          <BsArrowUpRightCircleFill size={28} className="mr-3" />
          <button type="button" className="btn">
            Be A Rider
          </button>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
