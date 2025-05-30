// Had this put together with the help of chatgpt to make it quicker.
// Makes it so that I can later import a url + api key pair to each place I need it from the env file.

export const EVENT_RULES_SERVICE = {
  URL: import.meta.env.VITE_EVENT_RULES_SERVICE_URL,
  API_KEY: import.meta.env.VITE_EVENT_RULES_SERVICE_API_KEY,
};

export const EVENT_SCHEDULE_SERVICE = {
  URL: import.meta.env.VITE_EVENT_SCHEDULE_SERVICE_URL,
  API_KEY: import.meta.env.VITE_EVENT_SCHEDULE_SERVICE_API_KEY,
};

export const EVENT_MAP_SERVICE = {
  URL: import.meta.env.VITE_EVENT_MAP_SERVICE_URL,
  API_KEY: import.meta.env.VITE_EVENT_MAP_SERVICE_API_KEY,
};

export const MAP_IMAGE_HANDLER = {
  URL: import.meta.env.VITE_MAP_IMAGE_HANDLER_URL,
  API_KEY: import.meta.env.VITE_MAP_IMAGE_HANDLER_API_KEY,
};

export const EVENT_TICKET_SERVICE = {
  URL: import.meta.env.VITE_EVENT_TICKET_SERVICE_URL,
  API_KEY: import.meta.env.VITE_EVENT_TICKET_SERVICE_API_KEY,
};

export const TICKET_GATEWAY_API = {
  URL: import.meta.env.VITE_TICKET_GATEWAY_API_URL,
  API_KEY: import.meta.env.VITE_TICKET_GATEWAY_API_KEY,
};

export const EVENT_TERMS_SERVICE = {
  URL: import.meta.env.VITE_EVENT_TERMS_SERVICE_URL,
  API_KEY: import.meta.env.VITE_EVENT_TERMS_SERVICE_API_KEY,
};