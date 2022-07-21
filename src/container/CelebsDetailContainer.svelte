<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import Container from '$component/common/layout/Container.svelte';
  import Tabs from '$component/common/layout/Tabs.svelte';
  import CelebsProfile from '$component/CelebsProfile.svelte';
  import CelebsAllContentsContainer from './CelebsAllContentsContainer.svelte';
  import CelebsProductContainer from './CelebsProductContainer.svelte';
  import CelebsContentsContainer from './CelebsContentsContainer.svelte';
  import CelebsShortsContainer from './CelebsShortsContainer.svelte';

  export let id: string;
  console.log('id', id);

  const getData = async () => {
    const query = `
      {
        celeb(id:"${id}"){
          name
          description
          categories
          thumbnail
        }
      }
    `;
    const { data: { celeb } } = await graphqlApi(query);
    return celeb;
  };

  const tabItems = [
    {
      label: '전체',
      index: 0,
      component: CelebsAllContentsContainer,
      props: { id },
    },
    {
      label: '상품',
      index: 1,
      component: CelebsProductContainer,
      props: { id },
    },
    {
      label: '콘텐츠',
      index: 2,
      component: CelebsContentsContainer,
      props: { id },
    },
    {
      label: '쇼츠',
      index: 3,
      component: CelebsShortsContainer,
      props: { id },
    },
  ];

</script>

{#await getData()}
{:then data} 
<Container margin="0" type="full">
  <CelebsProfile {data}/>
  <Tabs items={tabItems} borderBottom={true}/>
</Container>  
{/await}
