import { useState } from "react";
import type { CategoryKey } from "./data/cards";
import { DeckProvider } from "./components/DeckContext";
import Starfield from "./components/Starfield";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Realms from "./components/Realms";
import SacredDraw from "./components/SacredDraw";
import Gallery from "./components/Gallery";
import Guidebook from "./components/Guidebook";
import Vision from "./components/Vision";
import Footer from "./components/Footer";
import CardModal from "./components/CardModal";

type Filter = CategoryKey | "all";

export default function App() {
  const [filter, setFilter] = useState<Filter>("all");

  const handlePick = (key: CategoryKey) => {
    setFilter(key);
    requestAnimationFrame(() => {
      document.getElementById("deck")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <DeckProvider>
      <Starfield />
      <Navbar />
      <main className="relative">
        <Hero />
        <Realms onPick={handlePick} />
        <SacredDraw />
        <Gallery filter={filter} setFilter={setFilter} />
        <Guidebook />
        <Vision />
      </main>
      <Footer />
      <CardModal />
    </DeckProvider>
  );
}
