<script lang="ts">
    export let name : string;
    export let size : string;
    
    const theme = 'dark';
    $: color = '#FFFFFF';

    const icons = [
      {
        name: 'large',
        svg: `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.75 11.75L34.63 34.63" stroke=${color} stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/><path d="M34.74 11.75L11.86 34.63" stroke=${color} stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/></svg>`,
      },
      {
        name: 'medium',
        svg: `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12L27.8 27.8" stroke=${color} stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/><path d="M27.88 12L12.08 27.8" stroke=${color} stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/></svg>`,
      },
      {
        name: 'medium-gray',
        svg: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12L27.8 27.8" stroke="#999999" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/><path d="M27.88 12L12.08 27.8" stroke="#999999" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/></svg>',
      },
      {
        name: 'small',
        svg: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10L19.71 19.71" stroke=${color} stroke-width="1.7" stroke-linecap="square" stroke-linejoin="round"/><path d="M19.7701 10L10.0601 19.71" stroke=${color} stroke-width="1.7" stroke-linecap="square" stroke-linejoin="round"/></svg>`,
      },
      {
        name: 'small-gray',
        svg: '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 10L19.71 19.71" stroke="#999999" stroke-width="1.7" stroke-linecap="square" stroke-linejoin="round"/><path d="M19.7701 10L10.0601 19.71" stroke="#999999" stroke-width="1.7" stroke-linecap="square" stroke-linejoin="round"/></svg>',
      },
      {
        name: 'xsmall',
        svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 6.5L13.457 13.5" stroke=${color} stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/><path d="M13.5001 6.5L6.54309 13.5" stroke=${color} stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/></svg>`,
      },
      {
        name: 'xsmall-gray',
        svg: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 6.5L13.457 13.5" stroke="#999999" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/><path d="M13.5001 6.5L6.54309 13.5" stroke="#999999" stroke-width="1.2" stroke-linecap="square" stroke-linejoin="round"/></svg>',
      },
      {
        name: 'tiny-gray',
        svg: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" fill="#636363"/><path d="M12 12L8 8" stroke=${color} stroke-miterlimit="10" stroke-linecap="square"/><path d="M8 12L12 8" stroke=${color} stroke-miterlimit="10" stroke-linecap="square"/></svg>`,
      },
    ];

    const icon = icons.find(el => el.name === name);

</script>

<span class='icon'>
    {@html icon?.svg}
</span>
