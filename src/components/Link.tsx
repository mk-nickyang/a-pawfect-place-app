import * as MailComposer from 'expo-mail-composer';
import { openBrowserAsync } from 'expo-web-browser';

import { Text } from '@/components/Text';

type Props = { url: string };

export const Link = ({ url }: Props) => {
  return (
    <Text
      variant="body1"
      textDecorationLine="underline"
      onPress={() => openBrowserAsync(url)}
    >
      {url}
    </Text>
  );
};

type EmailLinkProps = { subject: string };

export const EmailLink = ({ subject }: EmailLinkProps) => {
  return (
    <Text
      variant="body1"
      fontWeight="600"
      textDecorationLine="underline"
      onPress={() =>
        MailComposer.composeAsync({
          subject,
          recipients: ['hello@apawfectplace.com.au'],
        })
      }
    >
      hello@apawfectplace.com.au
    </Text>
  );
};
