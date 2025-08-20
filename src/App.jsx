import { Button, Container, Title, Text, Group } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import HeroSection from "./components/HeroSection.jsx";
import Header from "./components/Header.jsx";
function App() {
  return (
    <>
      <Header />
      <HeroSection />
    </>
  );
}

export default App;
