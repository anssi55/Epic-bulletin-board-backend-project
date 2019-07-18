import { configcontainer } from './dic';
import App from './App';
import { AwilixContainer } from 'awilix';

configcontainer()
  .then(function(container: AwilixContainer) {
    container.resolve<App>('app').init();
  })
  .catch(function() {
    console.log('fail');
  });
