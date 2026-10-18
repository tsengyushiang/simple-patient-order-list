import { initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

let faroInstance = null;

function initFaro() {
  if (faroInstance) return faroInstance;

  try {
    faroInstance = initializeFaro({
      url: 'http://localhost:12347/collect',
      apiKey: 'my_super_app_key',
      app: {
        name: 'my-app',
        version: '1.0.0',
        environment: 'development',
      },
      instrumentations: [new TracingInstrumentation()],
    });
  } catch (err) {
    console.error('[faro] initialization failed:', err);
    faroInstance = null;
  }

  faroInstance.api.setUser({
    id: 'dev-123',
  });

  return faroInstance;
}

function getFaro() {
  return faroInstance ?? initFaro();
}

export function pushEvent(name, attributes) {
  getFaro()?.api.pushEvent(name, attributes);
}