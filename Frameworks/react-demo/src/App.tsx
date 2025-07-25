import Header from "./components/Header.tsx";
import goalsImg from "./assets/goals.jpg";

function App() {

  return (
    <main>
        <Header image={{src: goalsImg, alt: 'A list of goals'}}>
            <h1>Your Course Goals</h1>
        </Header>
    </main>
  )
}

export default App
