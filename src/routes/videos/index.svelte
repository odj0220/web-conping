<script lang="ts">
    import { onMount } from 'svelte';
    import { graphqlApi } from '../../lib/_api';

    onMount(async () => {
      const query = `{
            products(order: alphabetical, category: "후드티") {
                id
                name
                brand
                price
                discountRate
                image
                category
                exposed
                storeUrl
                views
                createDt
                contents {
                    id
                    title
                    programId
                    episode
                }
                celebs {
                    id
                    name
                    thumbnail
                }
                relatedItems {
                    thumbnail
                    title
                    type
                    id
                }
            }
        }`;
      const response = await graphqlApi(query);
      await getCelebs();
      await getContentsByCelebId();
      await getProductByCelebId();
    });

    async function getCelebs() {
      const query = `{
            celebs {
                id
                name
                description
                thumbnail
                countOfFollowers
                countOfProducts
                countOfContents
                categories {
                    id
                    name
                    fontColor
                    backColor
                }
            }
        }`;
      const response = await graphqlApi(query);
    }

    async function getContentsByCelebId() {
      const query = `{
            getContentsByCelebId (id: "celeb17", type: SHORTS, limit: 2) {
                id
                title
                subtitle
                programId
                contentType
                createDt
            }
        }`;
      const response = await graphqlApi(query);
    }

    async function getProductByCelebId() {
      const query = `{
            getProductByCelebId (id: "celeb17", limit: 2) {
             id
                name
                brand
                price
            }
        }`;
      const response = await graphqlApi(query);
    }
</script>

<style lang="scss"></style>
