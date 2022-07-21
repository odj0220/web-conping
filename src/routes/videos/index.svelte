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
      console.log(response);
    });
</script>

<style lang="scss"></style>
