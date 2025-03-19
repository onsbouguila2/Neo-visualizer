import Chart from "./components/NasaDataChart";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        <Chart/>
      </main>
      <Footer />
    </div>
  );
};

export default App;
