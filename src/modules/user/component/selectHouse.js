import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { alpha, styled } from '@mui/material/styles';

const currencies = [
  {
    value: 'Mansion',
    label: 'Mansion',
  },
  {
    value: 'Subdivision',
    label: 'Subdivision',
  },
  {
    value: 'House',
    label: 'House',
  },
  {
    value: 'Farm House',
    label: 'Farm House',
  },
];

const TextFieldstyled = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  });

export default function SelectTextFields({selected, houses, setSelectedHouse}) {

  const handleSelectHouse = (house) => {
    setSelectedHouse(houses[house])
  }

  console.log("selected", houses, selected);

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '30ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        {houses && <TextFieldstyled
          id="outlined-select-currency"
          select
          label="Home List"
          value={selected.id}
          defaultValue={houses[0].id}
          size="small"
          sx={{ input: { color: 'white'}}}
        >
          {houses.map((home, idx) => (
            <MenuItem key={home.id} value={home.id} onClick={() => handleSelectHouse(idx)}>
              {home.name}
            </MenuItem>
          ))}
        </TextFieldstyled>}
      </div>
    </Box>
  );
}