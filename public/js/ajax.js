const checkInputRegister = function(email, password, comfirmPassword, firstname, lastname, phone, address) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (email == '' || password == '' || comfirmPassword == '' || firstname == '' || lastname == '' || phone == '' || address == '') {
        return 'Vui lòng nhập đầy đủ thông tin';
    }
    if (!emailRegex.test(email)) {
        return 'Email không hợp lệ';
    }
    if (!passwordRegex.test(password)) {
        return 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
    }
    if (password != comfirmPassword) {
        console.log(password, comfirmPassword);
        return 'Mật khẩu không trùng khớp';
    }
    if (!phoneRegex.test(phone)) {
        return 'Số điện thoại không hợp lệ';
    }

    return null;
}

/*-------------AJAX REGISTER-------------*/
$('#button-register').click(function(e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    const comfirmPassword = $('#confirm-password').val();
    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    const phone = $('#phone').val();
    const address = $('#address').val();
    const error = checkInputRegister(email, password, comfirmPassword, firstname, lastname, phone, address);
    if (error != null) {
        $('#error-register').text(error);
        return false;
    }
    
    $.ajax({
        url: '/api/check-exists-account',
        type: 'POST',
        data: {
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            phone: phone,
            address: address
        },
        success: function(data) {
            if (data) {
                $('#error-register').text('Email đã tồn tại');
                return false;
            }
            else {
                $('#register_form').submit();
                return true;
            }
        }
    });
});

/*------------ AJAX LOGIN --------------*/
$('#button-login').click(function(e) {
    e.preventDefault();
    const email = $('#email-login').val();
    const password = $('#password-login').val();
    
    $.ajax({
        url: '/api/check-user',
        type: 'POST',
        data: {
            email: email,
            password: password
        },
        success: function(data) {
            if (data) {
                $('#login_form').submit();
                return true;
            }
            else {
                $('#error-login').text('Email hoặc mật khẩu không đúng');
                return false;
            }
        }
    });
});
