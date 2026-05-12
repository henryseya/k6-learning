import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 1,        // usuarios virtuales
  duration: '10s', // duración del test
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts/1');

  check(res, {
    'status es 200': (r) => r.status === 200,
    'body no está vacío': (r) => r.body.length > 0,
  });

  sleep(1);
}