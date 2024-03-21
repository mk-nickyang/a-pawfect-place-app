import { LoginButton } from './components/LoginButton';
import { useWarmUpBrowser } from './useWarmUpBrowser';

export const Account = () => {
  useWarmUpBrowser();

  return <LoginButton />;
};
