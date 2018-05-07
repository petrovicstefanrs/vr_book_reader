import ENV from "../env";

function write(method, messages) {
  console[method].apply(console, messages);
}

function logUsingMethod(method, context) {
  if (!ENV.log.enabled || !context) {
    return;
  }

  let allowed = ENV.log.contexts && ENV.log.contexts[context];
  if (allowed === false) {
    return;
  } else if (allowed === true) {
    context = `[${context.toUpperCase()}]`;
  } else {
    context = `[MISC]`;
  }

  write(method, [context].concat(Array.prototype.slice.call(arguments, 2)));
}

export const log = logUsingMethod.bind(null, "log");
export const warn = logUsingMethod.bind(null, "warn");
