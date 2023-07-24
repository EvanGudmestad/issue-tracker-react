import LoginForm from "./components/LoginForm";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
function App() {
  return (
    <div className="container">
      <div className="App d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <LoginForm />
        </main>
       <Footer />
      </div>
    </div>
  );
}

export default App;
