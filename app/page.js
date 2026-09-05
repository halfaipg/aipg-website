import Hero from "@/components/Hero";
import Products from "@/components/Products";
import GridParticipation from "@/components/GridParticipation";
import GridChat from "@/components/GridChat";

export default function Home() {
  return (
    <main className="dark">
      <Hero />
      <GridChat />
      <Products />
      <GridParticipation />
    </main>
  );
}
