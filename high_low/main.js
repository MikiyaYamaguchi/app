'use strict'; 
{
  const higher = document.getElementById('higher'); //HIGHボタンを取得
  const lower = document.getElementById('lower'); //LOWボタンを取得
  const dealerCard = document.getElementById('dealer_card'); //ディーラーカードを取得
  const playerCard = document.getElementById('player_card'); //プレイヤーカードを取得
  const cardWrap = document.getElementById('card_wrap'); //div#card_wrapを取得
  const result = document.getElementById('result'); //結果表示を取得
  const retry = document.getElementById('retry'); //リトライボタンを取得

  let dealerValue;
  let playerValue;

  let getRandom = () => { //ランダム整数値を得るための関数
    return Math.floor(Math.random() * 13 + 1); //１〜１３までのランダムな整数値を生成
  };

  let init = () => { //初期化関数
    dealerValue = getRandom(); //dealerValueにランダムな結果を設定
    dealerCard.textContent = dealerValue; //ディーラーカードのtextcontentにdealerValueをセット
    playerValue = getRandom(); //playerValueにランダムな結果を設定
    playerCard.textContent = playerValue; //プレイヤーカードのtextcontentにplayerValueをセット
    cardWrap.removeEventListener('transitionend', init);
  };

  let check = (guess) => { //check関数、数字の大小の比較結果により、結果を表示
    let str;
    if (cardWrap.classList.contains('open')) { //ボタンクリック後、ボタンを再度押せなくする
      return;
    }
    cardWrap.classList.add('open'); //プレイヤーカードをめくる
    higher.classList.add('disabled');
    lower.classList.add('disabled');
    if (playerValue === dealerValue) { //もし、数が一緒だったら"DRAW..."と表示
      str = "DRAW...";
    } else {
      str = `YOU ${getResultStr(guess)}`; //そうじゃなかった場合、getResultStr関数を発火して結果を表示
    }
    result.textContent = str; //結果表示エリアに結果を出力
    result.classList.remove('hidden');
  };

  let getResultStr = (guess) => { //getResultStr関数、数字の大小に応じて勝ち負けを判定
    if (
      playerValue > dealerValue && guess === 'higher' || //プレイヤーカードの数がディーラーカードの数より大きく、なおかつ、HIGHボタンを押していたら
      playerValue < dealerValue && guess === 'lower') { //プレイヤーカードの数がディーラーカードの数より小さく、なおかつ、LOWボタンを押していたら
      return 'WIN!!!'; //"WIN!!!という文字を返す
    } else {
      return 'LOSE...'; //"LOSE..."という文字を返す
    }
  };

  init(); //初期化関数発火

  higher.addEventListener('click', () => { //HIGHボタンクリックイベント
    check('higher'); //check関数発火、引数にhigherをセット
  });

  lower.addEventListener('click', () => { //LOWボタンクリックイベント
    check('lower'); //check関数発火、引数にlowerをセット
  });

  retry.addEventListener('click', () => { //リトライボタンクリックイベント
    result.classList.add('hidden');
    cardWrap.classList.remove('open');
    higher.classList.remove('disabled');
    lower.classList.remove('disabled');
    cardWrap.addEventListener('transitionend', init);
  });

}
