import { ScrollView } from 'react-native';

import { Box } from '@/components/Box';
import { EmailLink } from '@/components/Link';
import { Text } from '@/components/Text';

export const ReturnPolicy = () => {
  return (
    <ScrollView>
      <Box backgroundColor="mainBackground" px="m" py="l" g="m">
        <Text variant="body1">
          Your satisfaction is important to us, if you have a concern about the
          quality of your product please contact us at
          <EmailLink subject="Return Request" /> with the order number and the
          reason you are dissatisfied.
        </Text>

        <Text variant="body1">
          To be eligible for a return, your item must be in the same condition
          that you received it, unworn or unused, with tags, and in its original
          packaging. Returns must be sent within 14 days after you received the
          products.
        </Text>

        <Text variant="body1">
          To start a return, you can contact us at{' '}
          <EmailLink subject="Return Request" />. If your return is accepted,
          we’ll send you instructions on how and where to send your package.
          Return shipping costs are to be paid by the customer. We are not
          responsible for any return items lost. Items sent back to us without
          first requesting a return will not be accepted.
        </Text>

        <Box>
          <Text variant="h3">Damages and issues</Text>
          <Text variant="body1">
            Please inspect your order upon reception and contact us immediately
            if the item is defective, damaged or if you receive the wrong item,
            so that we can evaluate the issue and make it right.
          </Text>
        </Box>
      </Box>
    </ScrollView>
  );
};
