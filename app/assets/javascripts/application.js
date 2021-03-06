// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require_self
//= require jquery
//= require jquery_ujs
//= require lodash
//= require turbolinks
//= require bootstrap

//= require d3v3
//= require d3v5

//= require main

//= require_tree .


// $(document).on('turbolinks:load', function() {
//   sortable('#tasks', {
//     items: 'tr'
//   });
//   if (typeof sortable('#spans')[0] != 'undefined'){
//     sortable('#spans')[0].addEventListener('sortupdate', function(e) {
//       var dataIDList = $(this).children().map(function(index){
//          $(this).find( ".position" ).text(index + 1)
//          return "span[]=" + $(this).data("id");
//       }).get().join("&");
//       Rails.ajax({
//           url: $(this).data("url"),
//           type: "PATCH",
//           data: dataIDList,
//         });
//     });
//   }
// })
