import {Graphql} from './_graphql';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }: any) {
    const query = await request.json(); // or .json(), or .text(), etc
    return {
        body: await Graphql(query.query)
    }
}
