module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%":{
            "opacity": 0,
            "transform": "translateY(-15px)"
          },
          '100%':{
            "opacity": 1,
            "transform": "translateY(0)"
          }

        }
      },
      animation: {
        'fadeIn':'fadeIn 0.5s cubic-bezier(.1,.52,.92,1.04)'
      }
    },
  },
  plugins: [],
};
