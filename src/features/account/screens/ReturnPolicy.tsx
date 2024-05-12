import { ArticleScreenContainer } from '@/components/ArticleScreenContainer';
import { Box } from '@/components/Box';
import { EmailLink } from '@/components/Link';
import { Text } from '@/components/Text';

export const ReturnPolicy = () => {
  return (
    <ArticleScreenContainer>
      <Text variant="body1">
        Your satisfaction is important to us, if you have a concern about the
        quality of your product please contact us at{' '}
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

      <Box g="s">
        <Text variant="h3">Damages and issues</Text>
        <Text variant="body1">
          Please inspect your order upon reception and contact us immediately if
          the item is defective, damaged or if you receive the wrong item, so
          that we can evaluate the issue and make it right.
        </Text>
      </Box>

      <Box g="s">
        <Text variant="h3">Exceptions / non-returnable items</Text>
        <Text variant="body1">
          - We do not accept product returns if you have changed your mind
        </Text>
        <Text variant="body1">
          - We do not accept product returns if the item is marked as
          &apos;Sale&apos;.
        </Text>
        <Text variant="body1">
          - Medical Recovery E-collar is not returnable due to health
          considerations
        </Text>
      </Box>

      <Box g="s">
        <Text variant="h3">Exchanges</Text>
        <Text variant="body1">
          Unfortunately, we are unable to exchange items. The fastest way to
          ensure you get what you want is to return the item you have, and once
          the return is accepted, make a separate purchase for the new item.
        </Text>
      </Box>

      <Box g="s">
        <Text variant="h3">Refunds</Text>
        <Text variant="body1">
          We will notify you once we’ve received and inspected your return, and
          let you know if the refund was approved or not. If approved, you’ll be
          automatically refunded on your original payment method. Please
          remember it can take some time for your bank or credit card company to
          process and post the refund too.
        </Text>
      </Box>
    </ArticleScreenContainer>
  );
};
