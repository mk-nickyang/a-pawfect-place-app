import * as Linking from 'expo-linking';
import * as MailComposer from 'expo-mail-composer';
import { openBrowserAsync } from 'expo-web-browser';

import { Text } from '@/components/Text';

type Props = {
  text: string;
  type: 'browser' | 'deeplink' | 'email';
  deeplinkUrl?: string;
  subject?: string;
};

export const Link = ({ text, type, deeplinkUrl, subject }: Props) => {
  const onLinkPress = () => {
    switch (type) {
      case 'browser':
        openBrowserAsync(text);
        break;
      case 'deeplink':
        Linking.openURL(deeplinkUrl || text);
        break;
      case 'email':
        MailComposer.composeAsync({
          subject,
          recipients: [text],
        });
        break;
      default:
        break;
    }
  };

  return (
    <Text variant="body1" textDecorationLine="underline" onPress={onLinkPress}>
      {text}
    </Text>
  );
};

type EmailLinkProps = { subject: string };

export const EmailLink = ({ subject }: EmailLinkProps) => (
  <Link type="email" text="hello@apawfectplace.com.au" subject={subject} />
);

export const SMSLink = () => (
  <Link type="deeplink" text="0404 632 673" deeplinkUrl="sms:+61404632673" />
);
