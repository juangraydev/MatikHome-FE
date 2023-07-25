import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(props) {
  return {
    sx: {
        width: 30,
        height: 30,
        color: props?.color,
        bgcolor: props.bgColor ? props.bgColor : stringToColor(props?.name),
        fontSize: 12
    },
    children: props?.name?.split(' ').length > 1 ? `${props?.name?.split(' ')[0][0]}${props?.name?.split(' ')[1][0]}` : props?.name,
  };
}

export default function LetterAvatars(props) {
  return (
    <Avatar {...stringAvatar(props)}/>
  );
}