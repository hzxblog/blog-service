export default {
  // 端口号
  port: 7000,
  // 域名
  host: 'http://localhost:7000',
  // mongodb接口
  mongoose: 'mongodb://mongo:27017/blog',
  // 初始化密码和帐号
  DEFAULT_USERNAME: 'hanzhixiong',
  DEFAULT_PASSWORD: '123456',
  // 密码的密匙
  PASSWORD_KEY: 'secretKey',
  // 签名的密匙
  SIGN_KEY: 'hanzhixiong',
  // token有效时间
  SIGN_EXPIRES_IN: 60 * 60 * 24,
  // 静态资源路劲
  STATIC_PATH: 'static',
  // 上转图片路径
  UPLOAD_PATH: 'static/uploads',
};
