'use strict';
// for teachers
const allInputs = Array.from(document.querySelectorAll('input[name^="unitvalue"]'));

const stringArr = JSON.parse(document.querySelector('input[name^="units-array"]').value);

    let arr_new = [];
    for(var x in stringArr ){
        arr_new.push(stringArr[x])
    }

const autocomplete = (inputSelector, targetArray) => {

    const outerBlock = document.createElement(`ul`);
    outerBlock.classList.add('compl__outer');
    const outerItem = document.createElement(`li`);
    outerItem.classList.add('compl__outer-item');
    let outerBlockPrevStep;

    inputSelector.autocomplete = `off`;
    inputSelector.parentNode.appendChild(outerBlock);

    outerBlock.style.top = inputSelector.offsetTop + inputSelector.offsetHeight + 10 + 'px';
    // outerBlock.style.left = inputSelector.offsetLeft  + 'px';
    outerBlock.style.right = inputSelector.offsetRight  + 'px';
    outerBlock.style.width = inputSelector.clientWidth + 'px';

    inputSelector.addEventListener(`input`, function(e){

      outerBlock.innerHTML = '';
      let tempval =  this.value;
      const value =  new RegExp(`${this.value}`, `i`);

      targetArray.forEach(function(item){
        if (tempval && item.search(value) >= 0) {
          let el = outerItem.cloneNode()
          el.innerHTML = item;
          outerBlock.appendChild(el);
        }
      });

      if (outerBlock.innerHTML) {

        outerBlockPrevStep = outerBlock.innerHTML;
        outerBlock.style.display = 'block';
        keySelect(outerBlock);
        Array.from(outerBlock.childNodes).forEach(function(item){
          item.addEventListener('click', function(e){
            inputSelector.value = item.innerHTML;
            outerBlock.style.display = 'none';
          });
        });

      }else {
        setTimeout(function() {inputSelector.value = inputSelector.value.substr(0, inputSelector.value.length - 1) }, 500);
        if (outerBlockPrevStep && inputSelector.value) {
          outerBlock.innerHTML = outerBlockPrevStep;
          keySelect(outerBlock);
        }else {
          outerBlock.innerHTML = '';
          outerBlock.style.display = 'none';
        }
      }

    });

    inputSelector.addEventListener('blur', function(e){
      setTimeout(()=>{outerBlock.style.display = 'none'; outerBlock.innerHTML = '';} ,300);
    });

    const keySelect = (container) => {
      const forms = Array.from(document.querySelectorAll(`form`));
      forms.forEach((form)=>{
        if (form.contains(container)) {
          form.onkeydown = (event) => {
            if (event.keyCode == 13) {
              event.preventDefault();
            }
          }
        }
      });
      let currentItem = -1;
      const items = Array.from(container.childNodes);

      container.onmouseover = (e) => {
        items.forEach((item, index)=>{
          item.classList.remove(`aut-hover`);
          if (e.target == item) {
            currentItem = index;
          }
        });

        e.target.classList.add(`aut-hover`);
      }

      const makeHover = () => {
        items.forEach((item)=>{
          item.classList.remove(`aut-hover`);
        });
        items[currentItem].classList.add(`aut-hover`);
      }

      const goUp = () => {
        if (currentItem <=0) {
          return;
        }
        currentItem --;
        makeHover();
      }
      const goDown = () => {
        if (currentItem >= items.length - 1) {
          return;
        }
        currentItem ++;
        makeHover();
      }
      const selectItem = () => {
        let event = new Event ('click');
        items[currentItem].dispatchEvent(event);
        currentItem = -1;
      }
      const hideAll = () => {
        container.innerHTML = '';
        container.style.display = 'none';
        currentItem = -1;
      }

      document.addEventListener('keydown', function(event){
        switch (event.keyCode) {
          case 38:
            goUp();
            break;
          case 40:
            goDown();
            break;
          case 13:
            selectItem();
            break;
          case 27:
            hideAll();
            break;
        }
      });

    }

    const style = document.createElement(`style`);
    style.innerHTML = `
      .compl__outer {
        background-color: #fff;
        box-sizing: content-box;
        display: none;
        margin: 2px 0 0 0;
        border: 1px solid #ddd;
        padding: 0;
        position: absolute;
        list-style-type: none;
        z-index: 1000;
      }
      .compl__outer > li {
        padding: 10px;
        cursor: pointer;
        border-bottom: 1px solid #ddd;
      }
      .compl__outer > li.aut-hover {
        background-color: #5bc0de;
      }
    `;
    document.querySelector('body').appendChild(style);

}

allInputs.forEach((item) => {
  autocomplete(item, arr_new);
});
