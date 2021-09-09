import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
const resolveFixup = {
  name: 'resolve-fixup',
  setup(build) {
    build.onResolve({ filter: / react-virtualized / }, async args => {
      return {
        path: path.resolve('./node_modules/react-virtualized/dist/umd/react-virtualized.js'),
      }
    })
  },
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  //配置跨域
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  //配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'api': path.resolve(__dirname, 'src/api')
    }
  },
  //配置less与cssmodule
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        //支持内联javascript
        javascriptEnabled: true
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [resolveFixup]
    }
  }
})
