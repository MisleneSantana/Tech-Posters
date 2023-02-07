import { users, posts, suggestUsers } from "./database.js";

// 1 - renderArrSuggestUsers() - Função responsável por renderizar a seção de sugestão de usuários (arr suggestUsers):
function renderArrSuggestUsers(array) {
    let listSuggestUsers = document.querySelector('.header__suggestionUsers');

    listSuggestUsers.innerHTML = ''; //Limpar minha ul-list

    array.forEach((suggestUser) => {
        let createCardSuggestUser = createCardSuggestUsers(suggestUser);

        listSuggestUsers.appendChild(createCardSuggestUser);
    });
    return listSuggestUsers;
};

// 2 - createCardSuggestUsers() - Função responsável por criar o card suggestUser via DOM:
function createCardSuggestUsers(suggestUser) {
    let listSuggestUser = document.createElement('li');
    let buttonFollow = document.createElement('button');
    let buttonFollowing = document.createElement('button');

    buttonFollow.setAttribute('class', 'header__suggestionUser--follow');
    buttonFollow.innerText = 'Seguir';
    buttonFollowing.setAttribute('class', 'header__suggestionUser--following');
    buttonFollowing.innerText = 'Seguindo';

    listSuggestUser.append(createDataUser(suggestUser), buttonFollow, buttonFollowing);

    return listSuggestUser;
};

// 3 - createDataUser() - Função responsável por criar os dados do "user", que se repetem em toda a aplicação:
function createDataUser(suggestUser) {

    let containerUser = document.createElement('div');
    let containerImg = document.createElement('figure');
    let imgUser = document.createElement('img');
    let containerUserData = document.createElement('div');
    let userName = document.createElement('p');
    let userStack = document.createElement('small');
    containerUser.setAttribute('class', 'userData');
    containerUser.id = `user_${suggestUser.id}`;
    imgUser.src = suggestUser.img;
    imgUser.alt = suggestUser.user;
    userName.innerText = suggestUser.user;
    userStack.innerText = suggestUser.stack;
    containerUser.append(containerImg, containerUserData);
    containerImg.append(imgUser);
    containerUserData.append(userName, userStack);

    return containerUser;
};

// 4 - renderArrPosts() - Função responsável por renderizar a lista de objetos (arr - posts).
function renderArrPosts(array) {
    let listPosts = document.querySelector('.main__cardPost');

    listPosts.innerHTML = ''; //Limpar minha ul-list

    array.forEach((post) => {
        let itemPost = createCardPost(post);

        listPosts.appendChild(itemPost);
    });
    return listPosts;
};

// 5 - createCardPost() - Função responsável por criar o card post via DOM -> | -> Ao invés de adicionar eventListener ao button dentro desta função, criei uma nova função específica para esta ação (9 - Função evento button "Abrir Post").
function createCardPost(post) {
    let listPost = document.createElement('li');
    let postTitle = document.createElement('h1');
    let contentPost = document.createElement('p');
    let containerFooterPost = document.createElement('div');
    let buttonOpenModal = document.createElement('button');
    let imgDislike = document.createElement('img');
    let imgLike = document.createElement('img');
    let countLike = document.createElement('small');

    listPost.id = `post_${post.id}`;
    listPost.setAttribute('class', 'main__post');
    postTitle.innerText = post.title;
    contentPost.innerText = post.text;
    containerFooterPost.setAttribute('class', 'main__post--buttonModal');
    buttonOpenModal.id = `showModal_${post.id}`;
    buttonOpenModal.innerText = 'Abrir Post';
    imgDislike.src = 'src/assets/img/Vector (2).svg';
    imgDislike.alt = 'heart-icon';
    imgLike.src = 'src/assets/img/Vector (1).svg';
    imgLike.alt = 'heart-icon-red';
    countLike.innerText = post.likes;

    listPost.append(createDataUser(post), postTitle, contentPost, containerFooterPost);
    containerFooterPost.append(buttonOpenModal, imgDislike, imgLike, countLike);

    addEventButtonOpenPost(buttonOpenModal, post); //Evento button showModal
    addEventLike(imgLike, countLike); //Evento para cada img like
    addEventDislike(imgDislike, countLike); //Evento para cada img dislike

    return listPost;
};

// 6 - renderNewPost() - Função responsável por renderizar o novo post:
function renderNewPost() {
    let header = document.querySelector('.header__container');

    header.appendChild(createNewPost());

};

