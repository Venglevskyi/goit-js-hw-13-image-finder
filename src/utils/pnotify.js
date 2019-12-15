import PNotify from '../../node_modules/pnotify/dist/es/PNotify';

const warning = () => PNotify.error({
  text: 'Pictures not found. Please enter a more specific query!',
});

export { warning };
