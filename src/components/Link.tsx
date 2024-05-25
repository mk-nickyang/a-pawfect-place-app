import * as Linking from 'expo-linking';
import * as MailComposer from 'expo-mail-composer';
import { openBrowserAsync } from 'expo-web-browser';

import { Text } from '@/components/Text';
import { SHOP } from '@/config';

type Props = {
  text: string;
  type: 'browser' | 'deeplink' | 'email';
  deeplinkUrl?: string;
  subject?: string;
};

const composeEmail = async (emailAddress: string, subject?: string) => {
  try {
    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      await MailComposer.composeAsync({
        subject,
        recipients: [emailAddress],
      });
    } else {
      await Linking.openURL(`mailto:${emailAddress}`);
    }
  } catch {
    // Do nothing
  }
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
        composeEmail(text, subject);
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
  <Link type="email" text={SHOP.email} subject={subject} />
);

export const SMSLink = () => (
  <Link type="deeplink" text="0404 632 673" deeplinkUrl="sms:+61404632673" />
);
