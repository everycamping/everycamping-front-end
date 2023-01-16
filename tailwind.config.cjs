/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '700px': '700px',
      },
      maxHeight: {
        '700px': '700px',
      },
      minHeight: {
        '40px' : '40px',
      },
      maxWidth: {
        '310px': '310px',
        'cartDiv' : '800px'
      },
      minWidth: {
        '74px': '74px',
        '100px' : '100px'
      }
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['garden'],
  },
};
