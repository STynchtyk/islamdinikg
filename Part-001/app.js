const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#topic-search');
const topicDirectory = document.querySelector('#topic-directory');
const topicList = document.querySelector('#topic-list');
const loadMoreTopics = document.querySelector('#load-more-topics');
const topicResults = document.querySelector('#topic-results');
const selectedTopicTitle = document.querySelector('#selected-topic-title');
const selectedTopicCount = document.querySelector('#selected-topic-count');
const backToTopics = document.querySelector('#back-to-topics');
const articleList = document.querySelector('#article-list');
const articleReader = document.querySelector('#article-reader');
const articleTitle = document.querySelector('#article-title');
const articleMeta = document.querySelector('#article-meta');
const articleContent = document.querySelector('#article-content');
const backToTopic = document.querySelector('#back-to-topic');
const recentMaterialList = document.querySelector('#recent-material-list');
const searchStatus = document.querySelector('.search-status');
const emptyState = document.querySelector('#empty-state');
const loadMoreMaterials = document.querySelector('#load-more-materials');
const resetButtons = [...document.querySelectorAll('.reset-filter')];
const cityButton = document.querySelector('#city-button');
const cityOptions = document.querySelector('#city-options');
const cityClose = document.querySelector('#city-close');
const citySearch = document.querySelector('#city-search');
const cityListStatus = document.querySelector('#city-list-status');
const cityLocations = document.querySelector('#city-locations');
const cityTitle = document.querySelector('#prayer-title');
const prayerTimes = document.querySelector('#prayer-times');
const prayerStatus = document.querySelector('#prayer-status');
const prayerRetry = document.querySelector('#prayer-retry');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const languageButton = document.querySelector('#language-button');
const languageOptions = document.querySelector('#language-options');
const languageLabel = document.querySelector('.language-label');
const description = document.querySelector('meta[name="description"]');
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const topicQueryControls = [...document.querySelectorAll('[data-topic-query]')];

const languageNames = {
  ky: 'Кыргызча',
  ru: 'Русский',
  en: 'English',
};

const localeMap = {
  ky: 'ky-KG',
  ru: 'ru-RU',
  en: 'en-US',
};

