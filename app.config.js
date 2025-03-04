export default {
  name: "OctoGod",
  slug: "octogod",
  version: "1.0.0",
  orientation: "landscape",
  icon: "./assets/images/icon.png",
  scheme: "octogod",
  userInterfaceStyle: "dark",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#0c0f1d"
  },
  ios: {
    supportsTablet: true
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#0c0f1d"
    },
    permissions: [
      "INTERNET"
    ],
    package: "com.madcarak.octogod"
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true
  },
  extra: {
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
  }
};