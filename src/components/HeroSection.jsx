import { Carousel } from "@mantine/carousel";
import { Button, Card, Group, Image, Text, Stack, Title } from "@mantine/core";
import classes from "./CarouselCard.module.css";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const slidesData = [
  {
    image: "/public/images/slider.svg",
    heading: "Welcome to Our Platform",
    buttonText: "Get Started",
  },
  {
    image: "/public/images/slider1.svg",
    heading: "Explore Features",
    buttonText: "Learn More",
  },
  {
    image: "/public/images/slider2.svg",
    heading: "Join the Community",
    buttonText: "Sign Up",
  },
  {
    image: "/public/images/slider3.svg",
    heading: "Stay Updated",
    buttonText: "Subscribe",
  },
  {
    image: "/public/images/slider4.svg",
    heading: "Contact Us Today",
    buttonText: "Reach Out",
  },
];

export default function HeroSection() {
  const autoplay = useRef(Autoplay({ delay: 1000 }));

  const slides = slidesData.map(({ image, heading, buttonText }, index) => (
    <Carousel.Slide key={index}>
      <Stack
        align="center"
        justify="center"
        spacing="md"
        style={{ position: "relative", height: 700 }}
      >
        <Image
          src={image}
          height={700}
          style={{ objectFit: "cover", width: "100%" }}
        />
        <div className={classes.overlay}>
          <Title order={1}>{heading}</Title>
          <Button variant="filled" color="blue">
            {buttonText}
          </Button>
        </div>
      </Stack>
    </Carousel.Slide>
  ));

  return (
    <Card withBorder padding="xl">
      <Card.Section>
        <Carousel
          withIndicators
          loop
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.play}
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>
    </Card>
  );
}
