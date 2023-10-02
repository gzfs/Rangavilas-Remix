import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Montserrat: "Montserrat",
        Veshion: "Veshion",
      },
    },
  },
  plugins: [],
} satisfies Config;
