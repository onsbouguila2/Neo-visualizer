import Chart from "./components/AsteroidChart";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Layout from "./components/Layout";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <main className="content">
        {/* <Chart/> */}
        <Layout/>
      </main>
      <Footer />
    </div>
  );
};

export default App;
