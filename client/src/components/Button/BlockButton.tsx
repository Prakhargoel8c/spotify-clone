import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const BlockButton = styled(Button)({ '&.block': { width: '80%' }, '&:hover': { color: 'white' } });

export default BlockButton;
