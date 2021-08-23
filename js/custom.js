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
    openTab(e.currentTarget.id, e.currentTarget.dataset.target);
  });
  navEl.addEventListener('keydown',(e) => {
    const previousElement = arr[i-1];
    const nextElement = arr[i+1];
    const firstElement = arr[0];
    const lastElement = arr[arr.length-1]

    if(e.keyCode === 36 && previousElement) {
      e.preventDefault();
      toggleTab(firstElement.id, firstElement.dataset.target);
      firstElement.focus();
    }

    if(e.keyCode === 35 && arr[i+1]) {
      e.preventDefault();
      toggleTab(lastElement.id, lastElement.dataset.target);
      lastElement.focus();
    }

    if(e.keyCode === 37 && previousElement) {
      toggleTab(previousElement.id, previousElement.dataset.target);
      previousElement.focus();
    }

    if(e.keyCode === 39 && nextElement) {
      toggleTab(nextElement.id, nextElement.dataset.target);
      nextElement.focus();
    }

    if(e.keyCode === 32 || e.keyCode === 13) {
      e.preventDefault();
      openTab(arr[i].id, arr[i].dataset.target)
    };

  })
});

document.querySelector('.dropMenu').addEventListener('keydown', openSkipToMain);
document.querySelector('.dropMenu').addEventListener('keydown', (e)=> {
  if(e.keyCode === 27) {
    e.target.closest('.dropMenu').querySelector('ul').style.display = "none";
    e.target.closest('.dropMenu').style.height = "0px";
  }
});

const navButton = document.querySelector('.navbar-burger');

navButton.addEventListener('click', () => {
  if (navButton.getAttribute('aria-label') === 'Open menu') {
    navButton.setAttribute('aria-label', 'Close menu');
    navButton.focus();
  } else {
    navButton.setAttribute('aria-label', 'Open menu');
    navButton.focus();
  }
});

setInterval(() => document.querySelector('.chat-window').classList.toggle('active'), 5000);

function openSkipToMain (e) {
  if(e.keyCode === 13 || e.keyCode === 32) {
    e.target.closest('.dropMenu').querySelector('ul').style.display = "block";
  }
}

function openTab(selectedNav, targetId) {
  var tabs = document.querySelectorAll(".tab-pane");
  console.log(selectedNav, targetId)
  tabs.forEach(function (tab) {
    if (tab.id == targetId) {
      tab.style.display = "block";
    } else {
      tab.style.display = "none";
    }
  });
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

function closeMenu(){
  document.querySelector('.documentation-menu').classList.add('hide-menu');
  document.querySelector('.has-submenu-button').setAttribute('aria-expanded', 'false');
}
const documentationBtn = document.querySelector('.has-submenu-button');
const nextButton = documentationBtn.parentElement.nextElementSibling.querySelector('button');
const menuItems = Array.from(document.querySelectorAll('.documentation-menu a'));

function handleClick(e) {
  switch (e.key) {
    case 'Escape':
      e.preventDefault();
      closeMenu();
      documentationBtn.focus();
      break;
    case 'Tab':
      if(e.shiftKey) return;
      e.preventDefault();
      closeMenu();
      nextButton.focus();
      break;
    case 'ArrowDown':
      e.preventDefault();
      const activeIndexDown = menuItems.indexOf(document.activeElement);
      if(activeIndexDown + 1  === menuItems.length) {
        menuItems[0].focus();
      }
      else {
        menuItems[activeIndexDown + 1].focus();
      }
      break;
      case 'ArrowUp':
        e.preventDefault();
        const activeIndexUp = menuItems.indexOf(document.activeElement);
        if(activeIndexUp === 0) menuItems[menuItems.length-1].focus();
        else menuItems[activeIndexUp - 1].focus();
        break;
  }
}

function toggleSubMenu() {
  const documentationBtn = document.querySelector('.has-submenu-button');
  const isHidden = document.querySelector('.documentation-menu').classList.contains('hide-menu');

  documentationBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
  document.querySelector('.documentation-menu').classList.toggle('hide-menu', !isHidden);
  if(isHidden) menuItems[0].focus();
}

document.querySelector('.has-submenu-button')
    .addEventListener('click', toggleSubMenu);

document.querySelector('.has-submenu-button').addEventListener('keydown', (e) => {
  if(e.keyCode === 13 || e.keyCode === 32) {
    e.preventDefault();
    toggleSubMenu();
  }
})
documentationBtn.parentElement.addEventListener('keydown', handleClick);

