document.addEventListener("DOMContentLoaded", function () {
  // .hero-contentなど、適切な親要素を指定
  const parent = document.querySelector(".hero-content");
  if (!parent) return;

  // 全ての .tile クラスを持つ要素を取得
  const tiles = parent.querySelectorAll(".tile");

  tiles.forEach((tile, index) => {
    // 各タイルに CSSカスタムプロパティ --n を設定
    // indexは0から始まるため、通し番号として index + 1 を使用
    tile.style.setProperty("--n", index + 1);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // スクロールさせたいリンク要素すべてを取得
  const scrollLinks = document.querySelectorAll(".scroll-link");

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // リンクのデフォルト動作（瞬時のジャンプ）をキャンセル
      e.preventDefault();

      // リンクの href 属性からターゲットの ID を取得
      const targetId = this.getAttribute("href");

      // ターゲット要素を取得
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // ターゲットまでスムーズにスクロール
        targetElement.scrollIntoView({
          behavior: "smooth", // スムーズなアニメーションを有効化
          block: "start", // 要素をビューポートの上端に合わせる
          // block: 'center'   // 要素をビューポートの中央に合わせることも可能
        });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollButton = document.getElementById("scrollToTopBtn");

  // ----------------------------------------------------
  // 1. スクロールによるボタンの表示/非表示を切り替える処理
  // ----------------------------------------------------
  window.addEventListener("scroll", () => {
    // 画面の高さの約1/3を計算
    const oneThirdOfScreen = document.body.scrollHeight / 3;
    console.log("oneThirdOfScreen: " + oneThirdOfScreen);
    // 現在のスクロール位置が、画面の高さの約1/3を超えたらボタンを表示
    if (
      document.body.scrollTop > oneThirdOfScreen ||
      document.documentElement.scrollTop > oneThirdOfScreen
    ) {
      scrollButton.style.display = "block";
    } else {
      scrollButton.style.display = "none";
    }
  });

  // ----------------------------------------------------
  // 2. ボタンクリックでトップへスムーズにスクロールする処理
  // ----------------------------------------------------
  scrollButton.addEventListener("click", () => {
    // window.scrollTo() を使用して、ページトップ (座標0, 0) へ移動
    // behavior: 'smooth' オプションで、滑らかなアニメーションを実現
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. 画像URLのリスト
  const images = [
    'url("img/sky.png")',
    'url("img/kkk.png")',
    'url("img/mmm.png")',
    'url("img/vvv.png")',
    'url("img/yyy.png")',
  ];

  const targetElement = document.getElementById("slideshow-bg");
  let activeLayer = targetElement.querySelector(".active-layer");
  let nextLayer = targetElement.querySelector(".next-layer");

  let currentIndex = 0;
  const intervalTime = 3000; // 3秒ごとの切り替え
  const transitionDuration = 1500; // CSSのtransition時間 (1.5秒)

  // 初回設定
  activeLayer.style.backgroundImage = images[currentIndex];
  currentIndex = (currentIndex + 1) % images.length;

  function startSlideshow() {
    setInterval(() => {
      // 1. nextLayer に次の画像をロード
      nextLayer.style.backgroundImage = images[currentIndex];

      // 2. 現在の activeLayer をぼかしながらフェードアウトさせる
      activeLayer.classList.add("blur-out-layer");

      // 3. nextLayer を activeLayer にして、フェードインさせる
      nextLayer.classList.add("active-layer");

      // 4. 次の画像へのインデックスを更新
      currentIndex = (currentIndex + 1) % images.length;

      // 5. アニメーション完了後 (1.5秒後) にクラスを入れ替えて要素の役割を逆転させる
      setTimeout(() => {
        // 古い activeLayer のクラスをリセット
        activeLayer.classList.remove("active-layer", "blur-out-layer");

        // activeLayer と nextLayer の参照を入れ替える
        const temp = activeLayer;
        activeLayer = nextLayer;
        nextLayer = temp;
      }, transitionDuration);
    }, intervalTime); // 3000ms (3秒) ごとに切り替えを開始
  }

  startSlideshow();
});