const translations = {
  ky: {
    documentTitle: 'Islamdini — Диний билимге жол',
    metaDescription: 'Islamdini — кыргызча, орусча жана англисче диний маалымат порталы.',
    skipLink: 'Негизги мазмунга өтүү',
    brandAria: 'Islamdini башкы бет',
    openMenu: 'Менюну ачуу',
    navAria: 'Негизги меню',
    navHome: 'Башкы бет',
    navTopics: 'Темалар',
    navLibrary: 'Китепкана',
    navAnswers: 'Суроо-жооп',
    navPrayer: 'Намаз убактысы',
    languageButtonAria: 'Тилди өзгөртүү',
    themeButtonToDark: 'Караңгы режимди күйгүзүү',
    themeButtonToLight: 'Жарык режимди күйгүзүү',
    headerSearch: 'Издөө',
    quickLinksAria: 'Ыкчам бөлүмдөр',
    quickQuranTitle: 'Куран',
    quickQuranCopy: 'Окуу жана түшүнүү',
    quickPrayerTitle: 'Намаз',
    quickPrayerCopy: 'Убакыт жана жол-жобо',
    quickDuaTitle: 'Дуба',
    quickDuaCopy: 'Күндөлүк дубалар',
    quickHadithTitle: 'Хадис',
    quickHadithCopy: 'Пайгамбарлардан баяндар',
    quickLibraryTitle: 'Китепкана',
    quickLibraryCopy: 'Сиздин материалдар',
    quickAnswersTitle: 'Суроо-жооп',
    quickAnswersCopy: 'Түшүнүктүү жооптор',
    quickEthicsTitle: 'Ахлак',
    quickEthicsCopy: 'Адеп жана мүнөз',
    quickMediaTitle: 'Медиа',
    quickMediaCopy: 'Тандалган баяндар',
    heroEyebrow: 'Кыргыз тилиндеги ачык билим мейкиндиги',
    heroTitle: 'Ислам — бул жарык,<br /><em>жол көрсөтүүчү нур.</em>',
    heroCopy: 'Ишеним, ибадат жана күнүмдүк турмуш тууралуу түшүнүктүү материалдарды өз ыргагыңызда окуңуз.',
    heroBrowse: 'Материалдарды кароо',
    heroPrayer: 'Бүгүнкү убакыттар',
    heroStatsAria: 'Порталдын мүмкүнчүлүктөрү',
    statTopics: '<b>67</b> тематикалык багыт',
    statTimes: '<b>6</b> намаз убактысы',
    statLanguage: '<b>КЫ</b> кыргызча мазмун',
    heroCredit: 'ISLAMDINI · 2026',
    heroOverviewKicker: 'БҮГҮНКҮ БАГЫТ',
    heroOverviewTitle: 'Намаз убактысы',
    heroOverviewCopy: 'Шаарыңызды тандап, бүгүнкү актуалдуу убакыттарды көрүңүз.',
    heroOverviewAction: 'Убакыттарды көрүү',
    finderEyebrow: 'Керектүүсүн тез табыңыз',
    finderTitle: 'Кайсы теманы издеп жатасыз?',
    searchLabel: 'Теманы издеңиз',
    searchPlaceholder: 'Мисалы: намаз, үй-бүлө, дуба…',
    searchButton: 'Издөө',
    suggestionPrayer: 'Намаз',
    suggestionDua: 'Дуба',
    suggestionFamily: 'Үй-бүлө',
    suggestionEtiquette: 'Адеп',
    suggestionFasting: 'Орозо',
    finderSuggestionsAria: 'Теманы тез тандоо',
    dailyHighlightsAria: 'Бүгүнкү пайдалуу материалдар',
    dailyVerseEyebrow: 'БҮГҮНКҮ АЯТ',
    dailyVerseCopy: 'Ар бир кыйынчылык менен бирге жеңилдик бар.',
    dailyVerseSource: '«Аш-Шарх», 6-аят',
    dailyVerseAction: 'Тафсирин окуу',
    recentEyebrow: 'АКЫРКЫ МАТЕРИАЛДАР',
    recentTitle: 'Жаңы кошулган материалдар',
    recentLoading: 'Материалдар жүктөлүүдө…',
    knowledgeEyebrow: 'ИЛИМДЕН БИР ТАМЧЫ',
    knowledgeTitle: 'Билимди күн сайын толуктаңыз',
    knowledgeCopy: 'Керектүү теманы тандап, материалды өз ыргагыңызда окуңуз.',
    knowledgeAction: 'Темаларга өтүү',
    homeActionsAria: 'Пайдалуу шилтемелер',
    actionQuranTitle: 'Куран окуу',
    actionQuranCopy: 'Тематикалык материалдар',
    actionPrayerTitle: 'Намаз убактысы',
    actionPrayerCopy: 'Өз шаарыңызды тандаңыз',
    actionAnswersTitle: 'Суроо-жооп',
    actionAnswersCopy: 'Тема боюнча жооп табыңыз',
    directionsEyebrow: 'Багыттар',
    directionsTitle: 'Кайсы жол менен баштайсыз?',
    allTopics: 'Баардык темалар',
    featureAnswersTitle: 'Суроо-жооп',
    featureAnswersCopy: 'Күнүмдүк турмушка тиешелүү суроолорго жөнөкөй түшүндүрмө.',
    featurePrayerTitle: 'Ибадат',
    featurePrayerCopy: 'Намаз, даарат, орозо жана руханий тарбия тууралуу жол көрсөтмө.',
    featureLibraryTitle: 'Китепкана',
    featureLibraryCopy: 'Материалдар тематикалык папкаларга бөлүнгөн.',
    readingEyebrow: 'ДИНИЙ ТЕМАЛАР',
    readingTitle: 'Бардык диний темалар',
    topicDirectoryCopy: 'Теманы тандаңыз — өзүнчө бетте ошол теманын материалдары ачылат.',
    topicFolderLabel: 'ТЕМА',
    topicMaterialsCount: '{count} материал',
    topicLoadMore: 'Дагы {count} тема көрсөтүү',
    topicBack: '← Бардык темалар',
    topicSelectedLabel: 'ТАНДАЛГАН ТЕМА',
    topicSelectedCount: 'Бул темада {count} материал',
    materialLabel: 'Материал',
    materialOpenText: 'Толук текстти окуу',
    materialRead: 'Окуу →',
    articleBack: '← Темага кайтуу',
    articleLabel: 'МАТЕРИАЛДЫ ОКУУ',
    translationLoading: 'Которулууда…',
    translationError: 'Котормо жүктөлгөн жок. Интернетти текшерип, кайра аракет кылыңыз.',
    translationRetry: 'Кайра которуу',
    translationNotice: 'Автоматтык котормо: терминдерде каталар болушу мүмкүн. Кыргызча түп нуска тил менюсунда жеткиликтүү.',
    materialLoadMore: 'Дагы {count} материал көрсөтүү',
    clearSearch: 'Издөөнү тазалоо',
    emptySearch: 'Бул суроо боюнча тема табылган жок.',
    prayerTopline: 'БҮГҮНКҮ УБАКЫТТАР',
    changeCity: 'Регионду тандаңыз',
    regionNotice: 'Намаз убактысы үчүн шаарды же айылды тандаңыз',
    closeCityMenu: 'Тизмени жабуу',
    citySearchLabel: 'Шаар же айыл',
    citySearchPlaceholder: 'Шаар же айылды издеңиз',
    cityListLoading: 'Шаарлар жүктөлүүдө…',
    cityListReady: 'Шаарлар жана жерлер: {count}',
    cityListEmpty: 'Мындай жер табылган жок.',
    locationBishkekCity: 'Бишкек шаары · Бишкек',
    locationOshCity: 'Ош шаары · Ош',
    locationBatkenRegion: 'Баткен облусу · Баткен',
    locationChuyRegion: 'Чүй облусу · Токмок',
    locationJalalAbadRegion: 'Жалал-Абад облусу · Манас',
    locationIssykKulRegion: 'Ысык-Көл облусу · Каракол',
    locationNarynRegion: 'Нарын облусу · Нарын',
    locationOshRegion: 'Ош облусу · Ош',
    locationTalasRegion: 'Талас облусу · Талас',
    cityBishkek: 'Бишкек',
    cityOsh: 'Ош',
    cityBatken: 'Баткен',
    cityTokmok: 'Токмок',
    cityJalalAbad: 'Манас',
    cityKarakol: 'Каракол',
    cityNaryn: 'Нарын',
    cityTalas: 'Талас',
    regionBishkekCity: 'Бишкек шаары',
    regionOshCity: 'Ош шаары',
    regionBatken: 'Баткен облусу',
    regionChuy: 'Чүй облусу',
    regionJalalAbad: 'Жалал-Абад облусу',
    regionIssykKul: 'Ысык-Көл облусу',
    regionNaryn: 'Нарын облусу',
    regionOsh: 'Ош облусу',
    regionTalas: 'Талас облусу',
    prayerLoading: 'Намаз убакыттары жүктөлүүдө…',
    prayerRefreshing: 'Убакыттар жаңыртылууда…',
    prayerCurrent: 'Актуалдуу: {date}',
    prayerFailed: 'Убакыттарды жүктөө мүмкүн болгон жок. Байланышты текшериңиз же кайра аракет кылыңыз.',
    prayerCacheSuffix: ' · сакталган маалымат',
    prayerOfficial: 'NamazVakti.com · Фажр (имсак)',
    prayerFallback: 'Резервдик астрономиялык эсеп',
    prayerCalculated: 'Координаттар боюнча астрономиялык эсеп',
    prayerCached: 'Сакталган убакыт көрсөтүлүүдө · кайра жаңыртылат',
    prayerRetry: 'Кайра жүктөө',
    prayerFajr: 'Багымдат',
    prayerSunrise: 'Күн',
    prayerDhuhr: 'Бешим',
    prayerAsr: 'Асыр',
    prayerMaghrib: 'Шам',
    prayerIsha: 'Куптан',
    next: 'кийинки',
    tomorrow: 'эртең',
    qibla: 'Кыбыла',
    quote: 'Билим — адамды<br /><strong>жакшылыкка</strong><br />жакындаткан жол.',
    libraryEyebrow: 'КИТЕПКАНА',
    libraryTitle: 'Темалар боюнча китепкана',
    libraryCopy: 'Теманы тандап, ага тиешелүү материалдарды ачыңыз.',
    libraryEmptyTitle: 'Темалар каталогу',
    libraryEmptyCopy: 'Бардык темаларды көрүп, керектүүсүн ачыңыз.',
    answersEyebrow: 'СУРОО-ЖООП',
    answersTitle: 'Көп берилген суроолор',
    answersCopy: 'Түшүнүктүү жооп издеп жатасызбы? Темалар каталогунан баштаңыз.',
    answerOneTitle: 'Намазды кантип окуйм?',
    answerOneCopy: 'Намаз жана ибадат темалары',
    answerTwoTitle: 'Орозо тууралуу кайдан окуйм?',
    answerTwoCopy: 'Орозо жана Рамазан материалдары',
    answerThreeTitle: 'Күндөлүк дубаларды табуу',
    answerThreeCopy: 'Дубалар жана маанилери',
    footerCopy: 'Өз алдынча даярдалган диний маалымат порталынын үлгүсү. Материалды колдонууда булагын белгилеңиз.',
    footerNavAria: 'Төмөнкү меню',
    footerExplore: 'Багыттар',
    footerUseful: 'Пайдалуу',
    footerResourcesAria: 'Пайдалуу шилтемелер',
    searchFound: '«{query}» боюнча {count} тема табылды.',
  },
  ru: {
    documentTitle: 'Islamdini — Путь к знаниям',
    metaDescription: 'Islamdini — исламский портал на кыргызском, русском и английском языках.',
    skipLink: 'Перейти к основному содержанию',
    brandAria: 'Islamdini — главная страница',
    openMenu: 'Открыть меню',
    navAria: 'Основное меню',
    navHome: 'Главная',
    navTopics: 'Темы',
    navLibrary: 'Библиотека',
    navAnswers: 'Вопросы и ответы',
    navPrayer: 'Время намаза',
    languageButtonAria: 'Изменить язык',
    themeButtonToDark: 'Включить тёмный режим',
    themeButtonToLight: 'Включить светлый режим',
    headerSearch: 'Поиск',
    quickLinksAria: 'Быстрые разделы',
    quickQuranTitle: 'Коран',
    quickQuranCopy: 'Чтение и понимание',
    quickPrayerTitle: 'Намаз',
    quickPrayerCopy: 'Время и порядок',
    quickDuaTitle: 'Дуа',
    quickDuaCopy: 'Ежедневные дуа',
    quickHadithTitle: 'Хадис',
    quickHadithCopy: 'Рассказы о пророках',
    quickLibraryTitle: 'Библиотека',
    quickLibraryCopy: 'Ваши материалы',
    quickAnswersTitle: 'Вопросы и ответы',
    quickAnswersCopy: 'Понятные ответы',
    quickEthicsTitle: 'Нравственность',
    quickEthicsCopy: 'Этика и характер',
    quickMediaTitle: 'Медиа',
    quickMediaCopy: 'Подобранные материалы',
    heroEyebrow: 'Открытое пространство знаний',
    heroTitle: 'Ислам — это свет,<br /><em>указывающий путь.</em>',
    heroCopy: 'Читайте понятные материалы о вере, поклонении и повседневной жизни в удобном для себя ритме.',
    heroBrowse: 'Смотреть материалы',
    heroPrayer: 'Время на сегодня',
    heroStatsAria: 'Возможности портала',
    statTopics: '<b>67</b> тематических разделов',
    statTimes: '<b>6</b> времён намаза',
    statLanguage: '<b>RU</b> русскоязычный интерфейс',
    heroCredit: 'ISLAMDINI · 2026',
    heroOverviewKicker: 'НА СЕГОДНЯ',
    heroOverviewTitle: 'Время намаза',
    heroOverviewCopy: 'Выберите город и посмотрите актуальное расписание на сегодня.',
    heroOverviewAction: 'Посмотреть время',
    finderEyebrow: 'Быстро найдите нужное',
    finderTitle: 'Какую тему вы ищете?',
    searchLabel: 'Найти тему',
    searchPlaceholder: 'Например: намаз, семья, дуа…',
    searchButton: 'Найти',
    suggestionPrayer: 'Намаз',
    suggestionDua: 'Дуа',
    suggestionFamily: 'Семья',
    suggestionEtiquette: 'Этикет',
    suggestionFasting: 'Пост',
    finderSuggestionsAria: 'Быстрый выбор темы',
    dailyHighlightsAria: 'Полезные материалы на сегодня',
    dailyVerseEyebrow: 'АЯТ ДНЯ',
    dailyVerseCopy: 'Поистине, вместе с трудностью приходит облегчение.',
    dailyVerseSource: '«Аш-Шарх», аят 6',
    dailyVerseAction: 'Читать тафсир',
    recentEyebrow: 'ПОСЛЕДНИЕ МАТЕРИАЛЫ',
    recentTitle: 'Недавно добавлено',
    recentLoading: 'Материалы загружаются…',
    knowledgeEyebrow: 'КАПЛЯ ЗНАНИЯ',
    knowledgeTitle: 'Пополняйте знания каждый день',
    knowledgeCopy: 'Выберите нужную тему и читайте в удобном для себя ритме.',
    knowledgeAction: 'Перейти к темам',
    homeActionsAria: 'Полезные ссылки',
    actionQuranTitle: 'Читать Коран',
    actionQuranCopy: 'Тематические материалы',
    actionPrayerTitle: 'Время намаза',
    actionPrayerCopy: 'Выберите свой город',
    actionAnswersTitle: 'Вопросы и ответы',
    actionAnswersCopy: 'Найдите ответ по теме',
    directionsEyebrow: 'Направления',
    directionsTitle: 'С чего хотите начать?',
    allTopics: 'Все темы',
    featureAnswersTitle: 'Вопросы и ответы',
    featureAnswersCopy: 'Простые объяснения для вопросов из повседневной жизни.',
    featurePrayerTitle: 'Поклонение',
    featurePrayerCopy: 'Ориентиры по намазу, омовению, посту и духовному воспитанию.',
    featureLibraryTitle: 'Библиотека',
    featureLibraryCopy: 'Материалы собраны в тематические папки.',
    readingEyebrow: 'РЕЛИГИОЗНЫЕ ТЕМЫ',
    readingTitle: 'Все религиозные темы',
    topicDirectoryCopy: 'Выберите тему — на отдельном экране откроются только связанные материалы.',
    topicFolderLabel: 'ТЕМА',
    topicMaterialsCount: '{count} материалов',
    topicLoadMore: 'Показать ещё {count} тем',
    topicBack: '← Все темы',
    topicSelectedLabel: 'ВЫБРАННАЯ ТЕМА',
    topicSelectedCount: 'Материалов по этой теме: {count}',
    materialLabel: 'Материал',
    materialOpenText: 'Открыть полный текст',
    materialRead: 'Читать →',
    articleBack: '← Вернуться к теме',
    articleLabel: 'ЧТЕНИЕ МАТЕРИАЛА',
    translationLoading: 'Переводим…',
    translationError: 'Перевод не загрузился. Проверьте интернет и повторите попытку.',
    translationRetry: 'Повторить перевод',
    translationNotice: 'Автоматический перевод: возможны ошибки в терминах. Кыргызский оригинал доступен в меню языка.',
    materialLoadMore: 'Показать ещё {count} материалов',
    clearSearch: 'Очистить поиск',
    emptySearch: 'По этому запросу тем не найдено.',
    prayerTopline: 'ВРЕМЯ НА СЕГОДНЯ',
    changeCity: 'Выбрать регион',
    regionNotice: 'Выберите город или село для времени намаза',
    closeCityMenu: 'Закрыть список',
    citySearchLabel: 'Город или село',
    citySearchPlaceholder: 'Найдите город или село',
    cityListLoading: 'Загружаем города…',
    cityListReady: 'Города и населённые пункты: {count}',
    cityListEmpty: 'Такой населённый пункт не найден.',
    locationBishkekCity: 'Город Бишкек · Бишкек',
    locationOshCity: 'Город Ош · Ош',
    locationBatkenRegion: 'Баткенская область · Баткен',
    locationChuyRegion: 'Чуйская область · Токмок',
    locationJalalAbadRegion: 'Джалал-Абадская область · Манас',
    locationIssykKulRegion: 'Иссык-Кульская область · Каракол',
    locationNarynRegion: 'Нарынская область · Нарын',
    locationOshRegion: 'Ошская область · Ош',
    locationTalasRegion: 'Таласская область · Талас',
    cityBishkek: 'Бишкек',
    cityOsh: 'Ош',
    cityBatken: 'Баткен',
    cityTokmok: 'Токмок',
    cityJalalAbad: 'Манас',
    cityKarakol: 'Каракол',
    cityNaryn: 'Нарын',
    cityTalas: 'Талас',
    regionBishkekCity: 'город Бишкек',
    regionOshCity: 'город Ош',
    regionBatken: 'Баткенская область',
    regionChuy: 'Чуйская область',
    regionJalalAbad: 'Джалал-Абадская область',
    regionIssykKul: 'Иссык-Кульская область',
    regionNaryn: 'Нарынская область',
    regionOsh: 'Ошская область',
    regionTalas: 'Таласская область',
    prayerLoading: 'Загружаем время намаза…',
    prayerRefreshing: 'Обновляем время намаза…',
    prayerCurrent: 'Актуально на {date}',
    prayerFailed: 'Не удалось загрузить время намаза. Проверьте интернет и повторите попытку.',
    prayerCacheSuffix: ' · сохранённые данные',
    prayerOfficial: 'NamazVakti.com · Фаджр (имсак)',
    prayerFallback: 'Резервный астрономический расчёт',
    prayerCalculated: 'Астрономический расчёт по координатам',
    prayerCached: 'Показаны сохранённые данные · идёт обновление',
    prayerRetry: 'Повторить загрузку',
    prayerFajr: 'Фаджр',
    prayerSunrise: 'Восход',
    prayerDhuhr: 'Зухр',
    prayerAsr: 'Аср',
    prayerMaghrib: 'Магриб',
    prayerIsha: 'Иша',
    next: 'следующее',
    tomorrow: 'завтра',
    qibla: 'Кыбла',
    quote: 'Знания помогают<br /><strong>становиться лучше</strong><br />каждый день.',
    libraryEyebrow: 'БИБЛИОТЕКА',
    libraryTitle: 'Библиотека по темам',
    libraryCopy: 'Выберите тему и откройте связанные с ней материалы.',
    libraryEmptyTitle: 'Каталог тем',
    libraryEmptyCopy: 'Посмотрите все темы и откройте нужную.',
    answersEyebrow: 'ВОПРОСЫ И ОТВЕТЫ',
    answersTitle: 'Частые вопросы',
    answersCopy: 'Ищете понятный ответ? Начните с каталога тем.',
    answerOneTitle: 'Как читать намаз?',
    answerOneCopy: 'Темы о намазе и поклонении',
    answerTwoTitle: 'Где прочитать об уразе?',
    answerTwoCopy: 'Материалы об уразе и Рамадане',
    answerThreeTitle: 'Найти ежедневные дуа',
    answerThreeCopy: 'Дуа и их значения',
    footerCopy: 'Самостоятельный образец информационного религиозного портала. Указывайте источник при использовании материалов.',
    footerNavAria: 'Нижнее меню',
    footerExplore: 'Разделы',
    footerUseful: 'Полезное',
    footerResourcesAria: 'Полезные ссылки',
    searchFound: 'По запросу «{query}» найдено тем: {count}.',
  },
  en: {
    documentTitle: 'Islamdini — A path to knowledge',
    metaDescription: 'Islamdini — an Islamic information portal in Kyrgyz, Russian and English.',
    skipLink: 'Skip to main content',
    brandAria: 'Islamdini home',
    openMenu: 'Open menu',
    navAria: 'Primary navigation',
    navHome: 'Home',
    navTopics: 'Topics',
    navLibrary: 'Library',
    navAnswers: 'Questions & answers',
    navPrayer: 'Prayer times',
    languageButtonAria: 'Change language',
    themeButtonToDark: 'Enable dark mode',
    themeButtonToLight: 'Enable light mode',
    headerSearch: 'Search',
    quickLinksAria: 'Quick sections',
    quickQuranTitle: 'Qur’an',
    quickQuranCopy: 'Read and understand',
    quickPrayerTitle: 'Prayer',
    quickPrayerCopy: 'Times and guidance',
    quickDuaTitle: 'Dua',
    quickDuaCopy: 'Daily supplications',
    quickHadithTitle: 'Hadith',
    quickHadithCopy: 'Stories of the prophets',
    quickLibraryTitle: 'Library',
    quickLibraryCopy: 'Your materials',
    quickAnswersTitle: 'Questions & answers',
    quickAnswersCopy: 'Clear answers',
    quickEthicsTitle: 'Ethics',
    quickEthicsCopy: 'Manners and character',
    quickMediaTitle: 'Media',
    quickMediaCopy: 'Selected materials',
    heroEyebrow: 'An open space for learning',
    heroTitle: 'Islam is a light,<br /><em>showing the way.</em>',
    heroCopy: 'Explore clear, thoughtful material about faith, worship, and daily life at your own pace.',
    heroBrowse: 'Browse materials',
    heroPrayer: "Today's times",
    heroStatsAria: 'Portal details',
    statTopics: '<b>67</b> topic folders',
    statTimes: '<b>6</b> prayer times',
    statLanguage: '<b>EN</b> English interface',
    heroCredit: 'ISLAMDINI · 2026',
    heroOverviewKicker: 'FOR TODAY',
    heroOverviewTitle: 'Prayer times',
    heroOverviewCopy: 'Choose your city to see the current schedule for today.',
    heroOverviewAction: 'View times',
    finderEyebrow: 'Find what you need quickly',
    finderTitle: 'What would you like to explore?',
    searchLabel: 'Search a topic',
    searchPlaceholder: 'For example: prayer, family, dua…',
    searchButton: 'Search',
    suggestionPrayer: 'Prayer',
    suggestionDua: 'Dua',
    suggestionFamily: 'Family',
    suggestionEtiquette: 'Etiquette',
    suggestionFasting: 'Fasting',
    finderSuggestionsAria: 'Quick topic selection',
    dailyHighlightsAria: 'Today’s useful materials',
    dailyVerseEyebrow: 'VERSE OF THE DAY',
    dailyVerseCopy: 'Indeed, with hardship comes ease.',
    dailyVerseSource: 'Ash-Sharh, verse 6',
    dailyVerseAction: 'Read tafsir',
    recentEyebrow: 'LATEST MATERIALS',
    recentTitle: 'Recently added',
    recentLoading: 'Loading materials…',
    knowledgeEyebrow: 'A DROP OF KNOWLEDGE',
    knowledgeTitle: 'Grow your knowledge every day',
    knowledgeCopy: 'Choose a topic and read at a pace that suits you.',
    knowledgeAction: 'Explore topics',
    homeActionsAria: 'Useful links',
    actionQuranTitle: 'Read the Quran',
    actionQuranCopy: 'Topic-based materials',
    actionPrayerTitle: 'Prayer times',
    actionPrayerCopy: 'Choose your city',
    actionAnswersTitle: 'Questions & answers',
    actionAnswersCopy: 'Find an answer by topic',
    directionsEyebrow: 'Explore',
    directionsTitle: 'Where would you like to begin?',
    allTopics: 'All topics',
    featureAnswersTitle: 'Questions & answers',
    featureAnswersCopy: 'Clear explanations for questions that arise in everyday life.',
    featurePrayerTitle: 'Worship',
    featurePrayerCopy: 'Guides to prayer, ablution, fasting, and spiritual growth.',
    featureLibraryTitle: 'Library',
    featureLibraryCopy: 'Materials are arranged in topic folders.',
    readingEyebrow: 'RELIGIOUS TOPICS',
    readingTitle: 'All religious topics',
    topicDirectoryCopy: 'Choose a topic to open only its related materials on a separate screen.',
    topicFolderLabel: 'TOPIC',
    topicMaterialsCount: '{count} materials',
    topicLoadMore: 'Show {count} more topics',
    topicBack: '← All topics',
    topicSelectedLabel: 'SELECTED TOPIC',
    topicSelectedCount: '{count} materials in this topic',
    materialLabel: 'Material',
    materialOpenText: 'Read full text',
    materialRead: 'Read →',
    articleBack: '← Back to topic',
    articleLabel: 'READING MATERIAL',
    translationLoading: 'Translating…',
    translationError: 'The translation could not be loaded. Check your connection and try again.',
    translationRetry: 'Retry translation',
    translationNotice: 'Automatic translation: terms may be inaccurate. Choose Kyrgyz in the language menu to read the original.',
    materialLoadMore: 'Show {count} more materials',
    clearSearch: 'Clear search',
    emptySearch: 'No topics were found for this search.',
    prayerTopline: "TODAY'S TIMES",
    changeCity: 'Choose region',
    regionNotice: 'Choose a city or town for prayer times',
    closeCityMenu: 'Close list',
    citySearchLabel: 'Town or village',
    citySearchPlaceholder: 'Find a town or village',
    cityListLoading: 'Loading cities…',
    cityListReady: 'Cities and locations: {count}',
    cityListEmpty: 'No matching location was found.',
    locationBishkekCity: 'Bishkek city · Bishkek',
    locationOshCity: 'Osh city · Osh',
    locationBatkenRegion: 'Batken Region · Batken',
    locationChuyRegion: 'Chüy Region · Tokmok',
    locationJalalAbadRegion: 'Jalal-Abad Region · Manas',
    locationIssykKulRegion: 'Issyk-Kul Region · Karakol',
    locationNarynRegion: 'Naryn Region · Naryn',
    locationOshRegion: 'Osh Region · Osh',
    locationTalasRegion: 'Talas Region · Talas',
    cityBishkek: 'Bishkek',
    cityOsh: 'Osh',
    cityBatken: 'Batken',
    cityTokmok: 'Tokmok',
    cityJalalAbad: 'Manas',
    cityKarakol: 'Karakol',
    cityNaryn: 'Naryn',
    cityTalas: 'Talas',
    regionBishkekCity: 'Bishkek city',
    regionOshCity: 'Osh city',
    regionBatken: 'Batken Region',
    regionChuy: 'Chüy Region',
    regionJalalAbad: 'Jalal-Abad Region',
    regionIssykKul: 'Issyk-Kul Region',
    regionNaryn: 'Naryn Region',
    regionOsh: 'Osh Region',
    regionTalas: 'Talas Region',
    prayerLoading: 'Loading prayer times…',
    prayerRefreshing: 'Refreshing prayer times…',
    prayerCurrent: 'Current for {date}',
    prayerFailed: 'Could not load prayer times. Check your connection and try again.',
    prayerCacheSuffix: ' · saved data',
    prayerOfficial: 'NamazVakti.com · Fajr (imsak)',
    prayerFallback: 'Backup astronomical calculation',
    prayerCalculated: 'Astronomical calculation by coordinates',
    prayerCached: 'Saved data is shown · updating again',
    prayerRetry: 'Retry',
    prayerFajr: 'Fajr',
    prayerSunrise: 'Sunrise',
    prayerDhuhr: 'Dhuhr',
    prayerAsr: 'Asr',
    prayerMaghrib: 'Maghrib',
    prayerIsha: 'Isha',
    next: 'next',
    tomorrow: 'tomorrow',
    qibla: 'Qibla',
    quote: 'Knowledge is<br /><strong>a path to becoming better</strong><br />every day.',
    libraryEyebrow: 'LIBRARY',
    libraryTitle: 'Library by topic',
    libraryCopy: 'Choose a topic and open its related materials.',
    libraryEmptyTitle: 'Topic directory',
    libraryEmptyCopy: 'Browse every topic and open the one you need.',
    answersEyebrow: 'QUESTIONS & ANSWERS',
    answersTitle: 'Common questions',
    answersCopy: 'Looking for a clear answer? Start with the topic directory.',
    answerOneTitle: 'How do I pray?',
    answerOneCopy: 'Prayer and worship topics',
    answerTwoTitle: 'Where can I read about fasting?',
    answerTwoCopy: 'Fasting and Ramadan materials',
    answerThreeTitle: 'Find daily duas',
    answerThreeCopy: 'Duas and their meanings',
    footerCopy: 'An independent example of a religious information portal. Please cite the source when using materials.',
    footerNavAria: 'Footer navigation',
    footerExplore: 'Explore',
    footerUseful: 'Useful',
    footerResourcesAria: 'Useful links',
    searchFound: '{count} topics found for “{query}”.',
  },
};

