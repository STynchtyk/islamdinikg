# Обновление Vercel

Загрузите в репозиторий содержимое всей этой папки, а не только index.html.
Обязательны translation.js, sections.js, app.js, data/, media/, assets/, api/, namazvakti.js, scripts/build-vercel.cjs и vercel.json.

В Vercel выберите корень этой папки как Root Directory. Framework Preset: Other.
Команда сборки и папка результата уже указаны в vercel.json. Выполните Redeploy.
Не загружайте локально созданную dist/ в Git — она создаётся при сборке.

После публикации проверьте /translation.js, /api/locations и разделы Намаз, Дуба, Китепкана, Медиа и Видео.
Время приходит из NamazVakti и требует доступности их сервера. При ошибке сайт не подставляет выдуманное расписание.
Состав материалов хранится в data/materials.json и data/materials.js. PDF, аудиозаписи и видео сохраняют язык оригинала.
