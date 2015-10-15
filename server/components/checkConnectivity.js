
import {lookup} from 'dns';

export default function checkInternet() {
  return new Promise( (resolve, reject) => {
    lookup('google.com', err => {
      if (err && err.code == 'ENOTFOUND') {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