const cities = {
  'bishkek-city': { muftiyatCode: 1, latitude: 42.8746, longitude: 74.5698, timeZone: 'Asia/Bishkek', cityLabelKey: 'cityBishkek', regionLabelKey: 'regionBishkekCity' },
  'osh-city': { muftiyatCode: 2, latitude: 40.5283, longitude: 72.7985, timeZone: 'Asia/Bishkek', cityLabelKey: 'cityOsh', regionLabelKey: 'regionOshCity' },
  'batken-region': { muftiyatCode: 57, latitude: 40.0626, longitude: 70.8194, timeZone: 'Asia/Bishkek', cityLabelKey: 'cityBatken', regionLabelKey: 'regionBatken' },
  'chuy-region': { muftiyatCode: 22, latitude: 42.8418, longitude: 75.3015, timeZone: 'Asia/Bishkek', cityLabelKey: 'cityTokmok', regionLabelKey: 'regionChuy' },
  'jalal-abad-region': { muftiyatCode: 42, latitude: 40.9333, longitude: 72.9833, timeZone: 'Asia/Bishkek', cityLabelKey: 'cityJalalAbad', regionLabelKey: 'regionJalalAbad', searchAliases: ['Жалалабат'] },
  'issyk-kul-region': { muftiyatCode: 7, latitude: 42.4907, longitude: 78.3936, timeZone: 'Asia/Bishkek', cityLabelKey: 'cityKarakol', regionLabelKey: 'regionIssykKul' },
  'naryn-region': { muftiyatCode: 30, latitude: 41.4287, longitude: 75.9911, timeZone: 'Asia/Bishkek', cityLabelKey: 'cityNaryn', regionLabelKey: 'regionNaryn' },
  'osh-region': { muftiyatCode: 2, latitude: 40.5283, longitude: 72.7985, timeZone: 'Asia/Bishkek', cityLabelKey: 'cityOsh', regionLabelKey: 'regionOsh' },
  'talas-region': { muftiyatCode: 5, latitude: 42.5228, longitude: 72.2427, timeZone: 'Asia/Bishkek', cityLabelKey: 'cityTalas', regionLabelKey: 'regionTalas' },
};

// These Kyrgyzstan towns keep the requested list usable while the official list is temporarily unavailable.
const fallbackKyrgyzCities = {
  'kg-aydarken': { provider: 'aladhan', displayName: 'Айдаркен', displayRegion: 'Кыргызстан', latitude: 39.94319, longitude: 71.34184, timeZone: 'Asia/Bishkek' },
  'kg-ananyevo': { provider: 'aladhan', displayName: 'Ананьево', displayRegion: 'Кыргызстан', latitude: 42.73642, longitude: 77.67384, timeZone: 'Asia/Bishkek' },
  'kg-balykchy': { provider: 'aladhan', displayName: 'Балыкчы', displayRegion: 'Кыргызстан', latitude: 42.46017, longitude: 76.18709, timeZone: 'Asia/Bishkek' },
  'kg-jeti-oguz': { provider: 'aladhan', displayName: 'Жети-Өгүз', displayRegion: 'Кыргызстан', latitude: 42.43233, longitude: 78.21601, timeZone: 'Asia/Bishkek' },
  'kg-kaji-sai': { provider: 'aladhan', displayName: 'Кажы-Сай', displayRegion: 'Кыргызстан', latitude: 42.14107, longitude: 77.17848, timeZone: 'Asia/Bishkek' },
  'kg-kazarman': { provider: 'aladhan', displayName: 'Казарман', displayRegion: 'Кыргызстан', latitude: 41.40452, longitude: 74.02828, timeZone: 'Asia/Bishkek' },
  'kg-kara-balta': { provider: 'aladhan', displayName: 'Кара-Балта', displayRegion: 'Кыргызстан', latitude: 42.81423, longitude: 73.84813, timeZone: 'Asia/Bishkek' },
  'kg-kara-kol': { provider: 'aladhan', displayName: 'Кара-Көл', displayRegion: 'Кыргызстан', latitude: 41.62828, longitude: 72.67027, timeZone: 'Asia/Bishkek' },
  'kg-kyzyl-kiya': { provider: 'aladhan', displayName: 'Кызыл-Кыя', displayRegion: 'Кыргызстан', latitude: 40.25684, longitude: 72.12793, timeZone: 'Asia/Bishkek' },
  'kg-kochkor': { provider: 'aladhan', displayName: 'Кочкор', displayRegion: 'Кыргызстан', latitude: 42.21552, longitude: 75.75659, timeZone: 'Asia/Bishkek' },
  'kg-suluktu': { provider: 'aladhan', displayName: 'Сулукту', displayRegion: 'Кыргызстан', latitude: 39.93652, longitude: 69.56779, timeZone: 'Asia/Bishkek' },
  'kg-toktogul': { provider: 'aladhan', displayName: 'Токтогул', displayRegion: 'Кыргызстан', latitude: 41.87442, longitude: 72.94192, timeZone: 'Asia/Bishkek' },
  'kg-uzgen': { provider: 'aladhan', displayName: 'Өзгөн', displayRegion: 'Кыргызстан', latitude: 40.76994, longitude: 73.30068, timeZone: 'Asia/Bishkek' },
  'kg-cholpon-ata': { provider: 'aladhan', displayName: 'Чолпон-Ата', displayRegion: 'Кыргызстан', latitude: 42.64944, longitude: 77.08225, timeZone: 'Asia/Bishkek' },
};

