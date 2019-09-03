$(document).ready(function() {
    $("#conversao").validate({
        rules: {
            quantidade: {
                maxlength: 10,
                minlength: 2
            }
    
        }
    })
})