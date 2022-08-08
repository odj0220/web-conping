import YouTubeNotifier from 'youtube-notification';


const HUB_URL = 'https://conping-yqoln5urha-an.a.run.app';
const CHANNEL_ID = 'UCgRlZMnDIpNOgqplQ374wbQ';

export const notifier = new YouTubeNotifier({
  hubCallback: `${HUB_URL}/youtube`,
  port: 6050,
});

export const youtubeSubscribeServer = (server) => {
  console.log(server.middlewares.use);
  notifier.setup();
  //server.use(notifier.listener);
  console.log('youtube Server init');

  notifier.subscribe(CHANNEL_ID);
  notifier.on('subscribe', data => {
    console.log('Subscribed');
    console.log(data);
  });
  notifier.on('notified', data => {
    console.log('New Video');
    console.log(data);
  });
};
