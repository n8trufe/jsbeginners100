(function () {
  const btnAll = document.getElementById('all');
  const btnCakes = document.getElementById('cakes');
  const btnCupcakes = document.getElementById('cupcakes');
  const btnSweets = document.getElementById('sweets');
  const btnDoughnuts = document.getElementById('doughnuts');
  const frmInput = document.getElementById('input');
  const articles = document.getElementsByClassName('article-container');

  function toggleDisplay(display) {
    for (let article of articles) {
      article.style.display = display ? 'grid' : 'none';
    }
  }

  function displaySearch(filteredArticles) {
    toggleDisplay(false);

    for (let article of filteredArticles) {
      article.style.display = 'grid';
    }
  }

  function filterArticles(event) {
    const toFilter =
      event.target.id == 'input' ? event.target.value : event.target.id;
    const regex = new RegExp(`^${toFilter}`, 'i');

    const filteredArticles = [...articles].filter((article) => {
      return (
        regex.test(article.dataset.type) || regex.test(article.dataset.price)
      );
    });

    displaySearch(filteredArticles);
  }

  btnAll.addEventListener('click', toggleDisplay);
  btnCakes.addEventListener('click', (event) => filterArticles(event));
  btnCupcakes.addEventListener('click', (event) => filterArticles(event));
  btnSweets.addEventListener('click', (event) => filterArticles(event));
  btnDoughnuts.addEventListener('click', (event) => filterArticles(event));
  frmInput.addEventListener('input', (event) => filterArticles(event));

  for (let article of articles) {
    article.addEventListener('click', (event) => {
      const imgJumbotron = document.getElementById('img-jumbotron');
      const clickedArticle = event.target;
      const img = document.importNode(clickedArticle);

      if (imgJumbotron === null) {
        const divContainer = document.createElement('div');
        divContainer.setAttribute('id', 'container-jumbotron');

        const spanClose = document.createElement('span');
        spanClose.innerHTML =
          '<i id="close-img-jumbotron" class="fas fa-times"></i>';
        divContainer.appendChild(spanClose);

        const divImgFrame = document.createElement('div');
        divImgFrame.setAttribute('id', 'img-frame-jumbotron');

        const btnLeft = document.createElement('button');
        const btnRight = document.createElement('button');
        btnLeft.innerHTML = '<i id="btn-left" class="fas fa-chevron-left"></i>';
        btnRight.innerHTML =
          '<i id="btn-right" class="fas fa-chevron-right"></i>';
        const figure = document.createElement('figure');
        figure.setAttribute('id', 'img-jumbotron');
        divImgFrame.appendChild(btnLeft);
        divImgFrame.appendChild(img);
        divImgFrame.appendChild(btnRight);
        divContainer.appendChild(divImgFrame);

        document.getElementById('articles').appendChild(divContainer);
        // } else {
        // document
        //   .getElementById('article-jumbotron')
        //   .removeChild(imgJumbotron.firstChild);
        // document.getElementById('img-jumbotron').appendChild(img);
      }
      // articleJumbotron.style.top = window.screen.height / 2 - 250 + 'px';

      const closeJumbotron = document.getElementById('close-img-jumbotron');
      if (closeJumbotron !== null) {
        closeJumbotron.addEventListener('click', () => {
          document
            .getElementById('articles')
            .removeChild(document.getElementById('container-jumbotron'));
        });
      }
    });
  }
})();
