const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

// 启用 CORS，允许所有源访问
app.use(cors());

// 创建代理服务器实例
const proxy = httpProxy.createProxyServer({
  target: 'http://111.229.32.52:7861', // 目标服务器的地址
  changeOrigin: true, // 修改请求头中的 "Host" 值为目标服务器的地址
});

// 使用代理服务器来处理所有请求
app.use('/', (req, res) => {
  proxy.web(req, res);
});

app.listen(port, () => {
  console.log(`代理服器运行在 ${port} 端口`);
});
