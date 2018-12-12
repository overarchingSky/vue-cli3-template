<template>
  <{{__component_name__}} class="{{__component_name__}}__withData"></{{__component_name__}}>
</template>

<script>
import {{__hump_component_name__}} from './src/{{__component_name__}}'
export default {
  name: '{{__component_name__}}__withData',
  components: {
    '{{__component_name__}}': {{__hump_component_name__}}
  }
}
</script>
