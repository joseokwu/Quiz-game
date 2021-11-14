import { useGlobalContext } from './context';

const SetupForm = () => {
  const { isError, quiz, handleChange, handleSubmit } = useGlobalContext();
  return (
    <div className='quiz'>
      <form className='setup-form'>
        <h2>Setup Quiz</h2>
        <div className='form-control'>
          <label htmlFor='number'>number of questions</label>
          <input
            type='number'
            name='amount'
            id='number'
            className='form-input'
            value={quiz.amount}
            min={1}
            max={43}
            onChange={handleChange}
          />
          <label htmlFor='category'>Category</label>
          <select
            id='category'
            className='form-input'
            name='category'
            value={quiz.category}
            onChange={handleChange}
          >
            <option value='sports'>Sports</option>
            <option value='history'>History</option>
            <option value='politics'>Politics</option>
          </select>
          <label htmlFor='difficulty'>Select Difficulty</label>
          <select
            name='difficulty'
            id='difficulty'
            className='form-input'
            value={quiz.difficulty}
            onChange={handleChange}
          >
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
        </div>
        <div>
          <p className={`${isError.show ? 'error show-error' : 'error'}`}>
            {isError.msg}
          </p>
          <button type='submit' className='submit-btn' onClick={handleSubmit}>
            start
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupForm;
