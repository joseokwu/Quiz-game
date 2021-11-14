import { useGlobalContext } from './context';

const Modal = () => {
  const { quit, totalScore, modalOpen } = useGlobalContext();
  return (
    <div
      className={modalOpen ? 'modal-container show-modal' : 'modal-container'}
    >
      <div className='modal'>
        <h2>Welldone!!!</h2>
        <p>You answered {totalScore}% of questions correctly</p>
        <button type='submit' className='submit-btn' onClick={quit}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
