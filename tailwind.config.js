/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
				main: '#bd52eb',
				overlay: 'rgba(0,0,0,0.8)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
				bg: '#e3dff2',
      	text: '#000',
      	border: '#000',
				darkBg: '#1D1F27',
      	darkText: '#eeefe9',
      	darkBorder: '#000',
      	secondaryBlack: '#1b1b1b',
				borderRadius: {
					base: '5px'
				},
				borderRadius: {
					base: '5px'
				},
				boxShadow: {
					light: '4px 4px 0px 0px #000',
					dark: '4px 4px 0px 0px #000',
				},
				translate: {
					boxShadowX: '4px',
					boxShadowY: '4px',
					reverseBoxShadowX: '-4px',
					reverseBoxShadowY: '-4px',
				},
				fontWeight: {
					base: '500',
					heading: '700',
				},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

