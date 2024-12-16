import { onMounted } from 'vue';
export default {
  setup: () => {
    onMounted(() => {
      void import('oh-my-live2d').then(({ loadOml2d }) => loadOml2d(__OML2D_OPTIONS__));
    });
  }
};
