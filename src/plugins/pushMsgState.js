import eventBus from './eventBus';

export default function (response, title = '更新') {
  if (response.success) {
    eventBus.emit('push-message', {
      style: 'success',
      title: `${title}成功`,
    });
    return;
  }
  const message = typeof response.message === 'string' ? [response.message] : response.message;
  eventBus.emit('push-message', {
    style: 'danger',
    title: `${title}失敗`,
    content: message.join('、'),
  });
}
