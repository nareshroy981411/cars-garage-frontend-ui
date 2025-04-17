/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cardBg: '#424242',
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'arial'],
      },
  
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'fix-jwt-decode-default',
          setup(build) {
            build.onResolve({ filter: /^jwt-decode$/ }, (args) => {
              return { path: args.path, namespace: 'jwt-decode' };
            });
            build.onLoad({ filter: /.*/, namespace: 'jwt-decode' }, async () => {
              return {
                contents: `
                  import * as jwt from "jwt-decode";
                  export default jwt;
                `,
                loader: 'js',
              };
            });
          },
        },
      ],
    },
  },
  
}