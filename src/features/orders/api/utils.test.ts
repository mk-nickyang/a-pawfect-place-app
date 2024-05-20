import { getOrderStatus } from './utils';

describe('getOrderStatus', () => {
  test('IF no `fulfillments` or `refunds` data found, return `CONFIRMED` status', () => {
    expect(getOrderStatus({ processedAt: '2021-01-03T08:15:17Z' })).toEqual({
      status: 'CONFIRMED',
      updatedAt: '2021-01-03T08:15:17Z',
    });
  });

  test('IF `fulfillments` data exists, but no tracking info, return `CONFIRMED` status', () => {
    expect(
      getOrderStatus({
        processedAt: '2021-01-03T08:15:17Z',
        fulfillments: {
          edges: [
            {
              node: {
                id: '',
                createdAt: '',
                latestShipmentStatus: 'CONFIRMED',
                trackingInformation: [],
              },
            },
          ],
        },
      }),
    ).toEqual({
      status: 'CONFIRMED',
      updatedAt: '2021-01-03T08:15:17Z',
    });
  });

  test('IF `fulfillments` tracking info exists, return `SHIPPED` status', () => {
    expect(
      getOrderStatus({
        processedAt: '2021-01-03T08:15:17Z',
        fulfillments: {
          edges: [
            {
              node: {
                id: '',
                createdAt: '2022-01-03T08:15:17Z',
                latestShipmentStatus: 'CONFIRMED',
                trackingInformation: [
                  {
                    url: 'https://auspost.com.au/mypost/track/#/details/123',
                    company: '',
                    number: '',
                  },
                ],
              },
            },
          ],
        },
      }),
    ).toEqual({
      status: 'SHIPPED',
      updatedAt: '2022-01-03T08:15:17Z',
    });
  });

  test('IF refund data exists and total order price is "0", return `REFUNDED` status', () => {
    expect(
      getOrderStatus({
        processedAt: '2021-01-03T08:15:17Z',
        refunds: [
          {
            id: '',
            createdAt: '2022-01-03T08:15:17Z',
            totalRefunded: { amount: '12', currencyCode: 'AUD' },
          },
        ],
        totalPrice: { amount: '0', currencyCode: 'AUD' },
      }),
    ).toEqual({
      status: 'REFUNDED',
      updatedAt: '2022-01-03T08:15:17Z',
    });
  });

  test('IF refund data exists, but total order price is NOT "0", still return `CONFIRMED` status because it is only partially refunded', () => {
    expect(
      getOrderStatus({
        processedAt: '2021-01-03T08:15:17Z',
        refunds: [
          {
            id: '',
            createdAt: '2022-01-03T08:15:17Z',
            totalRefunded: { amount: '12', currencyCode: 'AUD' },
          },
        ],
        totalPrice: { amount: '2', currencyCode: 'AUD' },
      }),
    ).toEqual({
      status: 'CONFIRMED',
      updatedAt: '2021-01-03T08:15:17Z',
    });
  });
});
