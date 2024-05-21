# A Pawfect Place App

A Pawfect Place is a React Native Expo app designed to provide a mobile shopping experience for my Shopify store - https://apawfectplace.com.au/.

Download it from stores: [App Store](https://apps.apple.com/au/app/a-pawfect-place/id6479609584), Google Play (under review).

## Featured API and packages

- Products listing with [Shopify Storefront API](https://shopify.dev/docs/api/storefront)
- Passwordless login with [Shopify Customer Account API](https://shopify.dev/docs/api/customer)
- Products reviews with [Judge.me API](https://judge.me/api/docs)
- Checkout with [@shopify/checkout-sheet-kit](https://github.com/Shopify/checkout-sheet-kit-react-native)
- List component with [@shopify/flash-list](https://github.com/Shopify/flash-list)
- Dark Mode and Styling with [@shopify/restyle](https://github.com/Shopify/restyle)
- Server State with [@tanstack/react-query](https://github.com/tanstack/query)
- Client State with [zustand](https://github.com/pmndrs/zustand)
- Persistent Storage with [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)

## Get started

#### Set up Expo environment

https://docs.expo.dev/get-started/set-up-your-environment/

#### Set up `.env`

```
EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN=
EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID=
EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_AUTH_REDIRECT_URL=
EXPO_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
```

- `EXPO_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN`

Used to make requests for Storefront API. Accessible from Shopify [Headless](https://apps.shopify.com/headless) app OR a [Custom app](https://help.shopify.com/en/manual/apps/app-types/custom-apps).

- `EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID`

Used to setup Customer Account API. Accessible from [Headless](https://apps.shopify.com/headless) app - Customer Account API.

NOTE: Make sure the [new customer account experience](https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/getting-started) is enabled in Shopify

- `EXPO_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_AUTH_REDIRECT_URL`

The same URL in [Headless](https://apps.shopify.com/headless) - Customer Account API - Application setup - Callback URI(s).

In my case, since Shopify only allows `https` OAuth callback url (universal link like `apawfectplace://` is not allowed), so I created an intermediary web page to handle the redirection (like the idea [here](https://docs.expo.dev/guides/deep-linking/#when-to-not-use-deep-links)).

When Shopify does support deeplink as the callback url in the future, we can possibly utilize the expo-auth-session library to handle OAuth flow more seamlessly. (see more in https://docs.expo.dev/guides/authentication/)

- `EXPO_PUBLIC_SENTRY_DSN` Ignore if Sentry is not used
- `SENTRY_AUTH_TOKEN` Ignore if Sentry is not used

#### Run the dev app

Install dependencies and prebuild

```
yarn && yarn prebuild
```

iOS

```
yarn ios
```

Android

```
yarn android
```

## Build & Deploy

I use `eas build` & `eas submit` locally for now, but planning to move it onto Github Actions in the near future.
