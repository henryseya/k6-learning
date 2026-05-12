import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },   // Subir a 5 usuarios en 10s
    { duration: '20s', target: 5 },   // Mantener 5 usuarios por 20s
    { duration: '10s', target: 0 },   // Bajar a 0 usuarios en 10s
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% de requests < 500ms
    http_req_failed: ['rate<0.01'],    // menos del 1% de fallos
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  check(res, {
    'status es 200': (r) => r.status === 200,
    'tiempo de respuesta OK': (r) => r.timings.duration < 500,
  });

  sleep(1);
}