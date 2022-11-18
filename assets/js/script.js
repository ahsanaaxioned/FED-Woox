// global varibale declaration start here 
const hamburger = document.querySelector(".hamburger"),
  navbar = document.querySelector(".navbar"),
  scrollUp = document.querySelector(".scroll-up"),
  countryImage = document.querySelectorAll(".country-item"),
  countrySec = document.querySelector(".visit-Country"),
  counterNum = document.querySelectorAll(".counter-Num"),
  aboutCounter = document.querySelectorAll(".country-counter"),
  speed = 100,
  form = document.querySelector(".my-form"),
  fullName = document.querySelector(".name"),
  number = document.querySelector(".Number"),
  guest = document.querySelector(".guest"),
  date = document.querySelector(".date"),
  destination = document.querySelector(".destination"),
  tabBtn = document.querySelectorAll(".scan-icon"),
  fiterItem = document.querySelectorAll(".image-item"),
  counterSec = document.querySelector(".banner-slide"),
  discoverSec = document.querySelector(".discover"),
  locationSec = document.querySelector(".location")
nameRegex = /^[A-Za-z\s]+$/,
  numberRegex = /^(\+91|0)?([7-9]\d{9})$/,
  dateRegex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
  html = document.querySelector("html");
let isvalid;
// console.log(fullName,number,guest,destination,date);
// hamburger function start here
hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("active");
  navbar.classList.toggle("active");
  html.classList.toggle("hidden")

})
// hamburger function end here

// scroll-up start here
scrollUp.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
});
window.addEventListener("scroll", function () {
  if (window.scrollY > scrollUp.offsetHeight + 25) {
    scrollUp.classList.add("scrol-show")
  } else {
    scrollUp.classList.remove("scrol-show")
  }
});
// scroll-up end here

