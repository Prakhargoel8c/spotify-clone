import styled from '@emotion/styled';
import { Button } from '@mui/material';

const RoundButton = styled(Button)({
  backgroundColor: '#3c3838',
  color: 'white',
  borderRadius: '20px',
  margin: '1% 0%',
  fontWeight: '500',
  '&:hover': { backgroundColor: 'black' },
});

export default RoundButton;
