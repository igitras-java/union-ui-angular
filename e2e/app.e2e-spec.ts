import { GmanagerUiPage } from './app.po';

describe('gmanager-ui App', () => {
  let page: GmanagerUiPage;

  beforeEach(() => {
    page = new GmanagerUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
