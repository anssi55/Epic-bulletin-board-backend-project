import { configcontainer } from './dic';
import { App } from './app';

configcontainer()
  .then(function(container) {
    container.resolve<App>('app').init();
  })
  .catch(function() {
    console.log('fail');
  });
