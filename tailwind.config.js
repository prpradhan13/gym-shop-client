/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Monts: ['Montserrat', 'sans-serif'],
      },

      animation:{
        rotate: "rotate4 2s linear infinite",
        dash: "dash 1.5s ease-in-out infinite",
      },

      keyframes:{
        rotate4:{
          "100%": {transform: "rotate(360deg)"}
        },
        dash:{
          "0%": {"stroke-dasharray": "1, 200", "stroke-dashoffset": "0"},
          "50%": {"stroke-dasharray": "90, 200", "stroke-dashoffset": "-35px"},
          "100%": {"stroke-dashoffset": "-125px"}
        },
      },

      variants: {
        extend: {
          backgroundColor: ['hover'],
          textColor: ['hover'],
        }
      }

    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      });
    },
  ],
}

