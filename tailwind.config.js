/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Nunito Sans', 'serif'],
      },
      colors: {
        primary: '#FF9315',
        white: '#ffffff',
        grey: {
          dark: '#605a5a',
          light: '#ADA7A0',
        },
        bg: {
          dark: '#16212C',
          light: '#FCFCFC',
        },
        red: {
          DEFAULT: '#EF5950',
        },
        green: {
          DEFAULT: '#7ACB9A',
        },
        orange: {
          light: '#FFF3E4',
        },
        secondary: "#6F49FD",
        text1: "#171725",
        text2: "#4B5264",
        text3: "#808191",
        text4: "#B2B3BD",
        "icon-color": "#A2A2A8",
        whiteSoft: "#FCFBFF",
        graySoft: "#FCFCFC",
        grayf3: "#f3f3f3",
        strock: "#F1F1F3",
        lite: "#FCFCFD",
        error: "#EB5757",
        darkbg: "#13131A",
        darkSecondary: "#1C1C24",
        softDark: "#22222C",
        darkSoft: "#24242C",
        darkStroke: "#3A3A43",
        darkRed: "#422C32",
      },
      boxShadow: {
        sdprimary: "10px 10px 20px rgba(211, 211, 211, 0.25)",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },

  plugins: [],
}
