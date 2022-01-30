import { Integrations } from "@sentry/tracing";
import * as Sentry from "@sentry/react";


function init() {
Sentry.init({
    dsn: "https://86c8a4287dab42918b30deee9333d7fa@o1130171.ingest.sentry.io/6174138",
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
};

function log(err) {
    Sentry.captureException(err);
};

const logger = {
    init, log
};

export default logger;