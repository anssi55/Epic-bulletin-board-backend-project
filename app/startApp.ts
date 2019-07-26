import { configcontainer } from './dic';
import App from './App';
import validateEnvVariables from './envValidator';

validateEnvVariables()
  .then(function(envVariables) {
    configcontainer(envVariables)
      .then(function(container) {
        container.resolve<App>('app').init();
      })
      .catch(function(errors) {
        console.log('Launch failed: ' + errors);
      });
  })
  .catch(function(errors) {
    console.log(errors);
  });
