// hooks
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar, { Props as AvatarProps } from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: AvatarProps) {
  return (
    <Avatar
      src={'/assets/avater/blank.png'}
      alt="Admin"
      color={'/assets/avater/blank.png' ? 'default' : createAvatar('Admin').color}
      {...other}
    >
      {createAvatar('Admin').name}
    </Avatar>
  );
}
