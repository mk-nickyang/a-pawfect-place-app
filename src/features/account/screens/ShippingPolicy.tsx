import { ScrollView } from 'react-native';

import { Box } from '@/components/Box';
import { Link, EmailLink } from '@/components/Link';
import { Text } from '@/components/Text';

export const ShippingPolicy = () => {
  return (
    <ScrollView>
      <Box backgroundColor="mainBackground" px="m" py="l" g="m">
        <Text variant="body1">
          Free shipping on orders over $50. Please do take into consideration
          that any discount applied to your order at checkout will affect your
          basket total. For orders less than $50, delivery will cost $10.
        </Text>

        <Text variant="body1">
          Express shipping is also available with $5 extra.
        </Text>

        <Text variant="body1">
          All the products will be shipped via Australia Post. You will receive
          an email with the tracking number and details as soon as your order is
          dispatched.
        </Text>

        <Text variant="body1">
          Once your order has been received, we will endeavour to ship it within
          1-2 business days. Orders placed on Friday, or on the weekend, will be
          shipped on the following Monday. Business days include Monday-Friday
          only.
        </Text>

        <Text variant="body1">
          For more information about delivery time, please see{' '}
          <Link url="https://auspost.com.au/parcels-mail/calculate-postage-delivery-times/" />
          .
        </Text>

        <Text variant="body1" pb="m">
          Shipping fees are non-refundable. If the package is returned
          non-deliverable, we will refund net price of your item(s) minus the
          shipping fees. If another shipping is requested, the shipping costs
          are to be paid by the customer.
        </Text>

        <Text variant="h2">International Shipping</Text>

        <Text variant="body1">
          We offer a flat-rate standard shipping service to countries below
        </Text>

        <Text variant="body1">
          <Text variant="h3">Oceania ($15)</Text>: New Zealand
        </Text>

        <Text variant="body1">
          <Text variant="h3">Asia ($20)</Text>: Hong Kong SAR, India, Indonesia,
          Japan, Macao SAR, Malaysia, Philippines, Singapore, South Korea,
          Taiwan, Thailand, Vietnam
        </Text>

        <Text variant="body1">
          <Text variant="h3">North America ($30)</Text>: United States, Canada
        </Text>

        <Text variant="body1">
          <Text variant="h3">Europe ($30)</Text>: Austria, Belgium, Bulgaria,
          Croatia, Czechia, Denmark, Finland, France, Germany, Greece, Hungary,
          Iceland, Ireland, Italy, Malta, Monaco, Montenegro, Netherlands,
          Norway, Poland, Portugal, Romania, Serbia, Slovakia, Slovenia, Spain,
          Sweden, Switzerland, United Kingdom
        </Text>

        <Text variant="body1">
          If your country or region is not listed above, please email us at{' '}
          <EmailLink subject="International Shipping Enquiry" /> with your order
          items and shipping address, and we will be in contact to discuss
          options.
        </Text>
      </Box>
    </ScrollView>
  );
};
