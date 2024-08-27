import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "3xl": "1920px",
      },
    },
    extend: {
      backgroundImage: {
        girlHair: 'url("/6.PNG")',
        girlHair2: 'url("/11.PNG")',
        formBG: 'url("/formBG.PNG")',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        colors: {
          "rich-black-fogra-39_50": "hsla(0, 0%, 5%, 0.5)",
          "rich-black-fogra-39": "hsl(0, 0%, 5%)",
          "indian-yellow_10": "hsla(36, 61%, 58%, 0.1)",
          "indian-yellow": "hsl(36, 61%, 58%)",
          "harvest-gold": "hsl(36, 66%, 53%)",
          "eerie-black-1": "hsl(0, 0%, 14%)",
          "eerie-black-2": "hsl(0, 0%, 12%)",
          "eerie-black-2_85": "hsla(0, 0%, 12%, 0.85)",
          "eerie-black-3": "hsl(0, 0%, 8%)",
          "sonic-silver": "hsl(0, 0%, 44%)",
          "davys-gray": "hsl(210, 9%, 31%)",
          "light-gray": "hsl(0, 0%, 80%)",
          platinum: "hsl(0, 0%, 91%)",
          black_30: "hsla(0, 0%, 0%, 0.3)",
          white_10: "hsla(0, 0%, 100%, 0.1)",
          white_30: "hsla(0, 0%, 100%, 0.3)",
          white_50: "hsla(0, 0%, 100%, 0.5)",
          white: "hsl(0, 0%, 100%)",
          jet: "hsl(0, 0%, 21%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