const externalCities = {
  'sa-mecca': { provider: 'aladhan', displayName: 'Мекка', displayRegion: 'Саудовская Аравия', latitude: 21.42250, longitude: 39.82611, timeZone: 'Asia/Riyadh' },
  'sa-medina': { provider: 'aladhan', displayName: 'Мадина', displayRegion: 'Саудовская Аравия', latitude: 24.47000, longitude: 39.61000, timeZone: 'Asia/Riyadh' },

  'ru-krasnodar': { provider: 'aladhan', displayName: 'Краснодар', displayRegion: 'Россия', latitude: 45.04534, longitude: 38.98178, timeZone: 'Europe/Moscow' },
  'ru-moscow': { provider: 'aladhan', displayName: 'Москва', displayRegion: 'Россия', latitude: 55.75204, longitude: 37.61781, timeZone: 'Europe/Moscow' },
  'ru-makhachkala': { provider: 'aladhan', displayName: 'Махачкала', displayRegion: 'Россия', latitude: 42.97782, longitude: 47.50027, timeZone: 'Europe/Moscow' },
  'ru-magas': { provider: 'aladhan', displayName: 'Магас', displayRegion: 'Россия', latitude: 43.22257, longitude: 44.77261, timeZone: 'Europe/Moscow' },
  'ru-nalchik': { provider: 'aladhan', displayName: 'Нальчик', displayRegion: 'Россия', latitude: 43.49806, longitude: 43.61889, timeZone: 'Europe/Moscow' },
  'ru-novosibirsk': { provider: 'aladhan', displayName: 'Новосибирск', displayRegion: 'Россия', latitude: 55.02259, longitude: 82.93175, timeZone: 'Asia/Novosibirsk' },
  'ru-omsk': { provider: 'aladhan', displayName: 'Омск', displayRegion: 'Россия', latitude: 54.99244, longitude: 73.36859, timeZone: 'Asia/Omsk' },
  'ru-orenburg': { provider: 'aladhan', displayName: 'Оренбург', displayRegion: 'Россия', latitude: 51.76712, longitude: 55.09883, timeZone: 'Asia/Yekaterinburg' },
  'ru-perm': { provider: 'aladhan', displayName: 'Пермь', displayRegion: 'Россия', latitude: 58.01046, longitude: 56.25017, timeZone: 'Asia/Yekaterinburg' },
  'ru-pyatigorsk': { provider: 'aladhan', displayName: 'Пятигорск', displayRegion: 'Россия', latitude: 44.04861, longitude: 43.05944, timeZone: 'Europe/Moscow' },
  'ru-khasavyurt': { provider: 'aladhan', displayName: 'Хасавюрт', displayRegion: 'Россия', latitude: 43.25090, longitude: 46.58766, timeZone: 'Europe/Moscow' },
  'ru-rostov-on-don': { provider: 'aladhan', displayName: 'Ростов-на-Дону', displayRegion: 'Россия', latitude: 47.21997, longitude: 39.70769, timeZone: 'Europe/Moscow' },
  'ru-stavropol': { provider: 'aladhan', displayName: 'Ставрополь', displayRegion: 'Россия', latitude: 45.03442, longitude: 41.96420, timeZone: 'Europe/Moscow' },
  'ru-saint-petersburg': { provider: 'aladhan', displayName: 'Санкт-Петербург', displayRegion: 'Россия', latitude: 59.93863, longitude: 30.31413, timeZone: 'Europe/Moscow' },
  'ru-ufa': { provider: 'aladhan', displayName: 'Уфа', displayRegion: 'Россия', latitude: 54.74306, longitude: 55.96779, timeZone: 'Asia/Yekaterinburg' },
  'ru-cherkessk': { provider: 'aladhan', displayName: 'Черкесск', displayRegion: 'Россия', latitude: 44.22375, longitude: 42.04624, timeZone: 'Europe/Moscow' },
  'ru-vladikavkaz': { provider: 'aladhan', displayName: 'Владикавказ', displayRegion: 'Россия', latitude: 43.04101, longitude: 44.66986, timeZone: 'Europe/Moscow' },
  'ru-kazan': { provider: 'aladhan', displayName: 'Казань', displayRegion: 'Россия', latitude: 55.78874, longitude: 49.12214, timeZone: 'Europe/Moscow' },
  'ru-grozny': { provider: 'aladhan', displayName: 'Грозный', displayRegion: 'Россия', latitude: 43.31881, longitude: 45.69862, timeZone: 'Europe/Moscow' },
  'ru-volgograd': { provider: 'aladhan', displayName: 'Волгоград', displayRegion: 'Россия', latitude: 48.71378, longitude: 44.49760, timeZone: 'Europe/Volgograd' },
  'ru-derbent': { provider: 'aladhan', displayName: 'Дербент', displayRegion: 'Россия', latitude: 42.06622, longitude: 48.28759, timeZone: 'Europe/Moscow' },
  'ru-yekaterinburg': { provider: 'aladhan', displayName: 'Екатеринбург', displayRegion: 'Россия', latitude: 56.85733, longitude: 60.61529, timeZone: 'Asia/Yekaterinburg' },
  'ru-kislovodsk': { provider: 'aladhan', displayName: 'Кисловодск', displayRegion: 'Россия', latitude: 43.91333, longitude: 42.72083, timeZone: 'Europe/Moscow' },
  'ru-astrakhan': { provider: 'aladhan', displayName: 'Астрахань', displayRegion: 'Россия', latitude: 46.34968, longitude: 48.04076, timeZone: 'Europe/Astrakhan' },

  'kz-kostanay': { provider: 'aladhan', displayName: 'Костанай', displayRegion: 'Казахстан', latitude: 53.21435, longitude: 63.62463, timeZone: 'Asia/Qostanay' },
  'kz-kyzylorda': { provider: 'aladhan', displayName: 'Кызылорда', displayRegion: 'Казахстан', latitude: 44.85278, longitude: 65.50917, timeZone: 'Asia/Qyzylorda' },
  'kz-oral': { provider: 'aladhan', displayName: 'Орал', displayRegion: 'Казахстан', latitude: 51.20410, longitude: 51.37080, timeZone: 'Asia/Oral' },
  'kz-taraz': { provider: 'aladhan', displayName: 'Тараз', displayRegion: 'Казахстан', latitude: 42.90160, longitude: 71.37690, timeZone: 'Asia/Almaty' },
  'kz-turkistan': { provider: 'aladhan', displayName: 'Туркистан', displayRegion: 'Казахстан', latitude: 43.29458, longitude: 68.25685, timeZone: 'Asia/Almaty' },
  'kz-shymkent': { provider: 'aladhan', displayName: 'Шымкент', displayRegion: 'Казахстан', latitude: 42.31470, longitude: 69.58830, timeZone: 'Asia/Almaty' },
  'kz-almaty': { provider: 'aladhan', displayName: 'Алматы', displayRegion: 'Казахстан', latitude: 43.23640, longitude: 76.94570, timeZone: 'Asia/Almaty' },
  'kz-kaspiy': { provider: 'aladhan', displayName: 'Каспий', displayRegion: 'Казахстан · Атырауская область', latitude: 46.550722, longitude: 49.294288, timeZone: 'Asia/Atyrau' },
  'kz-zhezkazgan': { provider: 'aladhan', displayName: 'Жезказган', displayRegion: 'Казахстан', latitude: 47.79370, longitude: 67.70650, timeZone: 'Asia/Almaty' },
  'kz-aktobe': { provider: 'aladhan', displayName: 'Актобе', displayRegion: 'Казахстан', latitude: 50.27969, longitude: 57.20718, timeZone: 'Asia/Aqtobe' },
  'kz-kokshetau': { provider: 'aladhan', displayName: 'Кокшетау', displayRegion: 'Казахстан', latitude: 53.28414, longitude: 69.39364, timeZone: 'Asia/Almaty' },
  'kz-karaganda': { provider: 'aladhan', displayName: 'Караганда', displayRegion: 'Казахстан', latitude: 49.80280, longitude: 73.10560, timeZone: 'Asia/Almaty' },
  'kz-astana': { provider: 'aladhan', displayName: 'Астана', displayRegion: 'Казахстан', latitude: 51.12830, longitude: 71.43050, timeZone: 'Asia/Almaty' },
  'kz-atyrau': { provider: 'aladhan', displayName: 'Атырау', displayRegion: 'Казахстан', latitude: 47.10480, longitude: 51.88427, timeZone: 'Asia/Atyrau' },
  'kz-aktau': { provider: 'aladhan', displayName: 'Актау', displayRegion: 'Казахстан', latitude: 43.63530, longitude: 51.16820, timeZone: 'Asia/Aqtau' },

  'kr-seoul': { provider: 'aladhan', displayName: 'Сеул', displayRegion: 'Республика Корея', latitude: 37.56650, longitude: 126.97800, timeZone: 'Asia/Seoul' },
  'uz-tashkent': { provider: 'aladhan', displayName: 'Ташкент', displayRegion: 'Узбекистан', latitude: 41.31111, longitude: 69.27972, timeZone: 'Asia/Tashkent' },
  'az-baku': { provider: 'aladhan', displayName: 'Баку', displayRegion: 'Азербайджан', latitude: 40.36666, longitude: 49.83518, timeZone: 'Asia/Baku' },
  'tj-dushanbe': { provider: 'aladhan', displayName: 'Душанбе', displayRegion: 'Таджикистан', latitude: 38.57306, longitude: 68.78639, timeZone: 'Asia/Dushanbe' },
  'ae-dubai': { provider: 'aladhan', displayName: 'Дубай', displayRegion: 'ОАЭ', latitude: 25.26972, longitude: 55.30944, timeZone: 'Asia/Dubai' },
  'tm-ashgabat': { provider: 'aladhan', displayName: 'Ашхабат', displayRegion: 'Туркменистан', latitude: 37.95000, longitude: 58.38333, timeZone: 'Asia/Ashgabat' },
};

Object.assign(cities, fallbackKyrgyzCities, externalCities);
const externalCityKeys = Object.keys(externalCities);
const fallbackMuftiyatCodes = new Set();
const fallbackCityKeys = Object.keys(cities).filter((key) => {
  const code = cities[key].muftiyatCode;
  if (!Number.isInteger(code)) return true;
  if (fallbackMuftiyatCodes.has(code)) return false;
  fallbackMuftiyatCodes.add(code);
  return true;
});
const officialCityKeys = [];
Object.entries({
  'bishkek-city':8650, 'osh-city':8666, 'osh-region':8666, 'batken-region':43738,
  'chuy-region':8653, 'jalal-abad-region':8655, 'naryn-region':8663, 'talas-region':8668,
  'kg-aydarken':8664, 'kg-ananyevo':8670, 'kg-balykchy':21289, 'kg-jeti-oguz':8672,
  'kg-kaji-sai':8673, 'kg-kazarman':8661, 'kg-kara-balta':8651, 'kg-kara-kol':8656,
  'kg-kyzyl-kiya':8665, 'kg-kochkor':62461, 'kg-suluktu':8667, 'kg-toktogul':8657,
  'kg-uzgen':8658, 'kg-cholpon-ata':8671,
}).forEach(([key, code]) => { if (cities[key]) cities[key].namazvaktiCode = code; });
const cityKeyByMuftiyatCode = new Map();
fallbackCityKeys.forEach((key) => {
  const code = cities[key].muftiyatCode;
  if (Number.isInteger(code) && !cityKeyByMuftiyatCode.has(code)) cityKeyByMuftiyatCode.set(code, key);
});

const prayerOrder = [
  ['Fajr', 'prayerFajr'],
  ['Sunrise', 'prayerSunrise'],
  ['Dhuhr', 'prayerDhuhr'],
  ['Asr', 'prayerAsr'],
  ['Maghrib', 'prayerMaghrib'],
  ['Isha', 'prayerIsha'],
];

let currentLanguage = 'ky';
let selectedCity = 'bishkek-city';
let currentTimings = null;
let tomorrowTimings = null;
let currentTimingSource = 'official';
let currentScheduleDate = '';
let currentScheduleCity = '';
let prayerRequestId = 0;
let prayerAbortController = null;
let prayerRetryTimer = null;
let prayerDayTimer = null;
let prayerRetryAttempt = 0;
let lastPrayerRefreshAt = 0;
let cityLocationsLoaded = false;
let deferredSavedCity = '';
let materialCorpus = [];
let topicCatalog = [];
let activeMaterialQuery = '';
let activeTopicId = '';
let activeMaterialId = '';
let visibleMaterialCount = 24;
let visibleTopicCount = 18;
let sectionQuery = '';

