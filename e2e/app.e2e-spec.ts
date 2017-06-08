import { SpotifyAppPage } from './app.po';

describe('spotify-app App', () => {
  let page: SpotifyAppPage;

  beforeEach(() => {
    page = new SpotifyAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
