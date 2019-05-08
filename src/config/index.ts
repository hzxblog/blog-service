export default {
  // 端口号
  port: 7000,
  // mongodb接口
  mongoose: 'mongodb://localhost:27017/blog',
  // 初始化密码和帐号
  DEFAULT_USERNAME: 'hanzhixiong',
  DEFAULT_PASSWORD: '123456',
  // 密码的密匙
  PASSWORD_KEY: 'secretKey',
  // 签名的密匙
  SIGN_KEY: 'hanzhixiong',
  SIGN_EXPIRES_IN: 60 * 60 * 24,
};
