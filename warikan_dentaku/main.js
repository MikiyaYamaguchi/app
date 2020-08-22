'use strict'
{

  button.addEventListener('click', () => {
    let price = parseInt(document.getElementById('price').value);
    const people = parseInt(document.getElementById('people').value);
    const button = document.getElementById('button');
    const result = document.getElementById('result');
    const extra_result = document.getElementById('extra_result');
    const kanzi_result = document.getElementById('kanzi_result');
    const waribiki_price = document.getElementById('waribiki_price');
    const waribiki = parseInt(document.getElementById('waribiki_rate').value);
    const kiriage = parseInt(document.getElementById('kiriage').value);
    let senpai_num = parseInt(document.getElementById('senpai_num').value);
    let senpai_price = parseInt(document.getElementById('senpai_price').value);
    let woman_num = parseInt(document.getElementById('woman_num').value);
    let woman_price = parseInt(document.getElementById('woman_price').value);
    const tax = parseInt(document.getElementById('tax_rate').value);
    const tax_price = document.getElementById('tax_price');

    if (document.getElementById('price').value === "" || price <= 0) {
      alert("金額が空欄もしくは0を下回っています。入力し直してください。");
      return false;
    } else if (document.getElementById('people').value == "" || people <= 0) {
      alert("人数が空欄もしくは0を下回っています。入力し直してください。");
      return false;
    };
    if (senpai_num + woman_num > people) {
      alert("女子・酒が飲めない人と先輩・上司の合計人数が入力した人数を上回ってしまっています。入力し直してください。");
    }

    if (price < people) {
      alert("人数が金額を上回っています。入力し直してください。");
      return false;
    }

    let waribiki_answer;
    let answer;
    let extra;
    let kanzi_price;
    let senpai_answer;
    let woman_answer;
    let tax_answer;

    if (document.getElementById('senpai_num').value == "" || document.getElementById('senpai_price').value == "") {
      senpai_price = 0;
      senpai_num = 0;
    }
    if (document.getElementById('woman_num').value == "" || document.getElementById('woman_price').value == "") {
      woman_price = 0;
      woman_num = 0;
    }
    if (document.forms.tax.checked) {
      price = Math.ceil(price * ((tax / 100) + 1));
      tax_answer = price;
    };

    if (document.forms.waribiki.checked) {
      waribiki_answer = Math.ceil(price - (price * (waribiki / 100)));
      const x = waribiki_answer - ((senpai_price * senpai_num) - (woman_price * woman_num));
      answer = Math.ceil((x / people) / kiriage) * kiriage;
      extra = (answer * people) - x;
      kanzi_price = answer - extra;
      senpai_answer = answer + senpai_price;
      woman_answer = answer - woman_price;
    } else {
      const x = price - ((senpai_price * senpai_num) - (woman_price * woman_num));
      answer = Math.ceil((x / people) / kiriage) * kiriage;
      extra = (answer * people) - x;
      kanzi_price = answer - extra;
      senpai_answer = answer + senpai_price;
      woman_answer = answer - woman_price;
    };

    if (kanzi_price <= 0) {
      alert("幹事の支払金額が0を下回っています。入力内容が適切ではありません。");
      return false;
    };
    result.textContent = answer;
    extra_result.textContent = extra;
    kanzi_result.textContent = kanzi_price;
    waribiki_price.textContent = waribiki_answer;
    senpai_result.textContent = senpai_answer;
    woman_result.textContent = woman_answer;
    tax_price.textContent = tax_answer;
    if (senpai_num == people) {
      senpai_result.textContent = answer;
    }
    if (woman_num == people) {
      woman_result.textContent = answer;
    }
  });

// ---------------------------
// modal
// ---------------------------

const open = document.getElementById('open');
const close = document.getElementById('close');
const modal = document.getElementById('modal');
const mask = document.getElementById('mask');

open.addEventListener('click', () => {
modal.classList.remove('hidden');
mask.classList.remove('hidden');
});
close.addEventListener('click', () => {
modal.classList.add('hidden');
mask.classList.add('hidden');
});
mask.addEventListener('click', () => {
// modal.classList.add('hidden');
// mask.classList.add('hidden');
close.click();
});
}
