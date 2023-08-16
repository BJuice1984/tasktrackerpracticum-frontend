import { useState, useEffect } from 'react';
import { activeType, setActiveType } from '../../constatnts/prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addProject, createNewProjects } from '../../services/projectsSlice';
import { fetchUserMe } from '../../services/userSlice';
import avatar from '../../images/user-avatar-profile.png';
import Select from '../Select/Select';

function CreateProject({ active, setActive }) {
  const [isActiveListPerformer, setActliveListPerformer] = useState(false);
  const [title, setTitle] = useState();
  const [date_start, setDateStart] = useState('');
  const [date_finish, setDateFinish] = useState('');
  const [disabled, setDisabled] = useState(true);

  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleAction = () => {
    dispatch(addProject({ title, date_start, date_finish }));
    dispatch(createNewProjects({ title, date_start, date_finish }));
    setActive(!active);
  };

  useEffect(() => {
    dispatch(fetchUserMe());
  }, [dispatch]);

  const handleNameChange = (event) => {
    event.preventDefault();
    if (event.target.value !== title) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setTitle(event.target.value);
  };
  const handleDateStartChange = (event) => {
    event.preventDefault();
    if (event.target.value !== date_start) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setDateStart(event.target.value);
  };
  const handleDateFinishChange = (event) => {
    event.preventDefault();
    if (event.target.value !== date_finish) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setDateFinish(event.target.value);
  };

  const toggleListPerformer = () => {
    setActliveListPerformer(!isActiveListPerformer);
  }

  return (
    <section className={active ? 'createProject__active' : 'createProject'}>
      <div className='createProject__wrap'>
        <div className='createProject__info-content'>
          <input
            className='createProject__title'
            value={title || ''}
            onChange={handleNameChange}
            id='date-begin-input'
            type='text'
            placeholder='Название проекта'
            name='title'
            required
          />
        </div>
        <button
          className='createProject__cancel-btn'
          onClick={() => setActive(!active)}
        ></button>
      </div>

      <div className='createProject__content'>
        <form className='createProject__info'>
          <div className='createProject__container'>
            <h2 className='createProject__subtitle'>Дата начала</h2>
            <input
              className='createProject__input'
              value={date_start}
              onChange={handleDateStartChange}
              id='date-begin-input'
              type='date'
              placeholder='Дата начала'
              name='date_start'
              required
            />
          </div>
          <div className='createProject__container'>
            <h2 className='createProject__subtitle'>Дата окончания</h2>
            <input
              className='createProject__input'
              value={date_finish}
              onChange={handleDateFinishChange}
              id='date-finish-input'
              type='date'
              placeholder='Дедлайн'
              name='date_finish'
              required
            />
          </div>
          <div className='createProject__container-creator'>
            <h2 className='createProject__subtitle'>Автор</h2>
            <div className='createProject__creator'>
              <img
                src={currentUser.photo !== '' ? avatar : currentUser.photo}
                className='createProject__creator-avatar'
                alt='avatar'
              />
              <div className='createProject__creator-name'>
                {currentUser.first_name} {currentUser.last_name}
              </div>
            </div>
          </div>
          <div className='createProject__container'>
            <h2 className='createProject__subtitle'>Исполнитель</h2>
            <div className="createProject__performer" onClick={toggleListPerformer}>
              <div className="createProject__add-performer"> + Добавить</div>
              <Select isActiveListPerformer={isActiveListPerformer}
            setActliveListPerformer={setActliveListPerformer}/>
            </div>
          </div>
          <div className='createProject__container-btn'>
            <button
              disabled={disabled}
              className='createProject__submit-btn'
              type='submit'
              onClick={handleAction}
            >
              + Создать проект
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateProject;

CreateProject.propTypes = {
  active: activeType,
  setActive: setActiveType
};
