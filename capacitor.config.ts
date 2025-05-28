import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cloudsnap.app',
  appName: 'CloudSnap',
  webDir: 'dist',
  server: {
    cleartext: true,
    hostname: 'localhost',
    androidScheme: 'https'
  },
  ios: {
    contentInset: 'always',
    allowsLinkPreview: true
  }
};

export default config; 