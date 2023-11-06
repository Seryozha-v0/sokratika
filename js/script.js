const lessonThemeTipsArray = [
  'Генетика', 'Анатомия человека', 'Вулканы', 'Зимние виды спорта', 'Индийская культура', 'Радуга', 'Пеший туризм', 'Философия', 'Вселенная', 'Здоровые привычки', 'Бабочки', 'Белые медведи', 'Экономика', 'Финансовая грамотность', 'Фотосинтез'
];

document.addEventListener('DOMContentLoaded', () => {
  const dropdownField = document.querySelectorAll('.dropdownSelect__field');
  dropdownField.forEach((item) => {
    item.onclick = () => {
      const parent = item.closest('.dropdownSelect');
      const selectHTML = parent.querySelector('.dropdownSelect__selectOriginal');
      const menu = parent.querySelector('.dropdownSelect__menu');
      const selectedOption = parent.querySelector('.dropdownSelect__selectedOption');
      const selectedValue = selectedOption.innerText;
      const arrow = parent.querySelector('.dropdownSelect__btn');

      menu.classList.toggle('dropdownSelect__menu_open');
      arrow.classList.toggle('dropdownSelect__btn_active');

      const lastCheck = parent.querySelector('.dropdownSelect__option_checked');
      if (lastCheck) lastCheck.classList.remove('dropdownSelect__option_checked');

      const options = parent.querySelectorAll('.dropdownSelect__option');
      options.forEach((option, i) => {
        if (option.innerText === selectedValue) option.classList.add('dropdownSelect__option_checked');

        option.onclick = () => {
          selectedOption.innerText = option.innerText;
          selectHTML.selectedIndex = i;
          menu.classList.remove('dropdownSelect__menu_open');
          arrow.classList.remove('dropdownSelect__btn_active');
        }
      })
    }
  })

  const tips = document.querySelectorAll('.formStep__tipsItem');
  tips.forEach((tip) => {
    tip.onclick = () => {
      const inputName = tip.dataset.for;
      const input = document.getElementsByName(inputName)[0];
      input.value = tip.innerText;
      input.focus();
    }
  })

  const tipMoreBtns = document.querySelectorAll('.formStep__tipsMore');
  tipMoreBtns.forEach((moreBtn) => {
    moreBtn.onclick = () => {
      const tipsParent = moreBtn.parentElement;
      const tipsList = tipsParent.firstElementChild;
      const tipsCount = tipsList.children.length - 1;
      const newTips = lessonThemeTipsArray.slice(tipsCount, tipsCount + 6);


      newTips.forEach((item) => {
        const li = document.createElement('li');
        li.classList.add('formStep__tipsItem');
        li.dataset.for = 'lessonTheme';
        li.innerText = item;
        li.onclick = () => {
          const inputName = li.dataset.for;
          const input = document.getElementsByName(inputName)[0];
          input.value = li.innerText;
          input.focus();
        }
        tipsList.appendChild(li);
      })

      if (lessonThemeTipsArray.length < tipsCount + 7) moreBtn.remove();
    }
  })

  const inputs = document.querySelectorAll('.formStep__input');
  inputs.forEach((input) => {
    const handleClearBtn = () => {
      const form = document.querySelector('#lessonFormStep1');
      const fields = form.querySelectorAll('input, select, textarea');
      checkForm(fields);

      const parent = input.closest('.formStep__field');
      const currClearBtn = parent.querySelector('.formStep__clear');

      if (!input.value.trim()) {
        return currClearBtn ? currClearBtn.remove() : false;
      };

      if (currClearBtn) return false;

      const clearBtn = document.createElement('div');
      clearBtn.classList.add('formStep__clear');
      clearBtn.onclick = () => {
        input.value = '';
        clearBtn.remove();
        input.focus();
        checkForm(fields);
      }
      parent.appendChild(clearBtn);
    }
    input.oninput = handleClearBtn;
    input.onfocus = handleClearBtn;
  })

  const textareas = document.querySelectorAll('.formStep__textarea');
  textareas.forEach((textarea) => {
    textarea.oninput = () => {
      const parent = textarea.closest('.formStep__fieldWithCount');
      const showMessage = parent.querySelector('.formStep__fieldMessage');
      const showCount = parent.querySelector('.formStep__currentSymbols');
      const count = textarea.value.trim().length

      showCount.innerText = count;

      if (count > 200) {
        parent.classList.add('formStep__fieldWithCount_error');
        showMessage.innerText = 'Enter your name'
      } else {
        parent.classList.remove('formStep__fieldWithCount_error');
        showMessage.innerText = '';
      }

      const form = document.querySelector('#lessonFormStep1');
      const fields = form.querySelectorAll('input, select, textarea');
      checkForm(fields);
    }
  })

  const form = document.querySelector('#lessonFormStep1');
  const fields = form.querySelectorAll('input, select, textarea');
  const simpleField = form.querySelectorAll('select');
  simpleField.forEach((field) => {
    field.oninput = () => {
      checkForm(fields);
    }
    field.onfocus = () => {
      checkForm(fields);
    }
  })

  function checkForm(fields) {
    let checked = true;

    fields.forEach((field) => {
      if (!checkFields(field)) {
        return checked = false;
      }
    })

    const subBtn = form.querySelector('.formStep__nextStep');

    if (checked) {
      subBtn.setAttribute('disabled', 'false');
      subBtn.classList.remove('formStep__btn_disable');
      return true;
    }
    subBtn.setAttribute('disabled', 'true');
    subBtn.classList.add('formStep__btn_disable');
  }

  function checkFields(field) {
    if (!field.value.trim()) return false;
    if (field.type = 'textarea' && field.value.trim().length > 200) return false;

    return true;
  }
})