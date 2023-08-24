import { stringType, boolType, objectType } from '../../constatnts/prop-types';
import Deadline from '../Deadline/Deadline';
import AvatarLetter from '../../ui/AvatarUser/AvatarLetter';
import AvatarPic from '../../ui/AvatarUser/AvatarPic';

export default function PostProject({
  title,
  is_active,
  start,
  finish,
  users,
}) {
  const usersProject = structuredClone(users);
  const creator = usersProject?.user;
  const photo = creator?.photo;

  return (
    <form className='postProject'>
      <div className='postProject__project-title'>{title}</div>
      <div className='postProject__project-info'>
        <div className='postProject__project-time'>
          <Deadline start={start} finish={finish} />
        </div>
        <div className='postProject__wrap'>
          <div className='postProject__project-member'>
            {photo ? (
              <AvatarPic pic={photo} size={22} />
            ) : (
              <AvatarLetter
                nameUser={creator?.first_name}
                surnameUser={creator?.last_name}
                size={22}
                fSize={10}
              />
            )}
            <div className='postProject__creator'>
              {creator?.first_name} {creator?.last_name}
            </div>
          </div>
          <div
            className={
              is_active
                ? 'postProject__project-status-actived'
                : 'postProject__project-status-closed'
            }
          >
            {is_active ? 'Активен' : 'Завершен'}
          </div>
        </div>
      </div>
    </form>
  );
}

PostProject.propTypes = {
  start: stringType,
  finish: stringType,
  title: stringType,
  is_active: boolType,
  users: objectType,
};
