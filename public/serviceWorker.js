const CACHE_NAME = 'my-site-cache-v1';
const URLS = [
  '/',
  '/index.html',
  '/application.tsx',
  '/index.tsx',

  '/static/css/fonts.scss',
  '/static/css/main.scss',
  '/static/css/reset.scss',

  '/static/fonts/AstakhovSkin.otf',
  '/static/fonts/KeepCalm-Medium.ttf',

  '/static/images/arrows.png',
  '/static/images/background.png',
  '/static/images/enter_button.png',
  '/static/images/registeredtm.png',
  '/static/images/userphoto.png',
  '/static/images/bullet-icon.png',
  '/static/images/infinity-icon.png',

  '/store/Store.js',

  '/templates/MainTemplate/MainTemplate.tsx',
  '/templates/MainTemplate/MainTemplate.scss',

  '/views/About/About.tsx',
  '/views/About/About.scss',

  '/views/Home/Home.tsx',
  '/views/Home/Home.scss',

  '/views/Scoreboard/Scoreboard.tsx',
  '/views/Scoreboard/Scoreboard.scss',

  '/views/SignIn/SignIn.tsx',
  '/views/SignIn/SignIn.scss',

  '/views/SignUp/SignUp.tsx',
  '/views/SignUp/SignUp.scss',

  '/service/Random/Random.ts',

  '/service/RoutesMap/RoutesMap.ts',

  '/service/Transport/Transport.ts',

  '/service/Validators/index.ts',

  '/service/Validators/CheckUser/CheckUser.ts',
  '/service/Validators/isComapre/isComapre.ts',
  '/service/Validators/isEmail/isEmail.ts',
  '/service/Validators/isFill/isFill.ts',
  '/service/Validators/isLogin/isLogin.ts',
  '/service/Validators/isPassword/isPassword.ts',

  '/reducers/index.ts',

  '/reducers/Buttons/Buttons.reducers.ts',
  '/reducers/PreLoader/Preloader.reducers.ts',
  '/reducers/Scoreboard/Scoreboard.reducers.ts',
  '/reducers/User/User.reducers.ts',

  '/constants/Buttons/Buttons.constants.ts',
  '/constants/PreLoader/PreLoader.constants.ts',
  '/constants/Scoreboard/Scoreboard.constants.ts',
  '/constants/User/User.constants.ts',

  '/actions/Buttons/Buttons.actions.ts',
  '/actions/Form/Form.actions.ts',
  '/actions/PreLoader/PreLoader.actions.ts',
  '/actions/Scoreboard/Scoreboard.actions.ts',
  '/actions/User/User.actions.ts',

  '/components/Background/Background.tsx',
  '/components/Background/Background.scss',

  '/components/Button/Button.tsx',
  '/components/Button/Button.scss',

  '/components/Footer/FooterBase/FooterBase.tsx',
  '/components/Footer/FooterHelp/FooterHelp.tsx',
  '/components/Footer/FooterTeam/FooterTeam.tsx',
  '/components/Footer/Footer.tsx',
  '/components/Footer/Footer.scss',

  '/components/Form/FormButton/FormButton.tsx',
  '/components/Form/FormContent/FormContent.tsx',
  '/components/Form/FormDescription/FormDescription.tsx',
  '/components/Form/FormError/FormError.tsx',
  '/components/Form/FormHeader/FormHeader.tsx',
  '/components/Form/FormInput/FormInput.tsx',
  '/components/Form/FormLabel/FormLabel.tsx',
  '/components/Form/Form.tsx',
  '/components/Form/Form.scss',

  '/components/Logo/LogoBase/LogoBase.tsx',
  '/components/Logo/LogoRegistration/LogoRegistration.tsx',
  '/components/Logo/LogoTitle/LogoTitle.tsx',
  '/components/Logo/Logo.tsx',
  '/components/Logo/Logo.scss',

  '/components/PreLoader/PreLoader.tsx',
  '/components/PreLoader/PreLoader.scss',

  '/components/Table/TableBase/TableBase.tsx',
  '/components/Table/TableBody/TableBody.tsx',
  '/components/Table/TableContent/TableContent.tsx',
  '/components/Table/TableElement/TableElement.tsx',
  '/components/Table/TableHeader/TableHeader.tsx',
  '/components/Table/TableRow/TableRow.tsx',
  '/components/Table/Table.tsx',
  '/components/Table/Table.scss',

  '/components/UserBlock/UserBlockBase/UserBlockBase.tsx',
  '/components/UserBlock/UserBlockButton/UserBlockButton.tsx',
  '/components/UserBlock/UserBlockIcon/UserBlockIcon.tsx',
  '/components/UserBlock/UserBlockNickName/UserBlockNickName.tsx',
  '/components/UserBlock/UserBlock.tsx',
  '/components/UserBlock/UserBlock.scss',
  '/components/UserBlock/'
];

this.addEventListener('install', event => {
  // установка
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(URLS);
      })
  );
});

this.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
