import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
    vus: 10,
    duration: '30s',
};

// export const options = {
//     stages: [
//         { duration: '30s', target: 20 },
//         { duration: '1m30s', target: 10 },
//         { duration: '20s', target: 0 },
//     ],
// };

export default function () {
    const res = http.get('http://localhost:9000/order-payments/hello');
    check(res, { 'status was 200': (r) => r.status === 200 });
    sleep(1);

    const url = 'http://localhost:9000/order-payments/hello';
    const payload = JSON.stringify({
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer xxx'
        },
    };

    http.post(url, payload, params);
}

export function handleSummary(data) {
    return {
        "result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}