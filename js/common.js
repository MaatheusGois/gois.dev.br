//for header
(function () {
    const toggleHeader = function (direction, curScroll) {
        if (direction === 2 && curScroll > 92) { //replace 92 with the height of your header in px
            header.classList.add('hide');
            prevDirection = direction;
        } else if (direction === 1) {
            header.classList.remove('hide');
            prevDirection = direction;
        }
    };
    let prevScroll = window.scrollY || document.documentElement.scrollTop;
    let curScroll;
    let direction = 0;
    let prevDirection = 0;
    const header = document.getElementById('site-header');
    const bgElement = document.querySelector('.bg');
    const bgHeight = bgElement && bgElement.clientHeight > 494 ? bgElement.clientHeight : 0;
    const checkScroll = function () {
        /*
        ** Find the direction of scroll
        ** 0 - initial, 1 - up, 2 - down
        */
        curScroll = window.scrollY || document.documentElement.scrollTop;
        if (curScroll > prevScroll) {
            //scrolled up
            direction = 2;
        } else if (curScroll < prevScroll) {
            //scrolled down
            direction = 1;
        }

        if (curScroll > bgHeight) {
            header.classList.add('background');
        } else {
            header.classList.remove('background');
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }
        prevScroll = curScroll;
    };
    window.addEventListener('scroll', checkScroll);
})();

//for mobile header
function showMobileMenu() {
    const siteHeader = document.getElementById('site-header')
    siteHeader.classList.toggle("header-mobile");
}

//for Send a message
function showModal() {
    const modal = document.getElementsByClassName('main-modal')[0];
    modal.classList.toggle("main-modal--show");
    const sendButton = document.getElementById("sendButton");
    sendButton.addEventListener("click", sendMessage, false);
    const emailBlock = modal.querySelector('.main-modal__block[data-name=email]');
    modal.querySelector("form").oninput = () => {
        const isAgreed = modal.querySelector('input[name="isAgreed"]').checked;
        const email = modal.querySelector('input[name="email"]');
        const isDisabledButton = !isAgreed || email.value === '';
        if (isDisabledButton) {
            sendButton.classList.add("main-modal__button--disabled");
        } else {
            sendButton.classList.remove("main-modal__button--disabled");
            if (email.value !== '') emailBlock.classList.remove("main-modal__block--error");
        }
    }
}

function closeModal() {
    const modal = document.getElementsByClassName('main-modal')[0];
    modal.classList.remove("main-modal--show");
}

function sendMessage(e) {
    e.preventDefault();
    const formData = new FormData(document.getElementById('sendForm'));
    const {otherDetails} = Object.fromEntries(formData);
    const waMe = "https://api.whatsapp.com/send?phone=5511984694282&text=" + encodeURIComponent(otherDetails);
    window.open(waMe, '_blank');
    document.querySelector(".main-modal").classList.add("main-modal--sent");
    dataLayer.push({'event':'contact_request_sent'});
}