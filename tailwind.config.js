/** @type {import('tailwindcss').Config} */
export default {
  //darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],  
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Nunito Sans', 'serif'],
      },
      colors: {
        // Primary
        darker: '#3568D4',
        mainColor: '#3E7BFA',
        lighter: '#6698FA',
        subtle: '#CCDDFF',
        //Dark
        dark0: '#1C1C28', 
        dark1: '#292A3B',
        dark2: '#3A3B47',
        dark3: '#7E7F93',
        dark4: '#C7C9D9',
        //Light
        light0: '#E4E4EB',
        light1: '#EBEBF0',
        light2: '#F2F2F5',
        light3: '#FAFAFC',
        light4: '#FFFFFF',
        // Red
        red0: '#E53535',
        red1: '#FF3B3B',
        red2: '#FF5C5C',
        red3: '#FF8080',
        red4: '#FFE5E5',
        //Green
        green0: '#05A660',
        green1: '#0BB169',
        green2: '#39D98A',
        green3: '#57EBA1',
        green4: '#E3FFF1',
        //Yellow
        yellow0: '#E5B800',
        yellow1: '#FFCC00',
        yellow2: '#FDDD48',
        yellow3: '#EFE06E',
        yellow4: '#FAF9E1',
        //Orange:
        orange0: '#E57A00',
        orange1: '#FF8800',
        orange2: '#FDAC42',
        orange3: '#E2B86D',
        orange4: '#FFF8E5',
        //Teal
        teal0: '#00B7C4',
        teal1: '#00CFDE',
        teal2: '#6FD4DC',
        teal3: '#A9EFF2',
        teal4: '#E5FFFF'
        // primary: '#FF9315',
        // white: '#ffffff',
        // grey: {
        //   dark: '#605a5a',
        //   light: '#ADA7A0',
        // },
        // bg: {
        //   dark: '#16212C',
        //   light: '#FCFCFC',
        // },
        // red: {
        //   DEFAULT: '#EF5950',
        // },
        // green: {
        //   DEFAULT: '#7ACB9A',
        // },
        // orange: {
        //   light: '#FFF3E4',
        // },
        // secondary: "#6F49FD",
        // text1: "#171725",
        // text2: "#4B5264",
        // text3: "#808191",
        // text4: "#B2B3BD",
        // "icon-color": "#A2A2A8",
        // whiteSoft: "#FCFBFF",
        // graySoft: "#FCFCFC",
        // grayf3: "#f3f3f3",
        // strock: "#F1F1F3",
        // lite: "#FCFCFD",
        // error: "#EB5757",
        // darkbg: "#13131A",
        // darkSecondary: "#1C1C24",
        // softDark: "#22222C",
        // darkSoft: "#24242C",
        // darkStroke: "#3A3A43",
        // darkRed: "#422C32",
      },
      boxShadow: {
        sdprimary: "10px 10px 20px rgba(211, 211, 211, 0.25)",
      },
      screens: {
        'custom200': '200px'
      }
    },
  },
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },

  plugins: [],
}
