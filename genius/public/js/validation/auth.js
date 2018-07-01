// Wait for the DOM to be ready

// Initialize form validation on the registration form.
// It has the name attribute "registration"
$("#login-form").validate({
    // Specify validation rules
    rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        username: "required",
        password: {
            required: true,
            minlength: 5
        }
    },
    // Specify validation error messages
    messages: {
        username: "Please enter your firstname",
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
        }
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function (form) {
        //alert(1);
        form.submit();
    }
});

$("#register-form").validate({
    // Specify validation rules
    rules: {
        // The key name on the left side is the name attribute
        // of an input field. Validation rules are defined
        // on the right side
        username: "required",
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 5
        },
        confirm_password: {
            required: true,
            equalTo: "#password"
        }
    },
    // Specify validation error messages
    messages: {
        username: "Please enter your firstname",
        email: {
            required: "Please provide a email",
            email: "Your password valid email"
        },
        password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 5 characters long"
        },
        confirm_password: {
            required: "Please provide a confirm password",
            equalTo: "Both password should be equal"
        }
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function (form) {
        //alert(1);
        //form.submit();

        var postData = {
            "email": $('#register-form #email').val(),
            "username": $('#register-form #username').val()
        };
        $.ajax({
            url: "/check_signup_duplicate",
            data: postData,
            type:'post',
            success: function (res) {
                res = $.trim(res);
                if(res=="success"){
                    form.submit();
                }
                else{
                    alert(res);
                }
            }
        });
    }
});


$('#login-form-link').click(function (e) {
    $("#login-form").delay(100).fadeIn(100);
    $("#register-form").fadeOut(100);
    $('#register-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});
$('#register-form-link').click(function (e) {
    $("#register-form").delay(100).fadeIn(100);
    $("#login-form").fadeOut(100);
    $('#login-form-link').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
});

