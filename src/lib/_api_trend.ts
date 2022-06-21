/*
	This module is used by the /todos endpoint to
	make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

const base = 'https://trend.gollala.com';

export function trendApi(method: string, resource: string, data?: Record<string, unknown>) {
  return fetch(`${base}/${resource}`, {
    method,
    headers: {
      'content-type': 'application/json',
      'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjA0ZDBiNDg4ODliNGIwMGY1OTUzMjgiLCJ1c2VySWQiOiJnb2xsYWxhYnV5ZXJ0ZXN0MSIsImxhc3RMb2dnZWRJbkF0IjoiMjAyMi0wNi0xNlQwMjo1NjoxNi4xNTFaIiwiaWF0IjoxNjU1MzQ4MTc2LCJpc3MiOiJnb2xsYWxhLmNvbSIsInN1YiI6ImN1c3RvbWVyIn0.oaj5ZprFzIdV_lSlWWOxB6wsO2ODFABttCMWJmXEN9A',
    },
    body: data && JSON.stringify(data),
  }).then(res => res.json());
}
