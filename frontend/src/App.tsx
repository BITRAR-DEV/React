import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Outlet from "./components/outlet";

function App() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
