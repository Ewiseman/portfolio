$(document).on("turbolinks:load", function() {

  new Draggable.Draggable(document.querySelectorAll('ul'), {
    draggable: 'li'
  })
  .on('drag:start', () => console.log('drag:start'))
  .on('drag:move',  () => console.log('drag:move'))
  .on('drag:stop',  () => console.log('drag:stop'));
});
