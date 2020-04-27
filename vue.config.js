module.exports = {
    chainWebpack: (config) => {
        const svgRule = config.module.rule('svg');
     
        svgRule.uses.clear();
     
        svgRule
          .use('babel-loader')
          .loader('babel-loader')
          .end()
          .use('vue-svg-loader')
          .loader('vue-svg-loader');
    },
    pluginOptions: {
        electronBuilder: {
            builderOptions: {
                "appId": "com.example.app",  //ID 不用解释吧?
                "productName":"APP",//项目名，也是生成的安装文件名，即aDemo.exe
                "copyright":"Copyright © 2019",//版权信息
                "directories":{
                    "output":"./dist"//打包后的输出文件路径
                },
                "win":{//win相关配置
                    "icon":"./favicon.ico",//图标，当前图标在根目录下，注意这里有个坑
                    "target": [
                        {
                            "target": "nsis",//利用nsis制作安装程序
                            "arch": [
                                "x64"//64位
                            ]
                        }
                    ],
                    "extraResources": "./screen/PrScrn.dll"
                },
                "nsis": {
                    "oneClick": false, // 是否一键安装
                    "allowElevation": true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
                    "allowToChangeInstallationDirectory": true, // 允许修改安装目录
                    "installerIcon": "./favicon.ico",// 安装图标
                    "uninstallerIcon": "./favicon.ico",//卸载图标
                    "installerHeaderIcon": "./favicon.ico", // 安装时头部图标
                    "createDesktopShortcut": true, // 创建桌面图标
                    "createStartMenuShortcut": true,// 创建开始菜单图标
                    "shortcutName": "叮咚即聊", // 图标名称(也就是应用创建后的桌面快捷方式名称)
                },
                
                extraResources: [
                            {
                                from: "./screen/PrintScr.exe", // 文件源路径
                                to: "./screen/PrintScr.exe" // 打包后要放的路径
                            },
                            {
                                from: "./screen/PrScrn.dll",
                                to: "./screen/PrScrn.dll"
                            }
                        ]
                }
        }
        
    }
}
