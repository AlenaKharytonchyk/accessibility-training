(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach((navEl, i, arr) => {
  navEl.addEventListener('click',function(e) {

    toggleTab(e.currentTarget.id, e.currentTarget.dataset.target);
  });
  navEl.addEventListener('keydown',(e) => {
    if(e.keyCode !== 37 && e.keyCode !== 39) return;
    const previousElement = arr[i-1];
    const nextElement = arr[i+1];

    if(e.keyCode === 37 && previousElement) {
      toggleTab(previousElement.id, previousElement.dataset.target);
      previousElement.focus();
    }
    if(e.keyCode === 39 && arr[i+1]) {
      toggleTab(nextElement.id, nextElement.dataset.target);
      nextElement.focus();
    }

  })
});

document.querySelector('.dropMenu').addEventListener('keydown', openSkipToMain);
document.querySelector('.dropMenu').addEventListener('keydown', (e)=> {
  if(e.keyCode === 27) {
    e.target.closest('.dropMenu').querySelector('ul').style.display = "none";
    e.target.closest('.dropMenu').style.height = "0px";
  }
});

setInterval(() => document.querySelector('.chat-window').classList.toggle('active'), 5000);

function openSkipToMain (e) {
  if(e.keyCode === 13 || e.keyCode === 32) {
    e.target.closest('.dropMenu').querySelector('ul').style.display = "block";
  }
}

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");
  navEls.forEach(function(navEl) {
    if (navEl.id === selectedNav) {
      navEl.classList.add("is-active");
      navEl.setAttribute('tabindex', '0')
      navEl.setAttribute('aria-selected', 'true')
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
        navEl.setAttribute('tabindex', '-1')
        navEl.setAttribute('aria-selected', 'false')
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");
  console.log(selectedNav, targetId)
  tabs.forEach(function(tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
}


function modalFocus(target) {
  const activeModal = document.getElementById(target.dataset.target);
  const modalContent = activeModal.querySelector('.modal-content ');
  modalContent.setAttribute('tabindex', '0')
  modalContent.focus();
  activeModal.querySelector('.modal-close').addEventListener('click', () => {
    modalContent.setAttribute('tabindex', '-1')
    target.focus()
  });
  document.addEventListener('keydown',({keyCode}) => {
    if(keyCode !== 27) return;
    modalContent.setAttribute('tabindex', '-1')
    document.getElementById(target.closest('.tab-pane').id).classList.add('is-active');
    target.focus();
  })
}

document.addEventListener('click', ({target}) => {
  if(!target.classList.contains('modal-button')) return;
  modalFocus(target);
})

