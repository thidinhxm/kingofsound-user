$('#checkout-form').keydown((e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        return false;
    }
    return true;
});
$('#change-password-form').keydown((e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        return false;
    }
    return true;
});
