"use client";

import React, { useRef } from "react";
import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Link from "next/link";

const WelcomePage = () => {
  const swiperRef = useRef(null);

  const handleSlideClick = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to Our Application!</h1>
      <p>We&apos;re excited to have you here. Let&apos;s get you started with a quick overview.</p>

     
    </div>
  );
};

export default WelcomePage;
