export const CONFIG_SCHEMA = {
  port: {
    doc: 'The application port.',
    format: 'port',
    default: '3000',
    env: 'NODE_PORT',
  },
};
