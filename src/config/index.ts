export default {
  // �˿ں�
  port: 7000,
  // ����
  host: 'http://localhost:7000',
  // mongodb�ӿ�
  mongoose: 'mongodb://mongo:27017/blog',
  // ��ʼ��������ʺ�
  DEFAULT_USERNAME: 'hanzhixiong',
  DEFAULT_PASSWORD: '123456',
  // ������ܳ�
  PASSWORD_KEY: 'secretKey',
  // ǩ�����ܳ�
  SIGN_KEY: 'hanzhixiong',
  // token��Чʱ��
  SIGN_EXPIRES_IN: 60 * 60 * 24,
  // ��̬��Դ·��
  STATIC_PATH: 'static',
  // ��תͼƬ·��
  UPLOAD_PATH: 'static/uploads',
};
