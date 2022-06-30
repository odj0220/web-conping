import { Graphql } from '../api/graphql/_graphql';

export const get = async () => {
  const graphql: any = await Graphql('{ contents { id name programId contentType createDt round description url thumb videoId } }');
  const contents = graphql.data.contents || [];
  return {
    body: {
      contents,
    },
  };
};
