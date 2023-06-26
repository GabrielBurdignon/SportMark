$(document).ready(()=>{
    var url = window.location.href; 
    let urlsplit = url.split("id=")
    $(`.estado-${urlsplit[1]}`).removeClass("d-none")
})