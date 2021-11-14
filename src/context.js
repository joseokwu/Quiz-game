import React, { useState, useEffect, useContext } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const api = 'https://opentdb.com/api.php?';
  const table = {
    sports: 21,
    history: 23,
    politics: 24,
  };
  //Create states
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });
  const [isError, setIsError] = useState({
    show: false,
    msg: '',
  });
  const [score, setScore] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [end, setEnd] = useState(false);

  //Fetch data
  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      if (data.response_code === 0) {
        const newData = data.results;
        setQuestions(newData);
      } else {
        setIsError({
          show: true,
          msg: `Can't Generate Questions, Please Try Different Options`,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(
      `${api}amount=${quiz.amount}&category=${
        table[quiz.category]
      }&difficulty=${quiz.difficulty}&type=multiple`
    );
    setClicked(true);
  };

  const quit = () => {
    setQuestions([]);
    setModalOpen(false);
    setScore(0);
    setPage(0);
    setEnd(false);
    setTotalScore(0);
    setClicked(false);
  };

  const skip = () => {
    setClicked(true);

    if (page === quiz.amount - 1) {
      setEnd(true);
    } else {
      setPage(page + 1);
    }
  };

  const handleAnswer = (e) => {
    const id = e.target.dataset.id;
    setClicked(true);
    if (page === quiz.amount - 1) {
      if (correctAnswer === id) {
        setScore((score) => (score += 1));
      }
      setEnd(true);
    } else {
      if (correctAnswer === id) {
        setScore((score) => (score += 1));
      }
      setPage(page + 1);
    }
  };

  useEffect(() => {
    if (end) {
      const total = ((score / quiz.amount) * 100).toFixed(0);
      setTotalScore(total);
      setModalOpen(true);
    }
  }, [end]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        quiz,
        isError,
        handleChange,
        handleSubmit,
        questions,
        page,
        quit,
        skip,
        handleAnswer,
        score,
        modalOpen,
        totalScore,
        clicked,
        setCorrectAnswer,
        setClicked,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