const MATERIAL_PAGE_SIZE = 24;
const TOPIC_PAGE_SIZE = 18;
const TOPIC_PRIORITY = [
  'Аллаху таалага ишенүү',
  'Периштелерге ишенүү',
  'Китептерге ишенүү',
  'Пайгамбарларга ишенүү',
  'Акырет күнүнө ишенүү',
  'Тагдырга ишенүү',
];
const HIDDEN_TOPIC_NAMES = new Set([
  'Жүктөп алуу',
  'Mail группасы',
  'Материалы',
  'Шилтеме',
].map((name) => name.toLocaleLowerCase('ky-KG')));
const MATERIAL_SEARCH_TOPICS = [
  {
    id: 'prayer',
    queryTerms: ['намаз', 'намаза', 'намазды', 'намаздын', 'намазга', 'намазда', 'намаздан', 'салаат', 'салат', 'молитва', 'молитвы', 'namaz', 'salah', 'salat', 'prayer', 'prayers'],
    terms: ['намаз', 'салаат', 'салат', 'даарат', 'таяммум', 'гусул', 'ибадат', 'азан', 'азон', 'икамат', 'кыбыл', 'кибл'],
  },
  {
    id: 'fasting',
    queryTerms: ['орозо', 'оризо', 'ораза', 'пост', 'поста', 'посту', 'постом', 'посты', 'рамадан', 'рамазан', 'orozо', 'orozo', 'ramadan', 'fasting', 'fast'],
    terms: ['орозо', 'оризо', 'ораза', 'пост', 'поста', 'посту', 'постом', 'посты', 'постящ', 'рамадан', 'рамазан', 'сахар', 'сухур', 'ифтар', 'фитр', 'фидия', 'кафарат', 'ramadan', 'fasting'],
  },
];

const PRAYER_CACHE_VERSION = 5;
const PRAYER_REQUEST_TIMEOUT = 12000;
const PRAYER_REFRESH_INTERVAL = 6 * 60 * 60 * 1000;
const PRAYER_RETRY_DELAYS = [2000, 10000, 30000, 120000, 600000];

function t(key) {
  return translations[currentLanguage][key] || translations.ky[key] || key;
}

function applyTheme(theme, persist = true) {
  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  document.body.dataset.theme = nextTheme;
  themeToggle.setAttribute('aria-pressed', String(nextTheme === 'dark'));
  themeToggle.setAttribute('aria-label', t(nextTheme === 'dark' ? 'themeButtonToLight' : 'themeButtonToDark'));
  themeIcon.textContent = nextTheme === 'dark' ? '☀' : '☾';
  if (persist) localStorage.setItem('islamdidi:theme', nextTheme);
}

function interpolate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? '');
}

function normalize(value) {
  return String(value || '').trim().toLocaleLowerCase(localeMap[currentLanguage]);
}

function tokenize(value) {
  return normalize(value).match(/[\p{L}\p{N}]+/gu) || [];
}

function hasTopicTerm(value, terms) {
  const tokens = tokenize(value);
  return terms.some((term) => tokens.some((token) => (
    token === term || (term.length >= 5 && token.startsWith(term))
  )));
}

function getSearchTopic(query) {
  return MATERIAL_SEARCH_TOPICS.find((topic) => hasTopicTerm(query, topic.queryTerms)) || null;
}

function getLocalizedText(value) {
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) return value.map(getLocalizedText).filter(Boolean).join(' ');
  if (!value || typeof value !== 'object') return '';

  const preferred = value[currentLanguage] ?? value.ky ?? value.ru ?? value.en;
  if (typeof preferred === 'string') return preferred.trim();
  return Object.values(value).map(getLocalizedText).find(Boolean) || '';
}

function getSearchableText(value) {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(getSearchableText).join(' ');
  if (!value || typeof value !== 'object') return '';
  return Object.values(value).map(getSearchableText).join(' ');
}

function shortenMaterialText(text, length = 240) {
  const cleaned = String(text || '').replace(/\s+/g, ' ').trim();
  return cleaned.length > length ? `${cleaned.slice(0, length).trimEnd()}…` : cleaned;
}

function normalizeMaterial(rawMaterial, index) {
  if (!rawMaterial || typeof rawMaterial !== 'object') return null;
  const rawContent = rawMaterial.content ?? rawMaterial.body ?? rawMaterial.text ?? '';
  const title = getLocalizedText(rawMaterial.title);
  const content = getLocalizedText(rawContent);
  const excerpt = getLocalizedText(rawMaterial.excerpt) || shortenMaterialText(content);
  if (!title || (!content && !excerpt)) return null;
  const category = getLocalizedText(rawMaterial.category);
  const tags = getSearchableText(rawMaterial.tags);

  const date = String(rawMaterial.publishedAt || '');
  return {
    id: String(rawMaterial.id || `material-${index + 1}`),
    source: rawMaterial,
    title,
    category,
    excerpt,
    content,
    searchable: normalize(getSearchableText([
      rawMaterial.title,
      rawMaterial.category,
      rawMaterial.excerpt,
      rawContent,
      rawMaterial.tags,
    ])),
    topicTitle: normalize(title),
    topicCategory: normalize(category),
    topicTags: normalize(tags),
    topicExcerpt: normalize(excerpt),
    sortOrder: Number.isFinite(Number(rawMaterial.sortOrder)) ? Number(rawMaterial.sortOrder) : Number.MAX_SAFE_INTEGER,
    publishedAt: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : '',
  };
}

function sortMaterials(materials) {
  return [...materials].sort((first, second) => (
    (first.source.pageNumber || Number.MAX_SAFE_INTEGER) - (second.source.pageNumber || Number.MAX_SAFE_INTEGER)
    ||
    second.publishedAt.localeCompare(first.publishedAt)
    || first.sortOrder - second.sortOrder
    || first.title.localeCompare(second.title, localeMap[currentLanguage])
  ));
}

function localizeMaterialCorpus() {
  materialCorpus = materialCorpus
    .map((material, index) => normalizeMaterial(material.source || material, index))
    .filter(Boolean);
}

function topicKey(name) {
  return String(name || '').trim().toLocaleLowerCase('ky-KG').replace(/\s+/g, ' ');
}

function isBrowsableTopic(name) {
  const key = topicKey(name);
  return Boolean(key)
    && !HIDDEN_TOPIC_NAMES.has(key)
    && !/^\d{3}\s*[-–]\s*\d{3}\s+беттер$/u.test(key);
}

function getMaterialTopicNames(material) {
  return [...new Set(String(material?.category || '')
    .split(/\s*·\s*/u)
    .map((name) => name.trim())
    .filter(isBrowsableTopic))];
}

function translatedTopic(name) {
  return globalThis.IslamdiniTranslation.topic(name, currentLanguage);
}

// Update only this rendered field. Language changes or navigation invalidate old requests.
function renderTranslatedField(element, sourceValue, { paragraphs = false, onTranslated, retryButton = true } = {}) {
  const language = currentLanguage;
  const source = typeof sourceValue === 'object'
    ? (sourceValue?.ky || getLocalizedText(sourceValue)) : String(sourceValue || '');
  const supplied = typeof sourceValue === 'object' ? sourceValue?.[language] : null;
  const token = {};
  element.translationToken = token;
  const current = () => currentLanguage === language && element.translationToken === token && element.isConnected && !element.closest('[hidden]');
  const paint = (value) => {
    element.lang = language;
    if (paragraphs) {
      element.replaceChildren(...String(value).split(/\n\s*\n/u).filter(Boolean).map((part) => {
        const p = document.createElement('p'); p.textContent = part.trim(); return p;
      }));
    } else element.textContent = value;
    element.removeAttribute('aria-busy');
    onTranslated?.(value);
  };
  if (language === 'ky' || supplied || !source.trim()) {
    paint(supplied || source);
    return;
  }
  const attempt = () => {
    element.textContent = t('translationLoading');
    element.setAttribute('aria-busy', 'true');
    globalThis.IslamdiniTranslation.translate(source, language, current).then((value) => {
      if (current()) paint(value);
    }).catch(() => {
      if (!current()) return;
      element.removeAttribute('aria-busy');
      const message = document.createElement('span');
      message.className = 'translation-error';
      message.textContent = t('translationError');
      const retry = document.createElement('button');
      retry.type = 'button'; retry.className = 'translation-retry'; retry.textContent = t('translationRetry');
      retry.addEventListener('click', (event) => { event.stopPropagation(); attempt(); });
      element.replaceChildren(...(retryButton ? [message, retry] : [message]));
    });
  };
  // Cards are created before they are attached to the document.
  queueMicrotask(() => { if (current()) attempt(); });
}

function getTopicPriority(name) {
  const priority = TOPIC_PRIORITY.findIndex((topicName) => topicKey(topicName) === topicKey(name));
  return priority === -1 ? Number.MAX_SAFE_INTEGER : priority;
}

function buildTopicCatalog() {
  const topicsByKey = new Map();

  materialCorpus.forEach((material) => {
    getMaterialTopicNames(material).forEach((name) => {
      const key = topicKey(name);
      const existing = topicsByKey.get(key) || { key, name, materials: [], materialIds: new Set() };
      if (!existing.materialIds.has(material.id)) {
        existing.materials.push(material);
        existing.materialIds.add(material.id);
      }
      topicsByKey.set(key, existing);
    });
  });

  topicCatalog = [...topicsByKey.values()]
    .map(({ key, name, materials }) => ({
      id: `topic-${key}`,
      key,
      sourceName: name,
      name: translatedTopic(name),
      materials,
      searchable: normalize(globalThis.IslamdiniTranslation.topicSearch(name)),
    }))
    .sort((first, second) => (
      getTopicPriority(first.sourceName) - getTopicPriority(second.sourceName)
      || first.key.localeCompare(second.key, 'ky-KG')
    ));
  for (const section of Object.keys(IslamdiniSections.labels)) {
    const name = IslamdiniSections.text(section,currentLanguage);
    topicCatalog.push({id:'section-'+section,key:'section-'+section,name,sourceName:name,isSection:true,section,
      materials:materialCorpus.filter(m=>(m.source.sections||[]).includes(section)),searchable:normalize(IslamdiniSections.labels[section].join(' '))});
  }
}

function getActiveTopic() {
  return topicCatalog.find((topic) => topic.id === activeTopicId) || null;
}

function getActiveMaterial() {
  return materialCorpus.find((material) => material.id === activeMaterialId) || null;
}

function formatTopicMaterialCount(count) {
  const formatted = new Intl.NumberFormat(localeMap[currentLanguage]).format(count);
  if (currentLanguage === 'ru') {
    const form = new Intl.PluralRules('ru').select(count);
    return `${formatted} ${{ one: 'материал', few: 'материала', many: 'материалов', other: 'материала' }[form]}`;
  }
  if (currentLanguage === 'en') return `${formatted} ${count === 1 ? 'material' : 'materials'}`;
  return interpolate(t('topicMaterialsCount'), {
    count: formatted,
  });
}

function findTopicDirectoryMatches(query) {
  if (!query) return topicCatalog.filter(topic=>!topic.isSection);
  const semanticTopic = getSearchTopic(query);
  const matches = topicCatalog.filter((topic) => !topic.isSection && (
    topic.searchable.includes(query)
    || (semanticTopic && hasTopicTerm(topic.searchable, semanticTopic.terms))
  ));

  return [...matches].sort((first, second) => {
    const firstDirect = first.searchable.includes(query);
    const secondDirect = second.searchable.includes(query);
    return Number(secondDirect) - Number(firstDirect)
      || getTopicPriority(first.sourceName) - getTopicPriority(second.sourceName)
      || first.key.localeCompare(second.key, 'ky-KG');
  });
}

function createTopicCard(topic) {
  const card = document.createElement('button');
  card.type = 'button';
  card.className = 'topic-card';
  card.dataset.topicId = topic.id;
  if (getTopicPriority(topic.sourceName) !== Number.MAX_SAFE_INTEGER) card.classList.add('topic-card--foundation');
  card.setAttribute('aria-label', `${topic.name}: ${formatTopicMaterialCount(topic.materials.length)}`);

  const folder = document.createElement('span');
  folder.className = 'topic-folder';
  folder.setAttribute('aria-hidden', 'true');

  const copy = document.createElement('span');
  copy.className = 'topic-card-copy';
  const title = document.createElement('strong');
  title.className = 'topic-card-title';
  title.textContent = topic.name;
  copy.append(title);

  const meta = document.createElement('span');
  meta.className = 'topic-card-meta';
  const count = document.createElement('span');
  count.className = 'topic-card-count';
  count.textContent = formatTopicMaterialCount(topic.materials.length);
  const arrow = document.createElement('span');
  arrow.className = 'topic-card-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '→';
  meta.append(count, arrow);

  card.append(folder, copy, meta);
  return card;
}

