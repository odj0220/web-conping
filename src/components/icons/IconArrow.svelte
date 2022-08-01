<script lang="ts">
    export let name : string;
    export let size = '';
    
    const theme = 'dark';
    const color = '#FFFFFF';

    const icons = [
      {
        name: 'big-left',
        svg: `<svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.0018 50.0035L10.7071 30.7089C10.3166 30.3184 10.3166 29.6852 10.7071 29.2947L30.0018 10" stroke=${color} stroke-width="4" stroke-miterlimit="10" stroke-linecap="square"/></svg>`,
      },
      {
        name: 'big-right',
        svg: `<svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 50L29.2929 30.7071C29.6834 30.3166 29.6834 29.6834 29.2929 29.2929L10 10" stroke=${color} stroke-width="4" stroke-miterlimit="10" stroke-linecap="square"/></svg>`,
      },
      {
        name: 'big-gray-left',
        svg: '<svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.0018 50.0035L10.7071 30.7089C10.3166 30.3184 10.3166 29.6852 10.7071 29.2947L30.0018 10" stroke="#DDDDDD" stroke-width="4" stroke-miterlimit="10" stroke-linecap="square"/></svg>',
      },
      {
        name: 'big-gray-right',
        svg: '<svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 50L29.2929 30.7071C29.6834 30.3166 29.6834 29.6834 29.2929 29.2929L10 10" stroke="#DDDDDD" stroke-width="4" stroke-miterlimit="10" stroke-linecap="square"/></svg>',
      },
      {
        name: 'circle-gray-left',
        svg: '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="29.5" fill="white" stroke="#DDDDDD"/><path d="M33 40L23.7071 30.7071C23.3166 30.3166 23.3166 29.6834 23.7071 29.2929L33 20" stroke="#BBBBBB" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/></svg>',
      },
      {
        name: 'circle-gray-right',
        svg: '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="29.5" fill="white" stroke="#DDDDDD"/><path d="M27 20L36.2929 29.2929C36.6834 29.6834 36.6834 30.3166 36.2929 30.7071L27 40" stroke="#BBBBBB" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/></svg>',
      },
      {
        name: 'square-left',
        svg: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_65_11219)"><rect opacity="0.7" width="40" height="40" fill="white"/><path d="M23 28L15.7071 20.7071C15.3166 20.3166 15.3166 19.6834 15.7071 19.2929L23 12" stroke="#323232" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square"/></g><defs><clipPath id="clip0_65_11219"><rect width="40" height="40" fill="white"/></clipPath></defs></svg>',
      },
      {
        name: 'square-right',
        svg: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_65_11229)"><rect opacity="0.7" width="40" height="40" fill="white"/><path d="M17 12L24.2929 19.2929C24.6834 19.6834 24.6834 20.3166 24.2929 20.7071L17 28" stroke="#323232" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square"/></g><defs><clipPath id="clip0_65_11229"><rect width="40" height="40" fill="white"/></clipPath></defs>=</svg>',
      },
      {
        name: 'small-up',
        svg: `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 9.00537L8.42946 5.06742C8.74178 4.75443 9.24878 4.75415 9.56144 5.06681L13.5 9.00537" stroke=${color}  stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></svg>`,
      },
      {
        name: 'small-down',
        svg: `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 5L8.57054 8.93795C8.25822 9.25094 7.75122 9.25122 7.43856 8.93856L3.5 5" stroke=${color} stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></svg>`,
      },
      {
        name: 'small-left',
        svg: `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_65_11344)"><path d="M9 13L4.56151 8.57108C4.24852 8.25876 4.24824 7.75176 4.5609 7.4391L9 3" stroke=${color} stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></g><defs><clipPath id="clip0_65_11344"><rect width="16" height="14" fill="white" transform="translate(14) rotate(90)"/></clipPath></defs></svg>`,
      },
      {
        name: 'small-right',
        svg: `<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3L9.43849 7.42892C9.75148 7.74124 9.75176 8.24824 9.4391 8.5609L5 13" stroke=${color} stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></svg>`,
      },
      {
        name: 'small-gray-up',
        svg: '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 9.00537L8.42946 5.06742C8.74178 4.75443 9.24878 4.75415 9.56144 5.06681L13.5 9.00537" stroke="#BBBBBB" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></svg>',
      },
      {
        name: 'small-gray-down',
        svg: '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 5L8.57054 8.93795C8.25822 9.25094 7.75122 9.25122 7.43856 8.93856L3.5 5" stroke="#BBBBBB" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></svg>',
      },
      {
        name: 'small-gray-left',
        svg: '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_65_11348)"><path d="M9 13L4.56151 8.57108C4.24852 8.25876 4.24824 7.75176 4.5609 7.4391L9 3" stroke="#BBBBBB" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></g><defs><clipPath id="clip0_65_11348"><rect width="16" height="14" fill="white" transform="translate(14) rotate(90)"/></clipPath></defs></svg>',
      },
      {
        name: 'small-gray-right',
        svg: '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3L9.43849 7.42892C9.75148 7.74124 9.75176 8.24824 9.4391 8.5609L5 13" stroke="#BBBBBB" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></svg>',
      },
      {
        name: 'small-solid-up',
        svg: `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.17385 7.99173L7.45339 3.97071C7.5236 3.88687 7.60833 3.82008 7.70233 3.77442C7.79633 3.72876 7.89762 3.70521 8 3.70521C8.10238 3.70521 8.20368 3.72876 8.29767 3.77442C8.39167 3.82008 8.4764 3.88687 8.54661 3.97071L11.8262 7.99174C11.9117 8.09369 11.9689 8.22166 11.9904 8.35977C12.012 8.49789 11.997 8.64009 11.9474 8.76874C11.8978 8.89739 11.8158 9.00685 11.7114 9.08354C11.6071 9.16023 11.485 9.20079 11.3604 9.20019L4.63963 9.20019C4.51499 9.20079 4.39293 9.16023 4.28858 9.08354C4.18423 9.00685 4.10217 8.89739 4.05259 8.76874C4.003 8.64008 3.98804 8.49789 4.00959 8.35977C4.03115 8.22166 4.08827 8.09369 4.17385 7.99173Z" fill=${color}/></svg>`,
      },
      {
        name: 'small-solid-down',
        svg: '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 5L8.57054 8.93795C8.25822 9.25094 7.75122 9.25122 7.43856 8.93856L3.5 5" stroke="#F2F2F2" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></svg>',
      },
      {
        name: 'small-gray-solid-up',
        svg: `<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.17385 7.99173L7.45339 3.97071C7.5236 3.88687 7.60833 3.82008 7.70233 3.77442C7.79633 3.72876 7.89762 3.70521 8 3.70521C8.10238 3.70521 8.20368 3.72876 8.29767 3.77442C8.39167 3.82008 8.4764 3.88687 8.54661 3.97071L11.8262 7.99174C11.9117 8.09369 11.9689 8.22166 11.9904 8.35977C12.012 8.49789 11.997 8.64009 11.9474 8.76874C11.8978 8.89739 11.8158 9.00685 11.7114 9.08354C11.6071 9.16023 11.485 9.20079 11.3604 9.20019L4.63963 9.20019C4.51499 9.20079 4.39293 9.16023 4.28858 9.08354C4.18423 9.00685 4.10217 8.89739 4.05259 8.76874C4.003 8.64008 3.98804 8.49789 4.00959 8.35977C4.03115 8.22166 4.08827 8.09369 4.17385 7.99173Z" fill=${color}/></svg>`,
      },
      {
        name: 'small-gray-solid-down',
        svg: '<svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 5L8.57054 8.93795C8.25822 9.25094 7.75122 9.25122 7.43856 8.93856L3.5 5" stroke="#F2F2F2" stroke-width="1.4" stroke-miterlimit="10" stroke-linecap="square"/></svg>',
      },
    ];

    const icon = icons.find(el => el.name === name);

</script>

<span class='icon'>
    {@html icon?.svg}
</span>

<style lang="scss">
    .icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
