import { atob } from 'react-native-quick-base64';

/** @see https://github.com/auth0/jwt-decode?tab=readme-ov-file#polyfilling-atob */
global.atob = atob;
