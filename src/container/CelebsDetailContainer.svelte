<script type="ts">
  import { graphqlApi } from '$lib/_api';

  import CelebsProfile from '$component/CelebsProfile.svelte';
  import Container from '$component/common/layout/Container.svelte';
  import Tabs from '$component/Tabs.svelte';

  export let id: string;

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
      component: '',
      props: {},
    },
    {
      label: '상품',
      index: 1,
      component: '',
      props: {},
    },
    {
      label: '콘텐츠',
      index: 2,
      component: '',
      props: {},
    },
    {
      label: '쇼츠',
      index: 3,
      component: '',
      props: '',
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
