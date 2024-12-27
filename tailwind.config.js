
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // مسیر فایل‌های پروژه
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors:{
        primaryBlue:'#98ccfd',
        secondryBlue:'#dff0fe',
        Subtitle:'#88a2bd',
        greenBG : '#bbf7d0',
        greenTxt : '#549c6e',
        redBg:'#fecaca',
        redTxt : '#dc2626',
        primaryDark: '#1E1E2E', 
        cardDark: '#252436',   
        borderDark: '#2A2A3C', 

      }
    },
  },
  plugins: [
  ],
}