function createMaterialCard(material) {
  const card = document.createElement('article');
  card.className = 'material-card';
  card.dataset.materialId = material.id;

  const category = document.createElement('p');
  category.className = 'material-category';
  category.textContent = translatedTopic(material.category) || t('materialLabel');

  const title = document.createElement('h3');
  title.textContent = material.title;

  const excerpt = document.createElement('p');
  excerpt.className = 'material-excerpt';
  excerpt.textContent = material.excerpt;
  const readButton = document.createElement('button');
  readButton.type = 'button';
  readButton.className = 'material-read';
  readButton.textContent = t('materialRead');
  readButton.addEventListener('click', () => openMaterial(material.id));
  card.append(category, title, excerpt, readButton);
  renderTranslatedField(title, material.source.title);
  renderTranslatedField(excerpt, material.source.excerpt || material.source.content);

  return card;
}

function formatRecentMaterialDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(localeMap[currentLanguage], {
    day: '2-digit',
    month: '2-digit',
  }).format(date);
}

function formatArticleDate(value) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(localeMap[currentLanguage], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function readContentRoute() {
  const url = new URL(window.location.href);
  return {
    topicId: url.searchParams.get('topic') || '',
    materialId: url.searchParams.get('material') || '',
    query: url.searchParams.get('q') || '',
  };
}

function updateContentRoute({ topicId = '', materialId = '', query = activeMaterialQuery, replace = false } = {}) {
  const url = new URL(window.location.href);
  const cleanQuery = String(query || '').trim();
  if (topicId) url.searchParams.set('topic', topicId); else url.searchParams.delete('topic');
  if (materialId) url.searchParams.set('material', materialId); else url.searchParams.delete('material');
  if (cleanQuery) url.searchParams.set('q', cleanQuery); else url.searchParams.delete('q');
  if (topicId || materialId || cleanQuery) url.hash = 'topics';
  const route = `${url.pathname}${url.search}${url.hash}`;
  const state = { topicId, materialId, query: cleanQuery };
  if (replace) window.history.replaceState(state, '', route);
  else window.history.pushState(state, '', route);
}

function focusTopicContent(element) {
  const topics = document.querySelector('#topics');
  topics?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => element?.focus({ preventScroll: true }), 220);
}

function showTopicView() {
  document.querySelectorAll('#material-media audio').forEach(audio=>audio.pause());
  document.body.classList.add('is-topic-view');
  document.body.classList.remove('is-article-view');
  articleReader.hidden = true;
}

function showArticleView() {
  document.body.classList.add('is-topic-view', 'is-article-view');
}

function hideFocusedViews() {
  document.querySelectorAll('#material-media audio').forEach(audio=>audio.pause());
  document.body.classList.remove('is-topic-view', 'is-article-view');
  articleReader.hidden = true;
}

function openMaterial(materialId, { updateHistory = true, focus = true } = {}) {
  const material = materialCorpus.find((candidate) => candidate.id === materialId);
  if (!material) return;
  const materialTopic = getActiveTopic() || topicCatalog.find((topic) => topic.materials.some((candidate) => candidate.id === material.id));
  if (!materialTopic) return;

  activeTopicId = materialTopic.id;
  activeMaterialId = material.id;
  if (updateHistory) updateContentRoute({ topicId: activeTopicId, materialId: activeMaterialId });
  renderArticleReader();
  if (focus) focusTopicContent(articleTitle);
}

function returnToTopic() {
  if (!getActiveTopic()) return;
  activeMaterialId = '';
  updateContentRoute({ topicId: activeTopicId });
  renderSelectedTopicMaterials(true);
  focusTopicContent(selectedTopicTitle);
}

function returnToTopicDirectory() {
  const query = activeMaterialQuery;
  activeTopicId = '';
  activeMaterialId = '';
  updateContentRoute({ query });
  renderTopicDirectory(query, true);
  const title = document.querySelector('#reading-title');
  document.querySelector('#topics')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => title?.focus?.({ preventScroll: true }), 220);
}

