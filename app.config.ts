import { ExpoConfig, ConfigContext } from "expo/config";

import { Env } from "./env";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  slug: "atlastripapp",
  version: Env.VERSION.toString(),
  orientation: "portrait",
  icon: `./assets/icon.${Env.APP_ENV}.png`,
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "cover",
    backgroundColor: "#F75469",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
  },
  android: {
    package: Env.PACKAGE,
  },
  plugins: [
    [
      "@bacons/link-assets",
      [
        "./assets/fonts/TTInterfaces-Bold.otf",
        "./assets/fonts/TTInterfaces-Bold.otf",
        "./assets/fonts/TTInterfaces-Medium.otf",
        "./assets/fonts/TTInterfaces-DemiBold.otf",
        "./assets/fonts/TTInterfaces-Regular.otf",
      ],
    ],
    "expo-localization",
  ],
});
