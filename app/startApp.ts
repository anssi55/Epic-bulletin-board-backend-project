import { configcontainer } from './Dic';
import App from './App';
import { AwilixContainer } from 'awilix';

configcontainer()
  .then(function(container) {
    container.resolve<App>('app').init();
  })
  .catch(function() {
    console.log('fail');
  });
