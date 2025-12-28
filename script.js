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
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  scrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // リンクのデフォルト動作（瞬時のジャンプ）をキャンセル
      e.preventDefault();

      // ナビリストから 'is-open' クラスを削除して、PC表示（display: block;）を優先させる
      mainNav.classList.remove("is-open");
      // 必要であれば、アイコンの見た目を「X」などに変えるためのクラスをトグルしても良い
      menuToggle.classList.toggle("is-active");

      // リンクの href 属性からターゲットの ID を取得
      const targetId = this.getAttribute("href");

      // ターゲット要素を取得
      const targetElement = document.querySelector(targetId);
      const headerHeight = 90; // 固定ヘッダーの高さ (px)

      if (targetElement) {
        // ターゲット要素の上端からドキュメント上端までのピクセル数を取得
        const targetPosition = targetElement.offsetTop;

        // スムーズスクロールで移動したい最終位置を計算
        // targetPosition から headerHeight を引く
        const scrollToPosition = targetPosition - headerHeight;

        // window.scrollTo() を使用してスクロールを実行
        window.scrollTo({
          top: scrollToPosition, // 計算した位置にスクロール
          behavior: "smooth", // スムーズアニメーションを有効化
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
    const oneThirdOfScreen = document.body.scrollHeight / 4;
    // console.log("oneThirdOfScreen: " + oneThirdOfScreen);
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
    'url("img/e-1.jpg")',
    'url("img/e-3.jpg")',
    'url("img/e-9.jpg")',
    'url("img/e-17.jpg")',
    'url("img/e-18.jpg")',
    'url("img/e-20.jpg")',
    'url("img/e-22.jpg")',
    'url("img/e-23.jpg")',
    'url("img/e-24.jpg")',
    'url("img/e-25.jpg")',
    'url("img/e-26.jpg")',
    'url("img/e-27.jpg")',
    'url("img/e-28.jpg")',
    'url("img/e-29.jpg")',
    'url("img/e-21.jpg")',
    'url("img/e-30.jpg")',
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

document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxImageWrapper = document.querySelector(
    ".lightbox-image-wrapper"
  );
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const closeBtn = document.querySelector(".close-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const triggers = document.querySelectorAll(".lightbox-trigger");

  // 💡 新しく追加した要素の取得
  const captionText = document.getElementById("caption-text");
  const pageCounter = document.getElementById("page-counter");

  // 💡 全画像データ: コメント (caption) を追加
  const allImageData = {
    A: [
      // { src: "img/a-2.jpg", alt: "A-2", caption: "" },
      // { src: "img/a-3.jpg", alt: "A-3", caption: "" },
      // { src: "img/a-4.jpg", alt: "A-4", caption: "" },
      // { src: "img/a-5.jpg", alt: "A-5", caption: "" },
      {
        src: "img/a-6.jpg",
        alt: "A-6",
        caption: "他施工例も掲載しております。ご確認ください。",
      },
      { src: "img/a-8.jpg", alt: "A-8", caption: "" },
      // { src: "img/a-7.jpg", alt: "A-7", caption: "" },
      // { src: "img/a-9.jpg", alt: "A-9", caption: "" },
      // { src: "img/a-10.jpg", alt: "A-10", caption: "" },
      // { src: "img/a-11.jpg", alt: "A-11", caption: "" },
      { src: "img/a-21.jpg", alt: "A-21", caption: "" },
      { src: "img/a-22.jpg", alt: "A-22", caption: "" },
      { src: "img/a-23.jpg", alt: "A-23", caption: "" },
      { src: "img/a-24.jpg", alt: "A-24", caption: "" },
      { src: "img/a-25.jpg", alt: "A-25", caption: "" },
      { src: "img/a-1.jpg", alt: "A-1", caption: "" },
      // ... 他のAカテゴリ画像
    ],
    B: [
      // { src: "img/b-1.jpg", alt: "B-1", caption: "" },
      {
        src: "img/b-3.jpg",
        alt: "B-3",
        caption: "他施工例も掲載しております。ご確認ください。",
      },
      // { src: "img/b-4.jpg", alt: "B-4", caption: "" },
      { src: "img/b-5.jpg", alt: "B-5", caption: "" },
      // { src: "img/b-6.jpg", alt: "B-6", caption: "" },
      { src: "img/b-7.jpg", alt: "B-7", caption: "" },
      {
        src: "img/b-2.jpg",
        alt: "B-2",
        caption: "",
      },
      // { src: "img/b-8.jpg", alt: "B-8", caption: "" },
      // { src: "img/b-9.jpg", alt: "B-9", caption: "" },
      // { src: "img/b-10.jpg", alt: "B-10", caption: "" },
      // { src: "img/b-11.jpg", alt: "B-11", caption: "" },
      // { src: "img/b-12.jpg", alt: "B-12", caption: "" },
      // { src: "img/b-13.jpg", alt: "B-13", caption: "" },
      // { src: "img/b-14.jpg", alt: "B-14", caption: "" },
      // { src: "img/b-15.jpg", alt: "B-15", caption: "" },
      // { src: "img/b-16.jpg", alt: "B-16", caption: "" },
      // { src: "img/b-17.jpg", alt: "B-17", caption: "" },
      // { src: "img/b-18.jpg", alt: "B-18", caption: "" },
      // ... 他のBカテゴリ画像
      // { src: "img/c-1.jpg", alt: "C-1", caption: "" },
      // { src: "img/c-2.jpg", alt: "C-2", caption: "" },
      // ... 他のCカテゴリ画像
      // { src: "img/k-1.jpg", alt: "K-1", caption: "" },
      // ... 他のKカテゴリ画像
    ],
    D: [
      // { src: "img/d-1.jpg", alt: "D-1", caption: "" },
      {
        src: "img/d-3.jpg",
        alt: "D-3",
        caption: "他施工例も掲載しております。ご確認ください。",
      },
      { src: "img/d-4.jpg", alt: "D-4", caption: "" },
      // { src: "img/d-5.jpg", alt: "D-5", caption: "" },
      { src: "img/d-6.jpg", alt: "D-6", caption: "" },
      { src: "img/d-2.jpg", alt: "D-2", caption: "" },
      // ... 他のDカテゴリ画像
    ],
    E: [
      { src: "img/e-1.jpg", alt: "E-1", caption: "" },
      { src: "img/e-2.jpg", alt: "E-2", caption: "" },
      { src: "img/e-3.jpg", alt: "E-3", caption: "" },
      { src: "img/e-4.jpg", alt: "E-4", caption: "" },
      { src: "img/e-5.jpg", alt: "E-5", caption: "" },
      { src: "img/e-6.jpg", alt: "E-6", caption: "" },
      { src: "img/e-7.jpg", alt: "E-7", caption: "" },
      { src: "img/e-8.jpg", alt: "E-8", caption: "" },
      { src: "img/e-9.jpg", alt: "E-9", caption: "" },
      { src: "img/e-10.jpg", alt: "E-10", caption: "" },
      { src: "img/e-11.jpg", alt: "E-11", caption: "" },
      { src: "img/e-12.jpg", alt: "E-12", caption: "" },
      { src: "img/e-14.jpg", alt: "E-14", caption: "雨の日も..." },
      { src: "img/e-13.jpg", alt: "E-13", caption: "晴れの日も..." },
      { src: "img/e-19.jpg", alt: "E-19", caption: "雪の日も..." },
      { src: "img/e-15.jpg", alt: "E-15", caption: "" },
      { src: "img/e-16.jpg", alt: "E-16", caption: "" },
      { src: "img/e-17.jpg", alt: "E-17", caption: "" },
      { src: "img/e-18.jpg", alt: "E-18", caption: "" },
      // { src: "img/e-20.jpg", alt: "E-20", caption: "" },
      { src: "img/e-22.jpg", alt: "E-22", caption: "" },
      { src: "img/e-23.jpg", alt: "E-23", caption: "" },
      { src: "img/e-24.jpg", alt: "E-24", caption: "" },
      { src: "img/e-25.jpg", alt: "E-25", caption: "約50年前...（１）" },
      { src: "img/e-26.jpg", alt: "E-26", caption: "約50年前...（２）" },
      { src: "img/e-27.jpg", alt: "E-27", caption: "約50年前...（３）" },
      { src: "img/e-28.jpg", alt: "E-28", caption: "約50年前...（４）" },
      { src: "img/e-29.jpg", alt: "E-29", caption: "約50年前...（５）" },
      { src: "img/e-21.jpg", alt: "E-21", caption: "現在74歳" },
      { src: "img/e-30.jpg", alt: "E-30", caption: "" },
      // ... 他のEカテゴリ画像
    ],
  };

  let currentCategory = null;
  let currentCategoryImages = [];
  let currentIndex = 0;
  const animationDuration = 300;

  // 💡 画像を表示する関数 (アニメーションを伴う)
  function showImage(index, animate = true) {
    if (index >= 0 && index < currentCategoryImages.length) {
      currentIndex = index;

      // 1. フェードアウト
      if (animate) {
        lightboxImageWrapper.classList.remove("show");
      }

      // 2. フェードアウト完了を待って画像を切り替え
      setTimeout(
        () => {
          const image = currentCategoryImages[currentIndex];
          lightboxImage.src = image.src;
          lightboxImage.alt = image.alt;

          // 💡 コメントとページカウンターの更新
          captionText.textContent = image.caption || ""; // コメントがなければ空欄

          const total = currentCategoryImages.length;
          // ページ番号を「現在のインデックス + 1 / 全体数」の形式で表示
          pageCounter.textContent = `${currentIndex + 1} / ${total}`;

          // 3. フェードイン
          if (animate) {
            lightboxImageWrapper.classList.add("show");
          }
        },
        animate ? animationDuration : 0
      );
    }
  }

  // ➡️ 次の画像へ
  function nextImage() {
    // 最後の画像なら最初に戻る (循環)
    const nextIndex = (currentIndex + 1) % currentCategoryImages.length;
    showImage(nextIndex);
  }

  // ⬅️ 前の画像へ
  function prevImage() {
    // 最初の画像なら最後に戻る (循環)
    const prevIndex =
      (currentIndex - 1 + currentCategoryImages.length) %
      currentCategoryImages.length;
    showImage(prevIndex);
  }

  // ❌ ライトボックスを閉じる処理
  const closeLightbox = () => {
    // 画像をフェードアウト
    lightboxImageWrapper.classList.remove("show");

    // アニメーションが完了するのを待ってからライトボックス全体を閉じる（フェードアウト）
    setTimeout(() => {
      lightbox.classList.remove("active");
      lightbox.classList.remove("human-image");
      lightboxCaption.classList.remove("human-image");
      closeBtn.classList.remove("human-image");
      // 閉じた後、状態をリセット
      currentCategory = null;
      currentCategoryImages = [];
    }, animationDuration);
  };

  // 🖼️ トリガー (サムネイル) クリック時の処理
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      // リンクからカテゴリとインデックスを取得
      const category = trigger.getAttribute("data-category");
      const index = parseInt(
        trigger.getAttribute("data-index-in-category"),
        10
      );

      // 💡 カテゴリを特定し、表示する画像の配列を準備
      if (allImageData[category]) {
        currentCategory = category;
        currentCategoryImages = allImageData[category];
      } else {
        console.error(
          `指定されたカテゴリ (${category}) のデータが見つかりません。`
        );
        return;
      }

      // ライトボックスを開く (activeクラス追加)
      lightbox.classList.add("active");
      if (currentCategory === "E") {
        lightbox.classList.add("human-image"); // 💡 背景色変更クラス追加
        lightboxCaption.classList.add("human-image");
        closeBtn.classList.add("human-image");
      }

      // 最初の画像を表示
      showImage(index, true);
    });
  });

  // 閉じるボタン、次へ/前へボタン、暗い部分クリック、Escキーのイベントリスナー設定
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.classList.contains("active")) {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape" || e.key === "Backspace") {
        // ブラウザの戻る動作を防ぐ
        e.preventDefault();
        closeLightbox();
      }
    }
  });

  let touchStartX = 0;
  let touchEndX = 0;

  // タッチ開始時の位置を記録
  lightboxImageWrapper.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  // タッチ終了時の位置を比較してスワイプ判定
  lightboxImageWrapper.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    const threshold = 50; // スワイプと判定する最小距離（ピクセル）

    if (swipeDistance > threshold) {
      // 右へスワイプ ＝ 前の画像へ
      prevImage();
    } else if (swipeDistance < -threshold) {
      // 左へスワイプ ＝ 次の画像へ
      nextImage();
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // 要素を取得
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  // ハンバーガーアイコンがクリックされた時の処理
  menuToggle.addEventListener("click", function () {
    // ナビゲーションリストに 'is-open' クラスを付け外しする
    // CSSの .nav.is-open のスタイルが適用され、表示が切り替わる
    mainNav.classList.toggle("is-open");

    // 必要であれば、アイコンの見た目を「X」などに変えるためのクラスをトグルしても良い
    menuToggle.classList.toggle("is-active");
  });

  // 画面サイズが変更された時の処理（リサイズ時の表示制御）
  window.addEventListener("resize", function () {
    // 1200px以上のとき
    if (window.innerWidth >= 1200) {
      // ナビリストから 'is-open' クラスを削除して、PC表示（display: block;）を優先させる
      mainNav.classList.remove("is-open");
    }
  });

  // 初期ロード時にも一度実行
  if (window.innerWidth >= 1200) {
    mainNav.classList.remove("is-open");
  }
});
