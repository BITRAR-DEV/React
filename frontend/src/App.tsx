import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <body className="bg-blue-50 min-h-screen">
      <div className="flex flex-col justify-self-center bg-white w-[60vw]">
        <Header />
        <Footer />
      </div>
    </body>
  );
}

export default App;
