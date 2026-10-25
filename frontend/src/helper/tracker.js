import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
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
      instrumentations: [...getWebInstrumentations(), new TracingInstrumentation()],
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


export async function traceAsync(name, fn, attributes = {}) {
  const faro = getFaro();
  if (!faro) return fn();

  const otel = faro.api.getOTEL();
  const tracer = otel.trace.getTracer('default');

  const parent = tracer.startSpan('parent-operation');
  const parentCtx = otel.trace.setSpan(otel.context.active(), parent);

  try {
    await tracer.startActiveSpan('some-async-task', {}, parentCtx, async (span) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 30));
      } finally {
        span.end();
      }
    });

    return await tracer.startActiveSpan(name, {}, parentCtx, async (span) => {
      try {
        span.setAttributes(attributes);
        return await fn();
      } finally {
        span.end();
      }
    });
  } finally {
    parent.end();
}
}