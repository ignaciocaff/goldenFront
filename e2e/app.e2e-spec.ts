import { GoldenPage } from './app.po';

describe('golden App', () => {
  let page: GoldenPage;

  beforeEach(() => {
    page = new GoldenPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
