import './App.css';
import SetupForm from './SetupForm';
import Loading from './Loading';
import Questions from './Questions';
import { useGlobalContext } from './context';
import Modal from './Modal';

function App() {
  const { isLoading, questions } = useGlobalContext();

  if (questions.length <= 0) {
    return (
      <main className='main'>
        <div className='page'>
          <SetupForm />
        </div>
      </main>
    );
  } else if (isLoading) {
    return (
      <section className='main'>
        <div className='page'>
          <Loading />
        </div>
      </section>
    );
  } else {
    return (
      <main className='main'>
        <Modal />
        <div className='page'>
          <Questions />
        </div>
      </main>
    );
  }
}

export default App;
