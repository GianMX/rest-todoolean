// DOCUMENT READY START
$(document).ready(function(){
  showTodoElementList();
// DOCUMENT ADD ELEMENT ON CLICK
  $(document).on("click",".botton-list", function () {
    var myInput = $(".input-list").val();
    $(".load").addClass("active");
    // ADDING ON CLICK SHOW LOADING ICON ANIMATED
    setTimeout(newTodo, 2000, myInput)
  });
  $(document).on("click", ".delete-list-element", function () {
    var thisElement = $(this);
    var idTodo = thisElement.siblings().attr('data-id');
    $(".load").addClass("active");
    deleteTodo(idTodo);
  });
});
// GET CRUD
  function showTodoElementList() {
    $.ajax({
      url: "http://157.230.17.132:3014/todos",
      method: "GET",
      success: function (data) {
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < data.length; i++) {
          var element = data[i];
          var context = {
            body: element.text,
            id: element.id
          };
          var html = template(context);
          $("ol.list").append(html);
        }
        $(".load").removeClass("active");
      },
      error: function (error, state, request) {
      }
    });
  }
// ADD CRUD
  function newTodo(myInput) {
    $.ajax({
      url: "http://157.230.17.132:3014/todos",
      method: "POST",
      data: {
        text: myInput
      },
      success: function (data) {
        clear();
        showTodoElementList();
      },
      error: function (error, state) {
      }
    });
  }
// DELETE CRUD
  function deleteTodo(id) {
    $.ajax({
      url: "http://157.230.17.132:3014/todos/" + id ,
      method: "DELETE",
      success: function (data) {
        clear();
        showTodoElementList();
      },
      error: function (error, state) {
      }
    });
  }
// CLEAR HTML
  function clear() {
   $("ol.list").html("");
  }
// DOCUMENT READY END
