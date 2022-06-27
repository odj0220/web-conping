import {Graphql} from '../api/graphql/_graphql';
import { list } from '../api/product/_product';

export const get = async () => {
    const graphql: any = await Graphql('{ contents { id name programId contentType createDt round description url thumb } }');
    const products = await list();
    const contentList = graphql.data.contents || [];
    console.log(contentList);
    return {
        body: {
            contentList,
            products
        }
    };
};