<script lang="ts">
    import { onMount } from 'svelte';
    import { graphqlApi } from '../../lib/_api';

    onMount(async () => {
      await getCategories();
      // await getProducts();
      // await getCelebs();
      // await getCeleb();
      // await getContentsByCelebId();
      // await getProductByCelebId();
      // await getSocialsByContentId();
    });

    async function getProducts() {
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
    }

    async function getCategories() {
      const query = `{
        categories(type: "PRODUCT") {
            id
            name
        }
      }`;
      const response = await graphqlApi(query);
      console.log(response);
    }

    async function getCelebs() {
      const query = `{
            celebs {
                id
                name
                description
                thumbnail
                ba_thumbnail
                countOfFollowers
                countOfYotubeFollowers
                countOfInstagramFollowers
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

    async function getCeleb() {
      const query = `{
            celeb (id: "celeb1") {
                id
                name
                description
                thumbnail
                ba_thumbnail
                countOfFollowers
                countOfYotubeFollowers
                countOfInstagramFollowers
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
                program { title }
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

    async function getSocialsByContentId() {
      const query = `{
            getSocialsByCelebId (id: "celeb1") {
                id
                type
                board_thumbnails
                link
            }
        }`;
      const response = await graphqlApi(query);
    }
</script>

<style lang="scss"></style>
