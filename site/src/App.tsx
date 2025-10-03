import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RoutesComponent from "./routes";
import { LanguageProvider } from "./context/LanguageContext";

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Header />
      <RoutesComponent />
      <Footer />
    </LanguageProvider>
  );
};

export default App;
