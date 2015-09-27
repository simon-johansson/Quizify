
import ip from 'my-local-ip';

export default {
  url: `http://${ip()}:${process.env.PORT || 9000}`,
  clientDir: 'client'
};