function openRecentMaterialTopic(material) {
  const topicName = getMaterialTopicNames(material)[0] || material.category || material.title;
  const topic = topicCatalog.find((candidate) => candidate.key === topicKey(topicName));
  if (topic) {
    openTopic(topic.id);
  } else {
    searchInput.value = topicName;
    renderTopicDirectory(topicName);
    updateContentRoute({ query: topicName });
    document.querySelector('#topics').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function createRecentMaterialCard(material) {
  const item = document.createElement('button');
  item.type = 'button';
  item.className = 'recent-material';
  item.setAttribute('aria-label', currentLanguage === 'ky' ? material.title : t('translationLoading'));

  const thumb = document.createElement('span');
  thumb.className = 'recent-material-thumb';
  thumb.setAttribute('aria-hidden', 'true');

  const copy = document.createElement('span');
  copy.className = 'recent-material-copy';
  const category = document.createElement('span');
  category.className = 'recent-material-category';
  category.textContent = translatedTopic(getMaterialTopicNames(material)[0] || material.category) || t('materialLabel');
  const title = document.createElement('strong');
  title.className = 'recent-material-title';
  title.textContent = material.title;
  copy.append(category, title);

  const date = document.createElement('time');
  date.className = 'recent-material-date';
  date.dateTime = material.publishedAt || '';
  date.textContent = formatRecentMaterialDate(material.publishedAt);
  item.append(thumb, copy, date);
  renderTranslatedField(title, material.source.title, { onTranslated: (value) => item.setAttribute('aria-label', value), retryButton: false });
  item.addEventListener('click', () => openRecentMaterialTopic(material));
  return item;
}

function renderRecentMaterials() {
  if (!recentMaterialList) return;
  const preview = sortMaterials(materialCorpus).slice(0, 3);
  if (!preview.length) {
    const loading = document.createElement('p');
    loading.className = 'recent-loading';
    loading.textContent = t('recentLoading');
    recentMaterialList.replaceChildren(loading);
    return;
  }
  recentMaterialList.replaceChildren(...preview.map(createRecentMaterialCard));
}

function renderTopicDirectory(rawQuery = activeMaterialQuery, preserveVisibleCount = false) {
  const previousQuery = normalize(activeMaterialQuery);
  activeMaterialQuery = rawQuery;
  const query = normalize(rawQuery);
  if (!preserveVisibleCount && query !== previousQuery) visibleTopicCount = TOPIC_PAGE_SIZE;
  activeTopicId = '';
  activeMaterialId = '';
  hideFocusedViews();
  const matches = findTopicDirectoryMatches(query);
  const visibleMatches = matches.slice(0, visibleTopicCount);

  topicList.replaceChildren(...visibleMatches.map(createTopicCard));
  topicDirectory.hidden = false;
  topicResults.hidden = true;
  articleList.replaceChildren();
  articleList.hidden = true;
  emptyState.hidden = !query || matches.length > 0;
  loadMoreMaterials.hidden = true;
  loadMoreTopics.hidden = visibleMatches.length >= matches.length || matches.length === 0;
  if (!loadMoreTopics.hidden) {
    loadMoreTopics.textContent = interpolate(t('topicLoadMore'), {
      count: Math.min(TOPIC_PAGE_SIZE, matches.length - visibleMatches.length),
    });
  }
  resetButtons.forEach((button) => {
    button.hidden = !query;
  });
  searchStatus.textContent = query
    ? (matches.length ? interpolate(t('searchFound'), { query: rawQuery.trim(), count: matches.length }) : t('emptySearch'))
    : '';
}

function renderSelectedTopicMaterials(preserveVisibleCount = false) {
  const topic = getActiveTopic();
  if (!topic) {
    renderTopicDirectory(activeMaterialQuery, preserveVisibleCount);
    return;
  }

  activeMaterialId = '';
  showTopicView();
  if (!preserveVisibleCount) visibleMaterialCount = MATERIAL_PAGE_SIZE;
  const matches = sortMaterials(topic.materials).filter(material=>!topic.isSection || !normalize(sectionQuery) || material.searchable.includes(normalize(sectionQuery)));
  let filter = document.querySelector('#section-filter');
  if (!filter) {
    filter = document.createElement('input');filter.id='section-filter';filter.type='search';filter.className='section-filter';
    filter.addEventListener('input',event=>{sectionQuery=event.target.value;renderSelectedTopicMaterials();});
    selectedTopicCount.after(filter);
  }
  filter.hidden=!topic.isSection;filter.value=sectionQuery;
  filter.placeholder=IslamdiniSections.text('search',currentLanguage);filter.setAttribute('aria-label',filter.placeholder);
  document.querySelector('#section-empty')?.remove();
  if (!matches.length && topic.isSection) { const message=document.createElement('p');message.id='section-empty';message.textContent=IslamdiniSections.text('empty',currentLanguage);filter.after(message); }
  document.querySelector('#section-prayer-link')?.remove();
  if(topic.section==='prayer'){const link=document.createElement('a');link.id='section-prayer-link';link.className='document-link';link.href='#prayer';link.textContent=IslamdiniSections.text('prayer',currentLanguage);filter.before(link);}
  const visibleMatches = matches.slice(0, visibleMaterialCount);

  topicDirectory.hidden = true;
  topicResults.hidden = false;
  articleReader.hidden = true;
  selectedTopicTitle.textContent = topic.name;
  selectedTopicCount.textContent = interpolate(t('topicSelectedCount'), {
    count: new Intl.NumberFormat(localeMap[currentLanguage]).format(matches.length),
  });
  if (currentLanguage !== 'ky') selectedTopicCount.textContent += ` · ${t('translationNotice')}`;
  articleList.replaceChildren(...visibleMatches.map(createMaterialCard));
  articleList.hidden = matches.length === 0;
  emptyState.hidden = true;
  loadMoreTopics.hidden = true;
  loadMoreMaterials.hidden = visibleMatches.length >= matches.length || matches.length === 0;
  if (!loadMoreMaterials.hidden) {
    loadMoreMaterials.textContent = interpolate(t('materialLoadMore'), {
      count: Math.min(MATERIAL_PAGE_SIZE, matches.length - visibleMatches.length),
    });
  }
  resetButtons.forEach((button) => {
    button.hidden = !normalize(activeMaterialQuery);
  });
  searchStatus.textContent = '';
}

function renderArticleReader() {
  const topic = getActiveTopic();
  const material = getActiveMaterial();
  if (!topic || !material) {
    renderSelectedTopicMaterials(true);
    return;
  }

  showArticleView();
  topicDirectory.hidden = true;
  topicResults.hidden = true;
  articleList.hidden = true;
  emptyState.hidden = true;
  loadMoreTopics.hidden = true;
  loadMoreMaterials.hidden = true;
  articleReader.hidden = false;
  articleTitle.textContent = material.title;

  const meta = [topic.name, formatArticleDate(material.publishedAt)].filter(Boolean);
  if (currentLanguage !== 'ky') meta.push(t('translationNotice'));
  articleMeta.textContent = meta.join(' · ');
  renderTranslatedField(articleTitle, material.source.title);
  document.querySelectorAll('#material-media audio').forEach(audio=>audio.pause());
  IslamdiniSections.renderMedia(material,currentLanguage,openMaterial,sortMaterials(materialCorpus.filter(m=>m.source.pageNumber)));
  renderTranslatedField(articleContent, material.source.content || material.source.excerpt || material.source.title, { paragraphs: true });
  resetButtons.forEach((button) => {
    button.hidden = true;
  });
  searchStatus.textContent = '';
}

function openTopic(topicId, { updateHistory = true, focus = true } = {}) {
  const topic = topicCatalog.find((candidate) => candidate.id === topicId);
  if (!topic) return;
  sectionQuery='';
  activeTopicId = topic.id;
  activeMaterialId = '';
  if (updateHistory) updateContentRoute({ topicId: activeTopicId });
  renderSelectedTopicMaterials();
  if (focus) focusTopicContent(selectedTopicTitle);
}

function applyContentRoute({ focus = false } = {}) {
  const route = readContentRoute();
  const query = route.query;
  searchInput.value = query;
  activeMaterialQuery = query;
  const topic = topicCatalog.find((candidate) => candidate.id === route.topicId);
  if (!topic) {
    renderTopicDirectory(query);
    return;
  }

  activeTopicId = topic.id;
  const material = topic.materials.find((candidate) => candidate.id === route.materialId);
  if (material) {
    activeMaterialId = material.id;
    renderArticleReader();
    if (focus) focusTopicContent(articleTitle);
    return;
  }

  activeMaterialId = '';
  renderSelectedTopicMaterials();
  if (focus) focusTopicContent(selectedTopicTitle);
}

async function loadMaterials() {
  const bundledMaterials = globalThis.ISLAMDIDI_MATERIALS;
  if (Array.isArray(bundledMaterials?.materials)) {
    materialCorpus = bundledMaterials.materials.map(normalizeMaterial).filter(Boolean);
  } else {
    try {
      const response = await fetch('data/materials.json', { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Materials request failed: ${response.status}`);
      const payload = await response.json();
      materialCorpus = Array.isArray(payload?.materials)
        ? payload.materials.map(normalizeMaterial).filter(Boolean)
        : [];
    } catch {
      materialCorpus = [];
    }
  }
  buildTopicCatalog();
  renderRecentMaterials();
  applyContentRoute();
}

function getDateParts(timeZone, date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  return Object.fromEntries(formatter.formatToParts(date)
    .filter((part) => part.type !== 'literal')
    .map((part) => [part.type, part.value]));
}

function getApiDate(timeZone, date = new Date()) {
  const parts = getDateParts(timeZone, date);
  return parts.day + '-' + parts.month + '-' + parts.year;
}

function cleanTime(value) {
  return String(value || '—').replace(/\s*\(.+\)$/, '');
}

function normalizeTime(value) {
  const match = String(value || '').match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (!Number.isInteger(hours) || !Number.isInteger(minutes) || hours > 23 || minutes > 59) return null;
  return String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
}

function normalizeTimings(rawTimings) {
  const fieldMap = {
    Fajr: ['Fajr', 'fajr'],
    Sunrise: ['Sunrise', 'sunrise'],
    Dhuhr: ['Dhuhr', 'dhuhr'],
    Asr: ['Asr', 'asr'],
    Maghrib: ['Maghrib', 'maghrib'],
    Isha: ['Isha', 'isha'],
  };
  const timings = {};

  for (const [key, aliases] of Object.entries(fieldMap)) {
    const value = aliases.map((alias) => rawTimings?.[alias]).find((candidate) => candidate !== undefined);
    const normalized = normalizeTime(value);
    if (!normalized) return null;
    timings[key] = normalized;
  }
  return timings;
}

function getMinutes(time) {
  const timeParts = cleanTime(time).split(':').map(Number);
  const hours = timeParts[0];
  const minutes = timeParts[1];
  return Number.isFinite(hours) && Number.isFinite(minutes)
    ? hours * 60 + minutes
    : Number.POSITIVE_INFINITY;
}

function getCurrentMinutes(timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts
    .filter((part) => part.type !== 'literal')
    .map((part) => [part.type, part.value]));
  return Number(values.hour) * 60 + Number(values.minute);
}

function formatDate(timeZone, date = new Date()) {
  return new Intl.DateTimeFormat(localeMap[currentLanguage], {
    timeZone,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getCacheKey(cityCode, apiDate) {
  return 'islamdidi:prayer:v' + PRAYER_CACHE_VERSION + ':' + cityCode + ':' + apiDate;
}

function readCachedSchedule(cityCode, apiDate) {
  try {
    const stored = localStorage.getItem(getCacheKey(cityCode, apiDate));
    if (!stored) return null;
    const entry = JSON.parse(stored);
    if (entry?.version !== PRAYER_CACHE_VERSION || entry.date !== apiDate) return null;
    const timings = normalizeTimings(entry.timings);
    if (!timings) return null;
    if (entry.source !== 'official') return null;
    const source = 'official';
    return { timings, source };
  } catch {
    return null;
  }
}

function writeCachedSchedule(cityCode, apiDate, schedule) {
  try {
    localStorage.setItem(getCacheKey(cityCode, apiDate), JSON.stringify({
      version: PRAYER_CACHE_VERSION,
      date: apiDate,
      source: schedule.source,
      timings: schedule.timings,
      savedAt: Date.now(),
    }));
  } catch {
    // A blocked or full browser cache must not stop the live timetable.
  }
}

function getCityName(city) {
  return city.cityLabelKey ? t(city.cityLabelKey) : globalThis.IslamdiniTranslation.place(city.officialTitle || city.displayName || '', currentLanguage);
}

function getCityRegion(city) {
  return city.regionLabelKey ? t(city.regionLabelKey) : globalThis.IslamdiniTranslation.place(city.officialRegion || city.displayRegion || '', currentLanguage);
}

function getCityOptionLabel(city) {
  const name = getCityName(city);
  const region = getCityRegion(city);
  return region && normalize(region) !== normalize(name) ? name + ' · ' + region : name;
}

function getCitySearchText(city) {
  return [getCityOptionLabel(city), city.officialTitle, city.displayName, ...(city.searchAliases || [])].join(' ');
}

function getCityOptionKeys() {
  return cityLocationsLoaded
    ? [...new Set([...fallbackCityKeys, ...officialCityKeys])]
    : fallbackCityKeys;
}

function renderCityOptions() {
  const query = normalize(citySearch.value);
  const groups = new Map();
  const matches = getCityOptionKeys().filter((key) => {
    const city = cities[key];
    return city && (!query || normalize(getCitySearchText(city)).includes(query));
  });

  cityLocations.replaceChildren();
  if (!matches.length) {
    cityListStatus.textContent = t('cityListEmpty');
    return;
  }

  matches.forEach((key) => {
    const city = cities[key];
    const region = getCityRegion(city) || t('changeCity');
    if (!groups.has(region)) groups.set(region, []);
    groups.get(region).push({ key, city });
  });

  groups.forEach((locations, region) => {
    const heading = document.createElement('p');
    heading.className = 'city-region-heading';
    heading.textContent = region;
    cityLocations.append(heading);

    locations.forEach(({ key, city }) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.city = key;
      button.textContent = getCityName(city);
      button.classList.toggle('is-selected', key === selectedCity);
      if (key === selectedCity) button.setAttribute('aria-current', 'true');
      cityLocations.append(button);
    });
  });

  cityListStatus.textContent = interpolate(t('cityListReady'), { count: matches.length });
}

function updateCityHeading() {
  const city = cities[selectedCity];
  if (!city) return;
  const region = getCityRegion(city);
  const title = document.createTextNode(getCityName(city));
  cityTitle.replaceChildren(title);
  if (region) {
    const subtitle = document.createElement('small');
    subtitle.textContent = region;
    cityTitle.append(subtitle);
  }
}

function renderPrayerPlaceholder() {
  prayerTimes.innerHTML = prayerOrder.map(([, labelKey]) => '<div><dt>' + t(labelKey) + '</dt><dd>—</dd></div>').join('');
}

function renderPrayerTimes(timings, city, source) {
  const now = getCurrentMinutes(city.timeZone);
  const nextToday = prayerOrder.find(([key]) => getMinutes(timings[key]) > now)?.[0];
  const nextPrayer = nextToday
    ? { key: nextToday, isTomorrow: false }
    : (tomorrowTimings?.Fajr ? { key: 'Fajr', isTomorrow: true } : null);

  prayerTimes.innerHTML = prayerOrder.map(([key, labelKey]) => {
    const isNext = key === nextPrayer?.key;
    const marker = isNext ? ' <span>' + (nextPrayer.isTomorrow ? t('tomorrow') : t('next')) + '</span>' : '';
    const displayedTime = isNext && nextPrayer.isTomorrow ? tomorrowTimings.Fajr : timings[key];
    return '<div class="' + (isNext ? 'is-next' : '') + '"><dt>' + t(labelKey) + marker
      + '</dt><dd>' + cleanTime(displayedTime) + '</dd></div>';
  }).join('');

  const calculationLabel = source.includes('aladhan') ? t('prayerCalculated') : t('prayerFallback');
  const sourceLabel = source === 'fallback' || source === 'aladhan'
    ? calculationLabel
    : (source === 'cache-fallback' || source === 'cache-aladhan'
      ? t('prayerCached') + ' · ' + calculationLabel
      : (source.startsWith('cache') ? t('prayerCached') : t('prayerOfficial')));
  prayerStatus.textContent = interpolate(t('prayerCurrent'), { date: formatDate(city.timeZone) })
    + ' · ' + sourceLabel;
}

async function fetchJsonWithTimeout(url, parentSignal) {
  const controller = new AbortController();
  const abortFromParent = () => controller.abort();
  if (parentSignal?.aborted) controller.abort();
  else parentSignal?.addEventListener('abort', abortFromParent, { once: true });
  const timeoutId = window.setTimeout(() => controller.abort(), PRAYER_REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error('Prayer schedule returned ' + response.status);
    return await response.json();
  } finally {
    window.clearTimeout(timeoutId);
    parentSignal?.removeEventListener('abort', abortFromParent);
  }
}

function applyOfficialLocationGroups(groups) {
  const locationKeys = [];

  groups.forEach((group) => {
    const region = String(group?.title || '').trim();
    if (!region || !Array.isArray(group?.locations)) return;

    group.locations.forEach((location) => {
      const code = Number(location?.id);
      const title = String(location?.title || '').trim();
      if (!Number.isInteger(code) || code < 1 || !title) return;

      const key = 'namazvakti-' + code;
      const existing = cities[key] || {};
      cities[key] = {
        ...existing,
        namazvaktiCode: code,
        timeZone: 'Asia/Bishkek',
        officialTitle: title,
        officialRegion: region,
      };
      if (!cityKeyByMuftiyatCode.has(code)) cityKeyByMuftiyatCode.set(code, key);
      locationKeys.push(key);
    });
  });

  officialCityKeys.splice(0, officialCityKeys.length, ...locationKeys);
  cityLocationsLoaded = officialCityKeys.length > 0;
}

async function loadOfficialLocations() {
  cityListStatus.textContent = t('cityListLoading');
  try {
    const payload = await fetchJsonWithTimeout('/api/locations');
    if (payload?.source !== 'namazvakti' || !Array.isArray(payload.groups)) {
      throw new Error('Official location list returned incomplete data');
    }
    applyOfficialLocationGroups(payload.groups);
    if (!cityLocationsLoaded) throw new Error('Official location list was empty');

    if (deferredSavedCity && cities[deferredSavedCity]) {
      selectedCity = deferredSavedCity;
      deferredSavedCity = '';
      updateCityHeading();
      refreshPrayerSchedule(selectedCity);
      schedulePrayerDayRollover();
    } else {
      updateCityHeading();
    }
    renderCityOptions();
  } catch {
    cityLocationsLoaded = false;
    renderCityOptions();
  }
}

async function fetchOfficialPrayerTimes(city, apiDate, signal) {
  const params = new URLSearchParams({date:apiDate});
  if (city.namazvaktiCode) params.set('cityID',city.namazvaktiCode);
  else {
    params.set('latitude',city.latitude); params.set('longitude',city.longitude);
    const zone = new Intl.DateTimeFormat('en-US',{timeZone:city.timeZone,timeZoneName:'longOffset'}).formatToParts(new Date()).find(p=>p.type==='timeZoneName')?.value || 'GMT';
    const parts = zone.match(/GMT([+-])(\d{2}):(\d{2})/);
    params.set('offset',parts ? (parts[1]==='-'?-1:1)*(Number(parts[2])*3600+Number(parts[3])*60) : 0);
  }
  const url = '/api/prayer?' + params;
  const payload = await fetchJsonWithTimeout(url, signal);
  const timings = payload?.source === 'namazvakti' && payload?.date === apiDate
    ? normalizeTimings(payload.timings)
    : null;
  if (!timings) throw new Error('Official timetable returned incomplete data');
  return timings;
}

async function fetchFallbackPrayerTimes(city, apiDate, signal) {
  const url = new URL('https://api.aladhan.com/v1/timings/' + apiDate);
  url.searchParams.set('latitude', city.latitude);
  url.searchParams.set('longitude', city.longitude);
  url.searchParams.set('method', '99');
  url.searchParams.set('methodSettings', '18,null,16');
  url.searchParams.set('school', '1');
  url.searchParams.set('timezonestring', city.timeZone);
  const payload = await fetchJsonWithTimeout(url, signal);
  const timings = payload?.code === 200 ? normalizeTimings(payload?.data?.timings) : null;
  if (!timings) throw new Error('Backup timetable returned incomplete data');
  return timings;
}

async function requestPrayerSchedule(city, apiDate, signal) {
  return { timings: await fetchOfficialPrayerTimes(city, apiDate, signal), source: 'official' };
}

function setPrayerRetryVisible(visible) {
  prayerRetry.hidden = !visible;
}

function schedulePrayerRetry() {
  window.clearTimeout(prayerRetryTimer);
  const delay = PRAYER_RETRY_DELAYS[Math.min(prayerRetryAttempt, PRAYER_RETRY_DELAYS.length - 1)];
  prayerRetryAttempt += 1;
  prayerRetryTimer = window.setTimeout(() => refreshPrayerSchedule(selectedCity), delay);
}

async function preloadTomorrowPrayerTimes(cityCode, currentApiDate) {
  const city = cities[cityCode];
  const tomorrowDate = getApiDate(city.timeZone, new Date(Date.now() + 36 * 60 * 60 * 1000));
  const cached = readCachedSchedule(cityCode, tomorrowDate);
  if (cached && cityCode === selectedCity && currentScheduleDate === currentApiDate) {
    tomorrowTimings = cached.timings;
    renderPrayerTimes(currentTimings, city, currentTimingSource);
  }

  try {
    const schedule = await requestPrayerSchedule(city, tomorrowDate);
    writeCachedSchedule(cityCode, tomorrowDate, schedule);
    if (cityCode === selectedCity && currentScheduleDate === currentApiDate) {
      tomorrowTimings = schedule.timings;
      renderPrayerTimes(currentTimings, city, currentTimingSource);
    }
  } catch {
    // The current day stays usable even when tomorrow cannot be preloaded.
  }
}

async function refreshPrayerSchedule(cityCode = selectedCity) {
  const city = cities[cityCode];
  if (!city) return;

  const apiDate = getApiDate(city.timeZone);
  const cache = readCachedSchedule(cityCode, apiDate);
  const requestId = ++prayerRequestId;
  window.clearTimeout(prayerRetryTimer);
  if (prayerAbortController) prayerAbortController.abort();
  const controller = new AbortController();
  prayerAbortController = controller;
  tomorrowTimings = null;
  setPrayerRetryVisible(false);

  if (cache) {
    currentTimings = cache.timings;
    currentTimingSource = 'cache-' + cache.source;
    currentScheduleDate = apiDate;
    currentScheduleCity = cityCode;
    renderPrayerTimes(currentTimings, city, currentTimingSource);
  } else if (!currentTimings || currentScheduleDate !== apiDate || currentScheduleCity !== cityCode) {
    currentTimings = null;
    currentScheduleDate = '';
    currentScheduleCity = '';
    renderPrayerPlaceholder();
    prayerStatus.textContent = t('prayerLoading');
  } else {
    prayerStatus.textContent = t('prayerRefreshing');
  }

  try {
    const schedule = await requestPrayerSchedule(city, apiDate, controller.signal);
    if (requestId !== prayerRequestId || cityCode !== selectedCity) return;

    currentTimings = schedule.timings;
    currentTimingSource = schedule.source;
    currentScheduleDate = apiDate;
    currentScheduleCity = cityCode;
    prayerRetryAttempt = 0;
    lastPrayerRefreshAt = Date.now();
    writeCachedSchedule(cityCode, apiDate, schedule);
    renderPrayerTimes(currentTimings, city, currentTimingSource);
    // NamazVakti's daily page is refreshed after local midnight; do not reuse
    // today's times as a prediction for tomorrow.
  } catch (error) {
    if (requestId !== prayerRequestId || cityCode !== selectedCity || controller.signal.aborted) return;
    lastPrayerRefreshAt = Date.now();
    if (cache) {
      currentTimings = cache.timings;
      currentTimingSource = 'cache-' + cache.source;
      currentScheduleDate = apiDate;
      currentScheduleCity = cityCode;
      renderPrayerTimes(currentTimings, city, currentTimingSource);
    } else if (currentTimings && currentScheduleDate === apiDate && currentScheduleCity === cityCode) {
      renderPrayerTimes(currentTimings, city, currentTimingSource);
      prayerStatus.textContent = location.protocol === 'file:' ? ({ky:'Намаз убактысын жүктөө үчүн Start-IslamDini.cmd файлын ачыңыз.',ru:'Для загрузки NamazVakti откройте Start-IslamDini.cmd в папке сайта.',en:'Open Start-IslamDini.cmd in the site folder to load NamazVakti.'})[currentLanguage] : t('prayerFailed');
    } else {
      renderPrayerPlaceholder();
      prayerStatus.textContent = location.protocol === 'file:' ? ({ky:'Намаз убактысын жүктөө үчүн Start-IslamDini.cmd файлын ачыңыз.',ru:'Для загрузки NamazVakti откройте Start-IslamDini.cmd в папке сайта.',en:'Open Start-IslamDini.cmd in the site folder to load NamazVakti.'})[currentLanguage] : t('prayerFailed');
    }
    setPrayerRetryVisible(true);
    schedulePrayerRetry();
  } finally {
    if (prayerAbortController === controller) prayerAbortController = null;
  }
}

function schedulePrayerDayRollover() {
  window.clearTimeout(prayerDayTimer);
  const city = cities[selectedCity];
  const minutesUntilTomorrow = (24 * 60) - getCurrentMinutes(city.timeZone);
  const delay = Math.max(60 * 1000, Math.min((minutesUntilTomorrow * 60 * 1000) + 2000, 24 * 60 * 60 * 1000));
  prayerDayTimer = window.setTimeout(() => {
    refreshPrayerSchedule(selectedCity);
    schedulePrayerDayRollover();
  }, delay);
}

function ensurePrayerSchedule() {
  const city = cities[selectedCity];
  const apiDate = getApiDate(city.timeZone);
  if (!currentTimings || currentScheduleDate !== apiDate || currentScheduleCity !== selectedCity) {
    if (!prayerAbortController) refreshPrayerSchedule(selectedCity);
    return;
  }

  renderPrayerTimes(currentTimings, city, currentTimingSource);
  if (!prayerAbortController && Date.now() - lastPrayerRefreshAt >= PRAYER_REFRESH_INTERVAL) {
    refreshPrayerSchedule(selectedCity);
  }
}

function closeLanguageMenu() {
  languageButton.setAttribute('aria-expanded', 'false');
  languageOptions.hidden = true;
}

function closeCityMenu(restoreFocus = false) {
  const wasOpen = cityButton.getAttribute('aria-expanded') === 'true';
  cityButton.setAttribute('aria-expanded', 'false');
  cityOptions.hidden = true;
  if (citySearch.value) {
    citySearch.value = '';
    renderCityOptions();
  }
  citySearch.blur();
  if (wasOpen && restoreFocus) cityButton.focus();
}

function translatePage() {
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => {
    element.innerHTML = t(element.dataset.i18nHtml);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    element.setAttribute('aria-label', t(element.dataset.i18nAria));
  });

  document.documentElement.lang = currentLanguage;
  document.title = t('documentTitle');
  description.setAttribute('content', t('metaDescription'));
  languageLabel.textContent = languageNames[currentLanguage];
}

function setLanguage(language, persist = true) {
  if (!translations[language]) return;
  const activeTopicKey = getActiveTopic()?.key || '';
  const activeMaterialKey = getActiveMaterial()?.id || '';
  currentLanguage = language;
  translatePage();
  applyTheme(document.body.dataset.theme, false);
  localizeMaterialCorpus();
  buildTopicCatalog();
  renderRecentMaterials();
  activeTopicId = topicCatalog.find((topic) => topic.key === activeTopicKey)?.id || '';
  activeMaterialId = materialCorpus.some((material) => material.id === activeMaterialKey) ? activeMaterialKey : '';
  updateCityHeading();
  renderCityOptions();
  closeLanguageMenu();
  if (activeTopicId && activeMaterialId) {
    renderArticleReader();
  } else if (activeTopicId) {
    renderSelectedTopicMaterials(true);
  } else {
    renderTopicDirectory(searchInput.value);
  }

  if (currentTimings) {
    renderPrayerTimes(currentTimings, cities[selectedCity], currentTimingSource);
  } else {
    renderPrayerPlaceholder();
    prayerStatus.textContent = t('prayerLoading');
  }

  if (persist) localStorage.setItem('islamdidi:language', currentLanguage);
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  updateContentRoute({ query: searchInput.value, replace: true });
  renderTopicDirectory(searchInput.value);
  document.querySelector('#topics').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

searchInput.addEventListener('input', (event) => {
  updateContentRoute({ query: event.target.value, replace: true });
  renderTopicDirectory(event.target.value);
});

topicQueryControls.forEach((control) => {
  control.addEventListener('click', (event) => {
    const query = globalThis.IslamdiniTranslation.shortQuery(control.dataset.topicQuery, currentLanguage);
    if (!query) return;
    event.preventDefault();
    searchInput.value = query;
    updateContentRoute({ query });
    renderTopicDirectory(query);
    document.querySelector('#topics').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

topicList.addEventListener('click', (event) => {
  const target = event.target.closest('button[data-topic-id]');
  if (!target) return;
  openTopic(target.dataset.topicId);
});

loadMoreTopics.addEventListener('click', () => {
  visibleTopicCount += TOPIC_PAGE_SIZE;
  renderTopicDirectory(activeMaterialQuery, true);
});

loadMoreMaterials.addEventListener('click', () => {
  visibleMaterialCount += MATERIAL_PAGE_SIZE;
  renderSelectedTopicMaterials(true);
});

backToTopics.addEventListener('click', () => {
  returnToTopicDirectory();
});

backToTopic.addEventListener('click', () => {
  returnToTopic();
});

resetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    searchInput.value = '';
    updateContentRoute({ replace: true });
    renderTopicDirectory('');
    searchInput.focus();
  });
});

cityButton.addEventListener('click', () => {
  const isOpen = cityButton.getAttribute('aria-expanded') === 'true';
  if (isOpen) {
    closeCityMenu();
    return;
  }
  cityButton.setAttribute('aria-expanded', 'true');
  cityOptions.hidden = false;
  renderCityOptions();
  window.setTimeout(() => {
    if (cityButton.getAttribute('aria-expanded') === 'true') citySearch.focus();
  }, 0);
});

citySearch.addEventListener('input', renderCityOptions);

cityClose.addEventListener('click', () => closeCityMenu(true));

cityOptions.addEventListener('click', (event) => {
  const target = event.target.closest('button[data-city]');
  if (!target) return;
  selectedCity = target.dataset.city;
  localStorage.setItem('islamdidi:region', selectedCity);
  citySearch.value = '';
  updateCityHeading();
  renderCityOptions();
  closeCityMenu();
  refreshPrayerSchedule(selectedCity);
  schedulePrayerDayRollover();
});

languageButton.addEventListener('click', () => {
  const isOpen = languageButton.getAttribute('aria-expanded') === 'true';
  languageButton.setAttribute('aria-expanded', String(!isOpen));
  languageOptions.hidden = isOpen;
});

themeToggle.addEventListener('click', () => {
  applyTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
});

languageOptions.addEventListener('click', (event) => {
  const target = event.target.closest('button[data-language]');
  if (!target) return;
  setLanguage(target.dataset.language);
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  primaryNav.classList.toggle('is-open', !isOpen);
});

primaryNav.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  primaryNav.classList.remove('is-open');
});

document.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]:not([data-topic-query])');
  if (link && document.body.classList.contains('is-topic-view') && !link.classList.contains('skip-link')) {
    updateContentRoute({ replace: true });
    renderTopicDirectory(activeMaterialQuery, true);
  }
  if (!event.target.closest('.language-switcher')) closeLanguageMenu();
  if (!event.target.closest('.city-select')) closeCityMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cityButton.getAttribute('aria-expanded') === 'true') {
    event.preventDefault();
    closeCityMenu(true);
  }
});

prayerRetry.addEventListener('click', () => {
  prayerRetryAttempt = 0;
  refreshPrayerSchedule(selectedCity);
});

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    ensurePrayerSchedule();
    schedulePrayerDayRollover();
  }
});

window.addEventListener('focus', ensurePrayerSchedule);
window.addEventListener('pageshow', ensurePrayerSchedule);
window.addEventListener('online', () => {
  prayerRetryAttempt = 0;
  refreshPrayerSchedule(selectedCity);
});

window.addEventListener('popstate', () => {
  applyContentRoute({ focus: true });
});

const savedLanguage = localStorage.getItem('islamdidi:language');
const sectionLabels={quickQuranTitle:'quran',quickPrayerTitle:'prayer',quickDuaTitle:'dua',quickHadithTitle:'hadith',featurePrayerTitle:'worship',quickEthicsTitle:'ethics',quickLibraryTitle:'library',navLibrary:'library',quickMediaTitle:'media',actionQuranTitle:'quran'};
document.querySelectorAll('a').forEach(link=>{
  const label=link.dataset.i18n || link.querySelector('strong[data-i18n]')?.dataset.i18n;
  const section=sectionLabels[label];if(!section)return;
  link.dataset.section=section;
  const url=new URL(location.href);url.searchParams.delete('material');url.searchParams.delete('q');url.searchParams.set('topic','section-'+section);url.hash='topics';link.href=url.href;
});
document.addEventListener('click',event=>{
  const link=event.target.closest('a[data-section]');if(!link || event.ctrlKey || event.metaKey || event.shiftKey || event.button!==0)return;
  event.preventDefault();event.stopPropagation();openTopic('section-'+link.dataset.section);
  primaryNav.classList.remove('is-open');menuToggle.setAttribute('aria-expanded','false');
},true);
const savedCity = localStorage.getItem('islamdidi:region');
const savedTheme = localStorage.getItem('islamdidi:theme');
if (cities[savedCity]) selectedCity = savedCity;
else if (/^namazvakti-\d+$/.test(savedCity || '')) deferredSavedCity = savedCity;
setLanguage(translations[savedLanguage] ? savedLanguage : 'ky', false);
applyTheme(savedTheme, false);
loadMaterials();
refreshPrayerSchedule(selectedCity);
schedulePrayerDayRollover();
window.setInterval(ensurePrayerSchedule, 60 * 1000);
loadOfficialLocations();
