// this function handles the opacity of color
function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsl(var(${variable}))`;
    }
    return `hsl(var(${variable}) / ${opacityValue})`;
  };
}
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        card: withOpacityValue("--c"),
        title: withOpacityValue("--t"),
      },
      animation: {
        "spin-slow": "spin 3.5s linear infinite",
      },
      boxShadow: {
        'md': '0 3px 3px -2px rgba(0,0,0,0.2),0 3px 4px 0 rgba(0,0,0,0.14),0 1px 8px 0 rgba(0,0,0,0.12)',
        'lg': '0 3px 5px -1px rgba(0,0,0,0.2),0 6px 10px 0 rgba(0,0,0,0.14),0 1px 18px 0 rgba(0,0,0,0.12)',
        'xl': '0 5px 6px -3px rgba(0,0,0,0.2),0 9px 12px 1px rgba(0,0,0,0.14),0 3px 16px 2px rgba(0,0,0,0.12)',
        '3xl': '0 11px 15px -7px rgba(0,0,0,0.2),0 24px 38px 3px rgba(0,0,0,0.14),0 9px 46px 8px rgba(0,0,0,0.12)'
      }
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    darkTheme: "halloween",
    themes: [
      {
        cmyk: {
          ...require("daisyui/src/colors/themes")["[data-theme=cmyk]"],
          info: "#7E57C2",
          "--c": "212 96% 78%",
          "--t": "262 83% 58%",
        },
      },
      {
        halloween: {
          ...require("daisyui/src/colors/themes")["[data-theme=halloween]"],
          info: "#F48A00",
          primary: "#8AB4F8",
          success: "#22c55e",
          "base-300": '#303030',
          "base-100": '#202020',
          "--c": "215 14% 34%",
          "--t": "25 95% 53%",
        },
      },
    ],
  },
};
