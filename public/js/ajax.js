const checkValidEmail = function (email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
}

const checkValidPhone = function (phone) {
    const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    return phoneRegex.test(phone);
}

const checkValidPassword = function (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

const checkInputRegister = function (email, password, comfirmPassword, firstname, lastname, phone, address) {
    if (email == '' || password == '' || comfirmPassword == '' || firstname == '' || lastname == '' || phone == '' || address == '') {
        return 'Vui lòng nhập đầy đủ thông tin';
    }
    if (!checkValidEmail(email)) {
        return 'Email không hợp lệ';
    }
    if (!checkValidPassword(password)) {
        return 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';
    }
    if (password !== comfirmPassword) {

        return 'Mật khẩu không trùng khớp';
    }
    if (!checkValidPhone(phone)) {
        return 'Số điện thoại không hợp lệ';
    }

    return null;
}

/*-------------AJAX REGISTER-------------*/
$('#button-register').click(function (e) {
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
        success: function (data) {
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

const checkInputLogin = function (email, password) {
    if (email == '' || password == '') {
        return 'Vui lòng nhập đầy đủ thông tin';
    }
    if (!checkValidEmail(email)) {
        return 'Email không hợp lệ';
    }
    return null;
}

/*------------ AJAX LOGIN --------------*/
$('#button-login').click(function (e) {
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
        success: function (data) {
            if (!data) {
                $('#error-login').addClass('alert-danger').text('Tài khoản không tồn tại');
                return false;
                
            }
            else if (data === 'admin') {
                $('#error-login').addClass('alert-danger').text('Không thể đăng nhập bằng tài khoản này');
                return false;
            }
            else {
                $('#login_form').submit();
                return true;
            }
        }
    });
});

/*------------ AJAX CHECK EMAIL FORGOT PASSWORD --------------*/
$('#button-forgot-password').click(function (e) {
    e.preventDefault();
    const email = $('#email-forgot-password').val();
    if (email == '') {
        $('#error-forgot-password').text('Vui lòng nhập email');
        return false;
    }
    if (!checkValidEmail(email)) {
        $('#error-forgot-password').text('Email không hợp lệ');
        return false;
    }

    $.ajax({
        url: '/api/check-exists-account',
        type: 'POST',
        data: {
            email: email
        },
        success: function (data) {
            if (!data) {
                $('#error-forgot-password').addClass('alert-danger').text('Tài khoản không tồn tại');
                return false;
            }
            else if (data === 'admin') {
                $('#error-forgot-password').addClass('alert-danger').text('Tài khoản này không thể đổi mật');
                return false;
            }
            else {
                $('#forgot-password-form').submit();
                return true;
            }
        }
    });
});

/*------------ AJAX ADD-TO-CART --------------*/
const addToCart = function (product_id, btn) {
    let quantity = 1;
    if (btn) {
        quantity = $(btn).closest('div.buy-now').find('input[name="quantity"]').val();
    }
    $.ajax({
        url: '/cart/add',
        type: 'POST',
        data: {
            product_id: product_id,
            quantity: parseInt(quantity)
        },
        success: function (data) {
            if (data.success) {

                $('#cart-product-quantity').text(data.cart.products.length);
                let cartDropDownTemplate = Handlebars.compile($('#cart-dropdown-template').html());
                $('#cart-list-dropdown').html(cartDropDownTemplate({ products: data.cart.products, totalString: data.cart.totalString }));
                $('#toast').css({ "visibility": "hidden" });
                setTimeout(() => {
                    $('#toast').css({ "visibility": "visible" })
                }, 100);
                setTimeout(() => {
                    $('#toast').css({ "visibility": "hidden", "opacity": "1" })
                }, 2000);
                return true;
            }
            else {
                return false;
            }
        }
    });
};

/*------------ AJAX REMOVE-FROM-CART --------------*/
const removeFromCart = function (product_id) {
    $.ajax({
        url: `/cart/${product_id}/delete`,
        type: 'DELETE',
        data: {
            product_id: product_id,
        },
        success: function (data) {
            if (data.success) {
                $('#cart-product-quantity').text(data.cart.products.length);
                let cartListTemplate = Handlebars.compile($('#cart-list-template').html());
                $('#cart-list').html(cartListTemplate({ cart: data.cart }));
                let cartDropDownTemplate = Handlebars.compile($('#cart-dropdown-template').html());
                $('#cart-list-dropdown').html(cartDropDownTemplate({ products: data.cart.products, totalString: data.cart.totalString }));
                return true;
            }
            else {
                return false;
            }
        }
    });
};


// /*------------ AJAX CHANGE-QUANTITY --------------*/
const changeQuantity = function (product_id, quantityInput) {
    $.ajax({
        url: `/cart/${product_id}/update`,
        type: 'PATCH',
        data: {
            product_id: product_id,
            quantity: quantityInput.value
        },
        success: function (data) {
            if (data.success) {
                let cartListTemplate = Handlebars.compile($('#cart-list-template').html());
                $('#cart-list').html(cartListTemplate({ cart: data.cart }));
                let cartDropDownTemplate = Handlebars.compile($('#cart-dropdown-template').html());
                $('#cart-list-dropdown').html(cartDropDownTemplate({ products: data.cart.products, totalString: data.cart.totalString }));
                return true;
            }
            else {
                return false;
            }
        }
    });
};

/*------------ AJAX ADD COMMENT --------------*/
const paginateCommentList = function (pagination, product_id) {
    let limit = 10, n;
    let page = parseInt(pagination.page);
    let leftText = '<i class="fa fa-chevron-left"></i>';
    let rightText = '<i class="fa fa-chevron-right"></i>';
    let paginationClass = 'store-pagination';

    let pageCount = pagination.pages || Math.ceil(pagination.totalRows / pagination.limit);
    let template = '<ul class="' + paginationClass + '">';
    // ========= Previous Button ===============
    if (page === 1) {
        n = 1;

        template = template + `<li class="disabled"><a onclick="changePage(${n}, ${product_id})">${leftText}</a></li>`;
    }
    else {
        n = page - 1;
        template = template + `<li><a onclick="changePage(${n}, ${product_id})">${leftText}</a></li>`;
    }
    // ========= Page Numbers Middle ======
    let leftCount = Math.ceil(limit / 2) - 1;
    let rightCount = limit - leftCount - 1;
    if (page + rightCount > pageCount) {
        leftCount = limit - (pageCount - page) - 1;
    }
    if (page - leftCount < 1) {
        leftCount = page - 1;
    }
    let start = page - leftCount;
    let i = 0;
    while (i < limit && i < pageCount) {
        n = start;
        if (start === page) {
            template = template + `<li class="active"><a onclick="changePage(${n}, ${product_id})">${n}</a></li>`;

        } else {
            template = template + `<li><a onclick="changePage(${n}, ${product_id})">${n}</a></li>`;
        }
        start++;
        i++;
    }
    // ========== Next Buton ===========
    if (page === pageCount) {
        n = pageCount;
        template = template + `<li class="disabled"><a onclick="changePage(${n}, ${product_id})">${rightText}</a></li>`;
    }
    else {
        n = page + 1;
        template = template + `<li><a onclick="changePage(${n}, ${product_id})">${rightText}</a></li>`;
    }
    template = template + '</ul>';
    return template;
};

const addComment = function (product_id, event) {
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
        success: function (data) {
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
        $.getJSON(`/products/${product_id}/comments`, function (data) {
            let commentTemplate = Handlebars.compile($('#comment-list-template').html());
            $('#comment-length').text(`Bình luận (${data.pagination.totalRows})`);
            $('#comment-list').html(commentTemplate({ comments: data.comments }));
            $('#pagination-comment').html(paginateCommentList(data.pagination, product_id));
        });
    }
};

/*------------ AJAX CHANGE-PAGE-COMMENT-LisT --------------*/
const changePage = (n, product_id) => {
    $.ajax({
        url: '/products/' + product_id + '/comments?page=' + n,
        type: 'GET',
        success: function (data) {
            let commentTemplate = Handlebars.compile($('#comment-list-template').html());
            $('#comment-list').html(commentTemplate({ comments: data.comments }));
            $('#pagination-comment').html(paginateCommentList(data.pagination, product_id));
        }
    });
}



/*----------------------CHECK VALID VOUCHER-----------------*/
const checkVoucher = function (id, total) {
    if (id != "")
        $.ajax({
            url: '/cart/checkout/voucher',
            type: 'POST',
            data: {
                voucher_id: id,
            },
            success: function (data) {
                if (data.success) {
                    $('#discount').text(data.discount);
                    $('#voucher-success').text("Áp dụng khuyến mại thành công");
                    $('#voucher-error').text("");
                    $('#discount-total').text((total * data.discount / 100).toLocaleString(undefined,));
                    $('#total').text((total - total * data.discount / 100).toLocaleString(undefined,));
                    $('#submit-checkout').removeAttr('form');
                    $('#submit-checkout').attr('form', 'checkout-form');
                    return true;
                }
                else {
                    $('#discount').text(0);
                    $('#voucher-error').text('Mã khuyến mại "' + $('#voucher').val() + '" không hợp lệ hoặc hết hạn dùng!');
                    $('#voucher-success').text("");
                    $('#discount-total').text(0);
                    $('#total').text((total).toLocaleString(undefined,));
                    $('#submit-checkout').removeAttr('form');
       
                    return false;
                }
            }
        });
    else {
        $('#voucher-error').text("");
        $('#voucher-success').text("");
        $('#discount').text(0);
        $('#discount-total').text(0);
        $('#total').text((total).toLocaleString(undefined,));
        $('#submit-checkout').removeAttr('form');
        $('#submit-checkout').attr('form', 'checkout-form');
    }
};

// const checkVoucher_on = function (id, total) {
//     if (id != "")
//         $.ajax({
//             url: '/cart/checkout/voucher',
//             type: 'POST',
//             data: {
//                 voucher_id: id,
//             },
//             success: function (data) {
//                 if (data.success) {
//                     $('#discount').text(data.discount);
//                     $('#voucher-success').text("Áp dụng khuyến mại thành công");
//                     $('#voucher-error').text("");
//                     $('#discount-total').text((total * data.discount / 100).toLocaleString(undefined,));
//                     $('#total').text((total - total * data.discount / 100).toLocaleString(undefined,));
//                     return true;
//                 }
//                 else {
//                     $('#discount').text(0);
//                     $('#voucher-error').text('Mã khuyến mại "' + $('#voucher').val() + '" không hợp lệ hoặc hết hạn dùng!');
//                     $('#voucher-success').text("");
//                     $('#discount-total').text(0);
//                     $('#total').text((total).toLocaleString(undefined,));
//                     return false;
//                 }
//             }
//         });
//     else {
//         $('#voucher-error').text("");
//         $('#voucher-success').text("");
//         $('#discount').text(0);
//         $('#discount-total').text(0);
//         $('#total').text((total).toLocaleString(undefined,));
//     }
// };
/*----------------------Search suggest-----------------*/
const suggest = function (search) {
    $('#search-suggest').empty();
    if (search == "") { return; }
    $.ajax({
        url: '/products/suggest',
        type: 'POST',
        data: {
            search_name: search
        },
        success: function (data) {
            if (data.success) {
                data.products.forEach(value => {
                    $('#search-suggest').append(`<a href="/products/${value.product_id}"><div class="text">${value.product_name}</div></a>`);
                })
                return true;
            }
            else
                return false;
        }
    });

}


// modal review

function toggleModal_review() {
    const modal_review = document.querySelector(".modal-review");
    modal_review.classList.toggle("show-modal");
}


const addreviews = function (order_id, product_id) {
    document.querySelector("#order_id").value = order_id;
    document.querySelector("#product_id").value = product_id;
    $("#1").prop("checked", true);
    toggleModal_review();
}

const closemodal = function () {
    toggleModal_review();
}


// check review
function toggleModal_check_review() {
    const modal_check_review = document.querySelector(".modal-check-review");
    modal_check_review.classList.toggle("show-modal");
}
const closemodal_check = function () {
    toggleModal_check_review();
}

const checkReview = function (review_id) {
    $.ajax({
        url: '/orders/getreview',
        type: 'POST',
        data: {
            review_id: review_id
        },
        success: function (data) {
            if (data.success) {
                toggleModal_check_review();
                $('#my-review').text(data.content);

                $("#star" + data.rating).prop("checked", true);

                return true;
            }
            else
                return false;
        }
    });

}

// modal delete order
const  toggleModal_cancel= function () {
    const modal_cancel= document.querySelector(".modal-cancel-order");
    modal_cancel.classList.toggle("show-modal");
}
const closemodal_cancel= function () {
    toggleModal_cancel();
}
const  openModal_cancel= function (order_id) {
    document.querySelector("#id").value = order_id;
    toggleModal_cancel(); 
}

const changePassword = function()
{
    const password =  $("#change-oldpassword").val();
    const newpassword =  $("#change-newpassword").val();
    const renewpassword =  $("#change-renewpassword").val();
    if(!newpassword || !password || !renewpassword)
        {
        $("#change-password-error").removeAttr('class');
         $("#change-password-error").attr('class', 'alert alert-danger');
          $("#change-password-error").text("Vui lòng nhập đầy đủ thông tin!");
        }
    else if(newpassword != renewpassword)
    {
        $("#change-password-error").removeAttr('class');
        $("#change-password-error").attr('class', 'alert alert-danger');
         $("#change-password-error").text("Mật khẩu mới không khớp!");
    }
    else if (!checkValidPassword(newpassword)) {
        $("#change-password-error").removeAttr('class');
        $("#change-password-error").attr('class', 'alert alert-danger');
        $("#change-password-error").text('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
    }
    else 
    {
        $("#change-password-error").removeAttr('class');
        $("#change-password-form").submit();
    }
}

