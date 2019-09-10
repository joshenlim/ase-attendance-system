module.exports = {
  pages: {
    index: {
      entry: 'src/main.js', //entry for the public page
      template: 'public/index.html', // source template
      filename: 'index.html' // output as dist/*
    },
    worker: {
      entry: 'src/worker.js',
      template: 'public/worker.html',
      filename: 'worker.html'
    }
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
        { from: /\/worker/, to: '/worker.html' }
      ]
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Attendance System",
        appId: "com.acme.attendanceSystem",
        mac: {
          icon: 'src/assets/app.ico'
        },
        win: {
          icon: 'src/assets/app.ico',
          target: [
            {
              target: 'portable',
              arch: ['x64']
            }
          ]
        }
      }
    }
  }
}