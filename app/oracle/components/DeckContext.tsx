import { createContext, useContext, useState, type ReactNode } from "react";
import type { KarmaCard } from "../data/cards";

interface DeckCtx {
  activeCard: KarmaCard | null;
  openCard: (card: KarmaCard) => void;
  closeCard: () => void;
}

const Ctx = createContext<DeckCtx | null>(null);

export function DeckProvider({ children }: { children: ReactNode }) {
  const [activeCard, setActiveCard] = useState<KarmaCard | null>(null);
  return (
    <Ctx.Provider
      value={{
        activeCard,
        openCard: setActiveCard,
        closeCard: () => setActiveCard(null),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useDeck() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDeck must be used within DeckProvider");
  return ctx;
}
