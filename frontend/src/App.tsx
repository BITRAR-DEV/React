import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Outlet from "./components/outlet";
import { useTema } from "./contexts/ThemeContext";



function App() {
  const tema = useTema();
  return (
    <div className={`min-h-screen flex flex-col ${tema?.temaEscuro ? "bg-[#17131f]"
          : "bg-blue-100"}`}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
