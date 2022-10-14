const path = require('path');
module.exports = {
    //关闭语法检测功能
    lintOnSave:false,
    //开发服务器相关配置
    devServer:{
        //静态资源目录
        contentBase: path.join(__dirname, 'public'),
        //配置开发服务端口
        port: 8080,
    },
    //配置webpack相关
    configureWebpack:{
        //解析
        resolve:{
            //配置路径别名
            alias:{
                '@v':path.resolve(__dirname, '../src/views'),
                '@c':path.resolve(__dirname, '../src/components'),
            }
        }
    },

}