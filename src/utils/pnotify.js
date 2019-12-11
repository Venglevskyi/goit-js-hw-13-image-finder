import PNotify from '../../node_modules/pnotify/dist/es/PNotify';

const warning = () => PNotify.error({
  text: 'Too many matches found. Please enter a more specific query!',
});

export { warning };
