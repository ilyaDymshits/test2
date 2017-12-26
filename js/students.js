// for students
const autocomplete = () => {

    const inputSelectors = Array.from(document.querySelectorAll(`span.numerical-question input`));
    const setStyleError = (input) => {
      input.style.borderColor = `red`;
      input.style.outlineColor = `red`;
      input.style.color = `red`;
    }
    const setStyleInherit = (input) => {
      input.style.borderColor = ``;
      input.style.outlineColor = ``;
      input.style.color = ``;
    }
    inputSelectors.forEach(function(inputSelector){

      if (!inputSelector.dataset.list) {
        return;
      }

      const targetArray = JSON.parse(inputSelector.dataset.list);
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
        setStyleInherit(inputSelector);
        outerBlock.innerHTML = '';
        let inputValue =  this.value;

        if (inputValue.search(/\d+\D/i) === 0) {
        // if (inputValue.search(/\d+[.A-Z]/i) === 0) {

          const notDigitInputValue = inputValue.replace(/\d|[.]/g,'');
          // const notDigitInputValue = inputValue.match(/[a-z]/ig);
          const digitInputValue = inputValue.replace(/\D+/,'');
          const value =  new RegExp(`${notDigitInputValue}`, `i`);
          if (!notDigitInputValue) {
            return ;
          }

          targetArray.forEach(function(item){
            let itemParts = item.toString().split(`(`);

            if (itemParts[0].search(value) >= 0) {
              let el = outerItem.cloneNode()
              el.innerHTML = `<span class = "compl__outer-data">${itemParts[0]}</span><span class = "compl__outer-placeholder">${itemParts[1] ? '(' + itemParts[1] : ''}</span>`;
              outerBlock.appendChild(el);
            }
          });

          if (outerBlock.innerHTML) {
            outerBlockPrevStep = outerBlock.innerHTML;
            outerBlock.style.display = 'block';

            keySelect(outerBlock);

          }else {
            setStyleError(inputSelector);
            outerBlock.innerHTML = '';
            outerBlock.style.display = 'none';
          }

          const getInnerText = (e) => {
            inputSelector.value = (inputSelector.value.replace(/\D+$/g,'') + e.currentTarget.firstChild.innerHTML).trim();
            outerBlock.style.display = 'none';
          }
          const lis = Array.from(outerBlock.querySelectorAll(`li`));
          lis.map(function(el){
            el.onclick = getInnerText;
          });


        }else if (inputValue.search(/\D+/) === 0) {
          setTimeout(function() {inputSelector.value = inputSelector.value.substr(0, inputSelector.value.length - 1) }, 300);
        }

      });

      inputSelector.addEventListener('blur', function(e){
        setTimeout(function(){outerBlock.style.display = 'none'; outerBlock.innerHTML = '';} ,500);
      });

    });

    const keySelect = (container) => {
      let currentItem = -1;
      const items = Array.from(container.childNodes);

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
        let event = new Event ('click')
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
      .compl__outer > li.aut-hover,
      .compl__outer > li:hover {
        background-color: #5bc0de;
      }
      .compl__outer-placeholder {
        color: #9e9e9e;
      }
    `;
    document.querySelector('body').appendChild(style);
}
document.addEventListener("DOMContentLoaded", function(event) {
  autocomplete();
});
