import LoginForm from "./components/LoginForm";


function App() {
  return (
    <div className="container">
      <div className="App d-flex flex-column min-vh-100">
        <header>Header</header>
        <main className="flex-grow-1">
          <LoginForm />
        </main>
        <footer>Footer</footer>
      </div>
    </div>
  );
}

export default App;
