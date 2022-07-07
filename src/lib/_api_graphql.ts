const url = '/api/graphql';

export function graphqlApi(query: string) {
  const body = { query };
  return fetch(url, {
    method: 'post',
    body: body && JSON.stringify(body),
  }).then(res => res.json());
}
