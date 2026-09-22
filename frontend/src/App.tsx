import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Outlet from "./components/outlet";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