// 7 - createNewPost() - Função responsável por renderizar o novo post:
function createNewPost() {

    let sectionNewPost = document.createElement('section');
    let containerDataUser = createDataUser(users[0]);
    let form = document.createElement('form');
    let inputTitle = document.createElement('input');
    let inputText = document.createElement('textarea');
    let btnNewPost = document.createElement('button');

    sectionNewPost.setAttribute('class', 'header__sectionCreatePost');
    form.setAttribute('class', 'header__newPost');

    inputTitle.setAttribute('class', 'header__title');
    inputTitle.type = 'text';
    inputTitle.placeholder = 'Digitar título do post';
    inputTitle.required = true;

    inputText.setAttribute('class', 'header__text');
    inputText.placeholder = 'Digitar descrição do post';
    inputText.required = true;

    btnNewPost.setAttribute('class', 'btn-newPost');
    btnNewPost.type = 'button';
    btnNewPost.innerText = 'Postar';

    sectionNewPost.append(containerDataUser, form);
    form.append(inputTitle, inputText, btnNewPost);

    return sectionNewPost;
};

// 8 - addNewPost() - Adicionar novo post no main-container, abaixo dos demais posts:
function addNewPost(array, user) {
    let buttonPost = document.querySelector('.btn-newPost');
    let inputTitle = document.querySelector('.header__title');
    let inputText = document.querySelector('.header__text');

    buttonPost.addEventListener('click', (event) => {

        let newPost =
        {
            id: array.length + 1,
            title: inputTitle.value,
            text: inputText.value,
            user: user.user,
            stack: user.stack,
            img: user.img,
            likes: 0,
        };

        array.push(newPost);
        renderArrPosts(array);

        inputTitle.value = ''; //Reset value input
        inputText.value = '';  //Reset value textarea
    });

};

// 9 - ()renderModal - Renderiza modal via DOM:
function renderModal() {
    let modal = document.querySelector('#modalControl');
    let containerModal = document.createElement('div');
    let containerUser = document.createElement('user');
    let userPhoto = document.createElement('img');
    let userName = document.createElement('p');
    let userStack = document.createElement('small');
    let buttonCloseModal = document.createElement('img');
    let titlePost = document.createElement('h1');
    let textPost = document.createElement('p');

    containerModal.setAttribute('class', 'modal__container');
    containerUser.setAttribute('class', 'modal__user');
    userPhoto.setAttribute('class', 'modal__image');
    userName.setAttribute('class', 'modal__userName');
    userStack.setAttribute('class', 'modal__userStack');
    buttonCloseModal.setAttribute('class', 'modal__closeModal');
    buttonCloseModal.src = 'src/assets/img/x (1).svg';
    buttonCloseModal.alt = 'X-icon';
    titlePost.setAttribute('class', 'modal__title');
    textPost.setAttribute('class', 'modal__contentPost');

    modal.appendChild(containerModal);
    containerModal.append(containerUser, buttonCloseModal, titlePost, textPost);
    containerUser.append(userPhoto, userName, userStack);

    addEventCloseModal();     // Fechando o modal
};

// 10 - addEventButtonOpenPost() - Função criar evento de click no button "Abrir Post"  | Chamei a função (11 - OpenModal());
function addEventButtonOpenPost(buttonOpenModal, post) {

    buttonOpenModal.addEventListener('click', () => {
        OpenModal(post); //Chamando a função abrir modal
    });
};

// 11 - OpenModal() - Função renderiza post e abre modal com o mesmo:
function OpenModal(post) {

    updateModal(post); //Chamando função que renderiza post conforme click.

    let modal = document.querySelector('#modalControl');

    modal.showModal(); //Abrindo o modal
};

// 12 - updateModal() - A função renderiza post correto no modal, conforme evento de click:
function updateModal(post) {

    let userPhoto = document.querySelector('.modal__image');
    let userName = document.querySelector('.modal__userName');
    let userStack = document.querySelector('.modal__userStack');
    let modalTitle = document.querySelector('.modal__title');
    let modalPost = document.querySelector('.modal__contentPost');

    userPhoto.src = post.img;
    userPhoto.alt = post.user;
    userName.innerText = post.user;
    userStack.innerText = post.stack;
    modalTitle.innerText = post.title;
    modalPost.innerText = post.text;
};

// 13 - closeModal() - Função adiciona evento de click ao button X, que adiciona o método close ao modal:
function addEventCloseModal() {
    let modal = document.querySelector('#modalControl');
    let buttonCloseModal = document.querySelector('.modal__closeModal');

    buttonCloseModal.addEventListener('click', (event) => {
        modal.close();
    });
};

// 14 - addEventLike() - Soma 1 like ao evento de click:
function addEventLike(imgLike, countLike) {
    imgLike.addEventListener('click', (event) => {
        let numberLikes = parseInt(countLike.innerText) + 1;

        countLike.innerText = numberLikes;
    });
};

// 15 - addEventDislike() - Soma 1 like ao evento de click:
function addEventDislike(imgDislike, countLike) {
    imgDislike.addEventListener('click', (event) => {
        let numberLikes = parseInt(countLike.innerText) - 1;

        countLike.innerText = numberLikes;
    });
}

renderArrSuggestUsers(suggestUsers);
renderArrPosts(posts);
renderNewPost();
addNewPost(posts, users[0]);
renderModal();