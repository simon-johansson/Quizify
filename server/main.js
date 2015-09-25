
import server from './server';
import config from './config/environment/';

import {init as webSocketConfig} from './components/socket';
webSocketConfig(server);

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
