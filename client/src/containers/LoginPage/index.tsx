import { BlockButton } from '../../components/Button';
import { spotifyAuthUrl } from '../../constants';
import LoginContainer from './LoginContainer';
import LoginFormContainer from './LoginFormContainer';
import logo from '../../assets/logo.svg';
import { WhiteSpinner } from '../../components/Spinner';
import { useAppSelector } from '../../store/hooks';
import { selectAuthenticationStatus } from '../../store/globalReducers/userSlice';

const LoginPage = () => {
  const authenticationStatus = useAppSelector(selectAuthenticationStatus);
  return (
    <LoginContainer>
      <LoginFormContainer>
        <img src={logo} width="340" alt="logo" />
        {authenticationStatus === 'failed' && <p>Login Failed</p>}
        {authenticationStatus === 'loading' ? (
          <WhiteSpinner />
        ) : (
          <BlockButton className="block" variant="contained" href={spotifyAuthUrl}>
            Log In
          </BlockButton>
        )}
      </LoginFormContainer>
    </LoginContainer>
  );
};

export default LoginPage;
