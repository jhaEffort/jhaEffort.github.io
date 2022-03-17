# vue-config

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


 ## ERROR  TypeError: Cannot read property 'tapPromise' of undefined
    先执行卸载命令->npm uninstall compression-webpack-plugin
    执行安装命令->npm i compression-webpack-plugin@5.0.1

 ##  error  in ./src/assets/images/1.jpg  Syntax Error: Error: write EOF
    使用cnpm 下载  cnpm install image-webpack-loader --save-dev
    npm 下载不下来

## Syntax Error: Error: Cannot find module 'gifsicle'
## error in ./src/assets/images/logo.png报错
    ```
        `` image-webpack-loader版本低的原因
        还是重新下载 image-webpack-loader
    ```