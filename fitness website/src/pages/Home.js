import React from "react";
import Video from "../components/Video";
import HeroSection from "../components/HeroSection";
import Reviews from "../components/Reviews";
import Features from "../components/Features";
import Form from "../components/Form";
import Membership from "../components/Membership";
import Teams from "../components/Teams";
import Commentsection from "../components/Commentsection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <Membership />
      <Teams />
      <Video url={"https://youtu.be/rBUjOY12gJA?si=wcHzYV6w-Rq9rgjO"} />
      <Reviews />
      <Commentsection />
      {/* <Form/> */}
    </>
  );
}
