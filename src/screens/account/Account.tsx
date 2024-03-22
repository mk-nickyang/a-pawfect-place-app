import { ScrollView } from 'react-native';

import { AccountHeader } from './components/AccountHeader';
import { useWarmUpBrowser } from './useWarmUpBrowser';

export const Account = () => {
  useWarmUpBrowser();

  return (
    <ScrollView>
      <AccountHeader />
    </ScrollView>
  );
};
