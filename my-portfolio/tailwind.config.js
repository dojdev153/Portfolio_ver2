const { describe } = require('node:test');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
  	extend: {
      colors:{
            border: "rgb(var(--border) / <alpha-value>)",
            input: "rgb(var(--input) / <alpha-value>)",
            ring: "rgb(var(--ring) / <alpha-value>)",
            background: "rgb(var(--background) / <alpha-value>)",
            foreground: "rgb(var(--foreground) /  <alpha-value>)",
            primary: {
              DEFAULT: "rgb(var(--primary) / <alpha-value>)",
              foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
            },
            secondary: {
              DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
              foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
            },
            destructive: {
              DEFAULT: "rgb(var(--desctructive) / <alpha-value>)",
              foreground: "rgb(var(--desctructive-foreground) / <alpha-value>)",
            },
            muted:{
              DEFAULT: "rgb(var(--accent) / <alpha-value>)",
              foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
            },
            accent:{
              DEFAULT: "rgb(var(--accent) / <alpha-value>)",
              foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
            },
            card: {
              DEFAULT: "rgb(var(--card) / <alpha-value>)",
              foreground: "rgb(var(--card-foreground) / <alpha-value>)"
            },
            "cyber-blue": "rgb(0 217 255 / <alpha-value>)",
            "cyber-purple": "rgb(184 71 255 / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily:{
        tech: ["Orbitron", "Rajdhani", "system-ui", "ui-sans-serif", "sans-serif"],
        sans: ["Rajdhani", "ui-sans-serif", "system-ui", "sans-serif"],
      },
  		container: {
  			center: true,
  			padding: '2rem',
  			screens: {
  				'2xl': '1400px'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  	},
  },
  plugins: [require("tailwindcss-animate")],
}
