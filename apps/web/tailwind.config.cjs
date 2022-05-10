const defaultTheme = require('tailwindcss/defaultTheme')

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: ["src/**/*.{html,js,svelte,ts}"],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      borderWidth: {
        section: '1px'
      },
      colors: {
        accent1: {
          DEFAULT: withOpacityValue('--c-accent-1'),
          less: withOpacityValue('--c-accent-1--less'),
          lesser: withOpacityValue('--c-accent-1--lesser'),
        },
        accent2: {
          DEFAULT: withOpacityValue('--c-accent-2'),
        },
        background: {
          DEFAULT: withOpacityValue('--c-background'),
          less: withOpacityValue('--c-background--less'),
          lesser: withOpacityValue('--c-background--lesser'),
        },
        primary: {
          DEFAULT: withOpacityValue('--c-primary'),
          less: withOpacityValue('--c-primary--less'),
          lesser: withOpacityValue('--c-primary--lesser'),
        },
        ui: {
          error: {
            bg: `var(--c-ui-error--bg)`,
            DEFAULT: `var(--c-ui-error)`,
          },
          info: {
            bg: `var(--c-ui-info--bg)`,
            DEFAULT: `var(--c-ui-info)`,
          },
          success: {
            bg: `var(--c-ui-success--bg)`,
            DEFAULT: `var(--c-ui-success)`,
          },
          warn: {
            bg: `var(--c-ui-warn--bg)`,
            DEFAULT: `var(--c-ui-warn)`,
          },
        },
      },
      fontFamily: {
        // 'sans': ['Manrope', ...defaultTheme.fontFamily.sans]
        'sans': ['primary-family', ...defaultTheme.fontFamily.sans]
      },

      maxWidth: {
        container: `var(--l-max-content-width)`,
        'container-narrow': `var(--l-max-content-width--narrow)`,
      },
      minHeight: {
        screenMinusHeader: `var(--l-screen-minus-header)`,
      },
      spacing: {
        contentPadding: 'var(--l-content-padding)',
        sitegap: '32px', // TODO: remove?
        header: 'var(--l-header-height)',
        headerDouble: 'calc(var(--l-header-height) * 2)',
        sitepad: '2rem', // TODO: remove?
        sitebottom: '8rem', // TODO: remove?
      },
      zIndex: {
        headerPrimary: 6000,
        headerSecondary: 5999,
        headerTertiary: 5000,
        overlay: 8000,
        modal: 9000,
      },
      typography: {
        'DEFAULT': {
          css: {
            video: {
              marginTop: '0',
              marginBottom: '0'
            }
          }
        }
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
