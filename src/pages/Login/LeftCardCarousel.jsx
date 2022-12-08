import React from "react";
import { Carousel } from "react-bootstrap";
import image1 from "../../assets/animated/Abstract_track_statistic_by_Icons8.gif";
import image2 from "../../assets/animated/Abstract_working_remotely_by_Icons8.gif";
import image3 from "../../assets/animated/Abstract_easy_money_by_Icons8.gif";
import image4 from "../../assets/animated/Abstract_location_access_by_Icons8.gif";
import image5 from "../../assets/animated/Abstract_logged_out_by_Icons8.gif";
import image6 from "../../assets/animated/Abstract_present_by_Icons8.gif";
// import image1 from "../../assets/undraw_art_lover_re_fn8g.svg";
// import image2 from "../../assets/undraw_logistics_x-4-dc.svg";
// import image3 from "../../assets/undraw_two_factor_authentication_namy.svg";
// import image4 from "../../assets/undraw_unlock_re_a558.svg";
const LeftCardCarousel = () => {
  return (
    <Carousel indicators={false} controls={false}>
      <Carousel.Item interval={3000}>
        <img className="w-100" src={image1} alt="First slide" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="w-100" src={image2} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="w-100" src={image3} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="w-100" src={image4} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="w-100" src={image5} alt="Third slide" />
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img className="w-100" src={image6} alt="Third slide" />
      </Carousel.Item>
    </Carousel>
  );
};

export default LeftCardCarousel;
