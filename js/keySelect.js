`use strict`;
const result = document.querySelector(`#result`);

document.querySelector(`ul`).onclick = (e) => {
   let targetEl = e.target;
   while (targetEl.tagName != `UL`) {
     if (targetEl.tagName == `LI`) {
       result.innerHTML = targetEl.innerHTML;
     }
     targetEl = targetEl.parentNode;
   }
}

const keySelect = (container) => {

  // const forms = Array.from(document.querySelectorAll(`form`));
  // forms.forEach((form)=>{
  //   if (form.contains(container)) {
  //     form.onkeydown = (event) => {
  //       if (event.keyCode == 13) {
  //         event.preventDefault();
  //       }
  //     }
  //   }
  // });
  let currentItem =  0;
  const items = Array.from(container.children);
  items.forEach((item)=>{
    item.tabIndex = 0;

  });

  container.onmouseover = (e) => {

    e.target.focus();
    items.forEach((item, index)=>{
      item.onfocus = () => {
        currentItem = index;
      }
    });

  }

  const setBlur = () => {
    items[currentItem].blur();
  }
  const setFocus = () => {
    items[currentItem].focus();
  }

  const goUp = () => {
    if (currentItem <=0) {
      return;
    }
    setBlur();
    currentItem --;
    setFocus();
  }
  const goDown = () => {
    if (currentItem >= items.length - 1) {
      return;
    }
    setBlur();
    currentItem ++;
    setFocus();
  }
  const selectItem = () => {
    let event = new Event ('click',{bubbles: true});
    items[currentItem].dispatchEvent(event);
    currentItem = 0;
  }
  const hideAll = () => {
    container.innerHTML = '';
    container.style.display = 'none';
    currentItem = -1;
  }

  document.addEventListener('keydown', function(event){
    switch (event.keyCode) {
      case 38: // arrow up
        goUp();
        break;
      case 40:  // arrow down
        goDown();
        break;
      case 13: // enter
        selectItem();
        break;
      case 27: // esc
        hideAll();
        break;
    }
  });

}
keySelect(document.querySelector(`ul`));
