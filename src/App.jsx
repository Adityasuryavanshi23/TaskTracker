import "./App.css";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Allroutes } from "./routes/Allroutes";

function App() {
  return (
    <>
      <Header />
      <main>
        <Allroutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
