$(document).ready(function(){

    $('#email_signup').on('submit', function(){

        // var item = $('form input');
        console.log(item.serializeArray());

        $.ajax({
            type: 'POST',
            url: '/survey',
            data: $(this).serializeArray(),
            success: function(data){
                // do something with the data via front-end framework
                // Make the submit button red, disabled and saying Thank you
                console.log(data )
                // $("#bb").css("background-color", "red");
                // $("#bb").prop("disabled", "true");
                // $("#bb").text("Thank you!");
            }
        });
        return false;
    });
    $('#ui_survey').on('submit', function(){

        // var item = $('form input');
        console.log(item.serializeArray());

        $.ajax({
            type: 'POST',
            url: '/survey',
            data: $(this).serializeArray(),
            success: function(data){
                // do something with the data via front-end framework
                // Make the submit button red, disabled and saying Thank you
                console.log(data )
                // $("#bb").css("background-color", "red");
                // $("#bb").prop("disabled", "true");
                // $("#bb").text("Thank you!");
            }
        });
        return false;
    });
});