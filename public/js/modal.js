const modal = document.querySelector(".modal");
const trigger = document.querySelector(".add-to-cart");


function toggleModal() {
    modal.classList.toggle("show-modal");
    setTimeout(()=>{modal.classList.toggle("show-modal");},1500);
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);