// modal start here
countryImage.forEach(function (image, index) {
  image.addEventListener("click", function () {
    const figImg = document.querySelectorAll(".img"),
      modalImg = figImg[index].src,
      modalWrapper = countrySec.children[0],
      div = document.createElement("div");
    div.classList.add("modal");
    div.innerHTML = `<div class="modal-content"><div class="modal-close">
<span class="modal-bar rotate1">bar</span>
<span class="modal-bar hide">bar</span>
<span class="modal-bar rotate2">bar</span>
</div>
<figure class="modal-figure">
<img src="${modalImg}" alt="Modal Image" class="modal-image">
</figure></div>`;
    modalWrapper.appendChild(div);
    html.classList.add("remove-scroll");
    const modal = document.querySelector(".modal");
    function removeModal() {
      div.remove();
      html.classList.remove("remove-scroll");
    }
    const modalClose = document.querySelector(".modal-close");
    modalClose.addEventListener("click", function () {
      removeModal();
    });
    modal.addEventListener("click", function (e) {
      if (e.target == modal) {
        removeModal();
      };
    });
    window.addEventListener("keydown", function (e) {
      if (e.key == "Escape") {
        removeModal();
      };
    });

  });
});
// modal end here
// function for counter num ber start here
function numCount() {
  counterNum.forEach(function (currentEle) {
    const targetNum = currentEle.dataset.target, tempNum = 50;
    let initialNum = Number(currentEle.innerText);
    function updateNum() {
      if (initialNum < tempNum) {
        currentEle.innerText = `${initialNum}`;
        setTimeout(updateNum, 5);
        initialNum++;
      } else {
        currentEle.innerText = `${targetNum}`;
      }
    }
    updateNum();
  });
};
// function for counter number end here
// counter scroll observer start here
if (counterSec) {
  const numObserver = new IntersectionObserver((entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    numCount();
    // stopping observer once section obseerver done
    observer.unobserve(counterSec);
  },
    {
      root: null,
      threshold: 0,
    });
  numObserver.observe(counterSec);
}
// counter scroll observer end here
// form validation start here
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    validate(fullName, nameRegex);
    validate(number, numberRegex);
    option(guest);
    validate(date, dateRegex);
    option(destination);
    if (isvalid === true) {
      const sendMsg = document.createElement("span");
      sendMsg.className = "done";
      sendMsg.innerText = "Your Message Hasbeen Sent Successfully Thank You..!";
      form.insertBefore(sendMsg, form.children[1]);
      setTimeout(function () {
        sendMsg.remove();
      }, 2000)
      form.reset();
    }
  });
};
function validate(input, regex) {
  const formInput = input.parentElement;
  errorMsg = formInput.querySelector(".error");
  let str = input.value;
  isvalid = true;
  if (str === "") {
    errorMsg.classList.add("fail");
    formInput.classList.add("fail");
    errorMsg.innerText = "*filed is required";
    return isvalid = false
  } else if (!regex.test(str)) {
    errorMsg.classList.add("fail");
    formInput.classList.add("fail");
    errorMsg.innerText = "*please enter your valid" + " " + input.name;
    return isvalid = false;
  } else if (str.length < 4) {
    errorMsg.classList.add("fail");
    formInput.classList.add("fail");
    errorMsg.innerText = "*it must be atleast 4 character";
    return isvalid = false;
  } else {
    errorMsg.classList.remove("fail");
    formInput.classList.remove("fail");
    formInput.classList.add("success");
    return isvalid;
  }
};
function option(optionInput) {
  const opt = optionInput.parentElement,
    spanError = opt.querySelector(".error");
  if (optionInput.value == "select") {
    spanError.classList.add("fail");
    opt.classList.add("fail")
    spanError.innerText = "*please select one of " + optionInput.name;
    return isvalid = false;
  } else {
    spanError.classList.remove("fail");
    opt.classList.add("success")
    return isvalid = true;
  }
};
// event form input start here
if (form) {
  fullName.addEventListener("blur", function () {
    validate(fullName, nameRegex);
  });
  number.addEventListener("blur", function () {
    validate(number, numberRegex);
  });

  destination.addEventListener("blur", function () {
    option(destination);
  });
  guest.addEventListener("blur", function () {
    option(guest);
  });
  date.addEventListener("blur", function () {
    validate(date, dateRegex);
  });
}
// event form input end here
// form validation end here
// tab filter start here
if (locationSec) {
  fiterItem[0].classList.add("show");
  tabBtn.forEach(function (filterEle, idx) {
    filterEle.addEventListener("click", function () {
      const active = document.querySelector(".filter-active"),
        btnAttribute = filterEle.getAttribute('data-target');
      active.classList.remove("filter-active");
      filterEle.classList.add("filter-active");
      fiterItem.forEach(function (list) {
        const listAttribute = list.getAttribute('data-target');
        if (btnAttribute == listAttribute) {
          list.classList.add("show");
        } else {
          list.classList.remove("show");
        }
      })
    })
  });
};
// tab filter end here

// about page 1st slider start here
$('.city-list').slick({
  dots: false,
  infinite: false,
  arrows: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 995,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
// about page 1st slider end her

// counter for about page start here
function numberCount() {
  aboutCounter.forEach(function (currntEle) {
    const dataNum = currntEle.dataset.discover, tempNum = 150;
    let initialDataNum = Number(currntEle.innerText);
    function updtNum() {
      if (initialDataNum < tempNum) {
        currntEle.innerText = `${initialDataNum}`;
        setTimeout(updtNum, 15);
        initialDataNum++;
      } else {
        currntEle.innerText = `${dataNum}`;
      }
    }
    updtNum();
  });
};
// counter scroll observer start here
if (discoverSec) {
  const numObserver = new IntersectionObserver((entries, observer) => {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    numberCount();
    // stopping observer once section obseerver done
    observer.unobserve(discoverSec);
  },
    {
      root: null,
      threshold: 0,
    });
  numObserver.observe(discoverSec);
};
// counter scroll observer start here
// counter for about page start end

// about page slider 2nd start here
$('.city-slide').slick({
  dots: false,
  infinite: false,
  arrows: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 995,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
// about page slider 2nd start here
// slider for home page start here
$('.banner').slick({
  dots: true,
  infinite: false,
  arrows: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
});
// slider for home page end here
