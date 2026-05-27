import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import Navbar from "./Components/Navbar";

import RankPage from "./Components/RankPage";
import AdminPage from "./Components/AdminPage";

import VentasSeguros from "./Components/ventasseguros";
import VetasConsumos from "./Components/vetasconsumos";
import VentasTarjetas from "./Components/ventastarjetas";
import Tusganancias from "./Components/tusganancias";
import Ganamas from "./Components/Ganamas";
import Footer from "./Components/Footer";
import FloatingButtons from "./Components/FloatingButtons";



function AnimatedSection({ id, children, delay = 0 }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <AnimatedSection id="RankPage" delay={0.1}>
          <RankPage />
        </AnimatedSection> 

        <AnimatedSection id="AdminPage" delay={0.2}>
          <AdminPage />
        </AnimatedSection> 


        <AnimatedSection id="ventasseguros" delay={0.4}>
          <VentasSeguros />
        </AnimatedSection>

        <AnimatedSection id="vetasconsumos" delay={0.6}>
          <VetasConsumos />
        </AnimatedSection>

        <AnimatedSection id="ventastarjetas" delay={0.8}>
          <VentasTarjetas />
        </AnimatedSection>

        <AnimatedSection id="ganamas" delay={1.0}>
          <Ganamas />
        </AnimatedSection>
      </main>

      <FloatingButtons />
      <Footer />
    </>
  );
}

export default App;