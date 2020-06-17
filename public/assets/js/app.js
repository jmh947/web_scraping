 
$(".saveButton").on("click", function(){
    var id = $(this).attr("data-id")
    $.ajax({
        url: "/api/articles/" +id,
        method: "PUT"
    }).then(function(data){
        location.reload()
    })
})