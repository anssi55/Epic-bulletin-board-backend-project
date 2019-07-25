import { configcontainer } from './dic';
import App from './App';
import validateEnvVariables from './middleware/EnvValidator';

validateEnvVariables();

configcontainer()
  .then(function(container) {
    container.resolve<App>('app').init();
  })
  .catch(function() {
    console.log('fail');
  });
