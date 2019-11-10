const URI = "127.0.0.1:8081";

export function post(endpoint: string, payload: Object) {
  return fetch(URI + endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
}

export function get(endpoint: string) {
  return fetch(URI + endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
}
