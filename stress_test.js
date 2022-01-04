import http from 'k6/http';
import { check, sleep } from 'k6';

// const failures = new Rate('failed requests');


export const options = {
  scenarios: {
    reviewApi: {
      executor: 'ramping-vus',
      exec: 'getReview',
      startVUs: 0,
      //Load Testing
      // stages: [
      //   { duration: '5s', target: 20 },
      //   { duration: '10s', target: 20 },
      //   { duration: '5s', target: 0 }
      // ],

      //Stress Testing
      stages: [
        { duration: '2m', target: 100 }, // below normal load
        { duration: '3m', target: 100 },
        { duration: '1m', target: 200 }, // normal load
        { duration: '3m', target: 200 },
        { duration: '1m', target: 300 }, // around the breaking point
        { duration: '3m', target: 400 },
        { duration: '1m', target: 500 }, // beyond the breaking point
        { duration: '3m', target: 400 },
        { duration: '4m', target: 0 }, // scale down. Recovery stage.
      ],
    },
    metaApi: {
      executor: 'ramping-vus',
      exec: 'getMeta',
      startVUs: 0,

      // stages: [
      //   { duration: '5s', target: 100 },
      //   { duration: '10s', target: 100 },
      //   { duration: '5s', target: 0 }
      // ],

      stages: [
        { duration: '2m', target: 100 }, // below normal load
        { duration: '3m', target: 100 },
        { duration: '1m', target: 200 }, // normal load
        { duration: '3m', target: 200 },
        { duration: '1m', target: 300 }, // around the breaking point
        { duration: '3m', target: 400 },
        { duration: '1m', target: 500 }, // beyond the breaking point
        { duration: '3m', target: 400 },
        { duration: '4m', target: 0 }, // scale down. Recovery stage.
      ],
    },
  },

  thresholds: {
    http_req_failed: ['rate<=0.05'],
    load_generator_cpu_percent: ['value<=80'],
    load_generate_memory_used_percent: ['value<=80'],
    http_req_duration: ['p(95)<1500'],
  }
};


export function getReview() {
  let productId = Math.floor(Math.random() * 1000000)

  let res = http.get(`http://localhost:3000/reviews?product_id=${productId}`);
  check(res, {
    'http response status code is 200': r => r.status === 200
  });
  sleep(1);
}


export function getMeta() {
  let productId = Math.floor(Math.random() * 1000000)

  let res = http.get(`http://localhost:3000/reviews/meta?product_id=${productId}`);
  check(res, {
    'http response status code is 200': r => r.status === 200
  });
  sleep(1);
}


















