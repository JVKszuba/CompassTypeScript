import Header from "./components/Header.tsx";
import goalsImg from "./assets/goals.jpg";
import CourseGoals from "./components/CourseGoals.tsx";

function App() {

  return (
    <main>
        <Header image={{src: goalsImg, alt: 'A list of goals'}}>
            <h1>Your Course Goals</h1>
        </Header>
        <CourseGoals goals={[{id: 1, title: 'Learn Ts', description: 'Learn Ts from the ground up'},
                             {id: 2, title: 'Practice Ts', description: 'Practice working with Ts'}]} />
    </main>
  )
}

export default App
