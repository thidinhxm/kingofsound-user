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
        $('#error-register').addClass('alert-danger').text(error);
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
                $('#error-register').addClass('alert-danger').text('Email đã tồn tại');
                return false;
            }
            else {
                $('#register_form').submit();
                return true;
            }
        }
    });
});

const checkInputLogin = function(email, password) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '' || password == '') {
        return 'Vui lòng nhập đầy đủ thông tin';
    }
    if (!emailRegex.test(email)) {
        return 'Email không hợp lệ';
    }
    return null;
}

/*------------ AJAX LOGIN --------------*/
$('#button-login').click(function(e) {
    e.preventDefault();
    const email = $('#email-login').val();
    const password = $('#password-login').val();
    
    const error = checkInputLogin(email, password);
    if (error != null) {
        $('#error-login').addClass('alert-danger').text(error);
        return false;
    }

    $.ajax({
        url: '/api/check-exists-account',
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
                $('#error-login').addClass('alert-danger').text('Tài khoản không tồn tại');
                return false;
            }
        }
    });
});


/*------------ AJAX ADD-TO-CART --------------*/
const addToCart = function(product_id) {
    console.log(product_id);
    $.ajax({
        url: '/cart/add',
        type: 'POST',
        data: {
            product_id: product_id,
        },
        success: function(data) {
            if (data.success) {
                $('#cart-product-quantity').text(data.cart.products.length);
                return true;
            }
            else {
                return false;
            }
        }
    });    
};

/*------------ AJAX REMOVE-FROM-CART --------------*/
const removeFromCart = function(product_id) {
    $.ajax({
        url: `/cart/${product_id}/delete`,
        type: 'DELETE',
        data: {
            product_id: product_id,
        },
        success: function(data) {
            if (data.success) {
                let cartListTemplate = Handlebars.compile($('#cart-list-template').html());
                $('#cart-list').html(cartListTemplate({cart: data.cart}));
                $('#cart-product-quantity').text(data.cart.products.length);
                return true;
            }
            else {
                return false;
            }
        }
    });
};


// /*------------ AJAX CHANGE-QUANTITY --------------*/
const changeQuantity = function(product_id, quantityInput) {
    console.log(product_id);
    console.log(quantityInput);
    $.ajax({
        url: `/cart/${product_id}/update`,
        type: 'PATCH',
        data: {
            product_id: product_id,
            quantity: quantityInput.value
        },
        success: function(data) {
            if (data.success) {
                let cartListTemplate = Handlebars.compile($('#cart-list-template').html());
                $('#cart-list').html(cartListTemplate({cart: data.cart}));
                return true;
            }
            else {
                return false;
            }
        }
    });
};

/*------------ AJAX ADD COMMENT --------------*/
const addComment = function(product_id, event) {
    event.preventDefault();
    const email = $('#email-comment').val();
    const name = $('#name-comment').val();
    const content = $('#content-comment').val();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (name == '' || email == '') {
        $('#error-comment').text('Vui lòng nhập đầy đủ thông tin');
        return false;
    }
    if (!emailRegex.test(email)) {
        $('#error-comment').text('Email không hợp lệ');
        return false;
    }
    if (content.trim() == '') {
        $('#error-comment').text('Vui lòng nhập nội dung');
        return false;
    }
    $.ajax({
        url: `/products/${product_id}/comment/add`,
        type: 'POST',
        data: {
            product_id: product_id,
            content: content,
            name: name,
            email: email
        },
        success: function(data) {
            if (data) {
                loadComments(product_id);
                $('#content-comment').val('');
                return true;
            }
            else {
                return false;
            }
        }
    });

    function loadComments(product_id) {
        $.getJSON(`/products/${product_id}/comments`, function(data) {
            console.log($('#comment-list-template').html());
            let commentTemplate = Handlebars.compile($('#comment-list-template').html());
            $('#comment-length').text(`Bình luận (${data.length})`);
            $('#comment-list').html(commentTemplate({comments: data}));
            
        });
    }
};    


/*------------ AJAX FORGOT PASWWORD --------------*/
$('#button-forgot-password').click(function(e) {
    e.preventDefault();
    const email = $('#email-forgot-password').val();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '') {
        $('#error-forgot-password').text('Vui lòng nhập email');
        return false;
    }
    if (!emailRegex.test(email)) {
        $('#error-forgot-password').text('Email không hợp lệ');
        return false;
    }
    $.ajax({
        url: '/api/check-exists-account',
        type: 'POST',
        data: {
            email: email
        },
        success: function(data) {
            if (data) {
                $('#forgot-password-form').submit();
                return true;
            }
            else {
                $('#error-forgot-password').text('Email không tồn tại');
                return false;
            }
        }
    });
});
