import { ArticleScreenContainer } from '@/components/ArticleScreenContainer';
import { Box } from '@/components/Box';
import { Link, EmailLink, SMSLink } from '@/components/Link';
import { Text } from '@/components/Text';

export const ContactUs = () => {
  return (
    <ArticleScreenContainer>
      <Text variant="body1">
        We&apos;d love to hear from you! Whether you have a question about our
        products, need assistance with an order, or just want to check in on the
        latest in pet care, our team is ready to help. Here&apos;s how you can
        reach us:
      </Text>

      <Box g="s">
        <Text variant="h3">📧 Email Us</Text>
        <Text variant="body1">
          For any inquiries or support, feel free to email us at{' '}
          <EmailLink subject="General Enquiry" />. We strive to respond to all
          emails within 24 hours.
        </Text>
      </Box>

      <Box g="s">
        <Text variant="h3">📱 Text Message</Text>
        <Text variant="body1">
          Need to send us a quick note or question? You can send a text message
          to <SMSLink />. We are also available on WhatsApp for your
          convenience. Please remember, we prefer text messages over calls.
        </Text>
      </Box>

      <Box g="s">
        <Text variant="h3">📬 Follow Us</Text>
        <Text variant="body1">
          Don&apos;t miss out on any updates! Follow us on{' '}
          <Link
            text="Instagram"
            type="deeplink"
            deeplinkUrl="https://www.instagram.com/apawfectplace/"
          />{' '}
          and{' '}
          <Link
            text="Facebook"
            type="deeplink"
            deeplinkUrl="https://www.facebook.com/apawfectplace/"
          />{' '}
          to stay connected with our community and get the latest on pet care
          tips, new products, and exclusive offers.
        </Text>
      </Box>

      <Text variant="body1">
        We are here to ensure you and your pet have a pawfect experience with
        us!
      </Text>
    </ArticleScreenContainer>
  );
};
