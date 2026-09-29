(() => {
  const labels={prayer:['Намаз','Намаз','Prayer'],dua:['Дуба','Дуа','Dua'],library:['Китепкана','Библиотека','Library'],media:['Медиа','Медиа','Media'],video:['Видео','Видео','Videos'],terms:['Термин','Термин','Terms'],questions:['Суроо-жооп','Вопросы','Questions']};
  const messages={
    linksIntro:['Ислам дини тууралуу бир гана ахли сүннөт (төрт мазхаб) акыйдасы боюнча маалымат бере турган сүннү сайттар:','Суннитские сайты, предоставляющие информацию об Исламе только в соответствии с вероубеждением ахлю-сунна (четыре мазхаба):','Sunni websites providing information about Islam solely in accordance with the beliefs of Ahl al-Sunnah (the four madhhabs):'],
    linksPrayer:['Дүйнө жүзүндөгү шаарларга карата намаз убакыттары','Время намаза для городов по всему миру','Prayer times for cities around the world'],
    linksKazakh:['Казак тилиндеги сайт','Сайт на казахском языке','Website in Kazakh'],
    linksRussian:['Орус тилиндеги сайт','Сайт на русском языке','Website in Russian'],
    linksUzbek:['Өзбек тилиндеги сайт','Сайт на узбекском языке','Website in Uzbek'],
    linksTurkish:['Түрк тилиндеги сайт','Сайт на турецком языке','Website in Turkish'],
    linksEnglish:['Англис тилиндеги сайт','Сайт на английском языке','Website in English'],
    search:['Бул бөлүмдөн издөө…','Поиск в этом разделе…','Search this section…'],
    files:['Түп нуска материалдар','Оригинальные материалы','Original materials'],
    unavailable:['Бул файл архивде жок.','Этого файла нет в архиве.','This file is missing from the archive.'],
    error:['Файл ачылган жок.','Не удалось открыть файл.','The file could not be opened.'],
    open:['Окуу / ачуу','Читать / открыть','Read / open'],
    download:['Жүктөп алуу','Скачать','Download'],
    surahs:['Сүрөлөрдүн тизмеси','Список сур','List of surahs'],
    talks:['Аалымдардын сухбаттары','Беседы учёных','Scholars’ talks'],
    backMedia:['← Медиа','← Медиа','← Media'],
    termEmpty:['Мазмуну азырынча кошула элек.','Содержание пока не добавлено.','Content has not been added yet.'],
    termCount:['Терминдер:','Терминов:','Terms:'],
    original:['Тиркемелер түп нуска тилинде сакталган.','Вложения сохранены на языке оригинала.','Attachments retain their original language.'],
    youtube:['YouTube аркылуу ачуу','Открыть на YouTube','Open on YouTube'],
    videoNote:['Субтитрлер бар болсо, аларды YouTube ойноткучунун жөндөөлөрүнөн тандаңыз.','Если у видео есть субтитры, их можно выбрать в настройках плеера YouTube.','If captions are available, select them in the YouTube player settings.'],
    libraryEmpty:['Китептер жакында кошулат.','Книги скоро появятся.','Books will be added soon.'],
    empty:['Бул бөлүмдө табылган жок.','В этом разделе ничего не найдено.','No matches in this section.'],
    previous:['← Мурунку бет','← Предыдущая страница','← Previous page'],next:['Кийинки бет →','Следующая страница →','Next page →'],
    prayer:['Бүгүнкү намаз убактысы →','Время намаза на сегодня →','Today’s prayer times →'],
  };
  labels.links=['Шилтемелер','Ссылки','Links'];
  const text=(key,lang)=> (labels[key]||messages[key]||[key,key,key])[{ky:0,ru:1,en:2}[lang]||0];
  function renderLinks(lang) {
    const article=document.createElement('article');
    article.id='links-content';article.className='article-reader-body links-content';article.lang=lang;
    const intro=document.createElement('p');intro.textContent=text('linksIntro',lang);
    const list=document.createElement('ul');
    for(const [label,href,key] of [
      ['www.namazvakti.com','http://www.namazvakti.com/','linksPrayer'],
      ['www.islamdini.kz','http://www.islamdini.kz/','linksKazakh'],
      ['www.veraislam.ru','http://www.veraislam.ru/','linksRussian'],
      ['www.ahlisunnat.com','http://www.ahlisunnat.com/','linksUzbek'],
      ['www.dinimizislam.com','http://www.dinimizislam.com/','linksTurkish'],
      ['www.myreligionislam.com','http://www.myreligionislam.com/','linksEnglish'],
      ['www.ahlisunnet.kz','http://ahlisunnet.kz/','linksKazakh'],
    ]) {
      const item=document.createElement('li');
      const link=document.createElement('a');link.href=href;link.textContent=label;
      const description=document.createElement('span');description.textContent=` (${text(key,lang)})`;
      item.append(link,description);list.append(item);
    }
    article.append(intro,list);return article;
  }
  function renderMedia(material,lang,openPage,pages) {
    document.querySelector('#material-media')?.remove();
    const assets=material.source.media||[];
    if(!assets.length&&!material.source.pageNumber)return;
    const container=document.createElement('section');container.id='material-media';container.className='material-media';
    if(material.source.sections?.includes('library'))container.classList.add('material-media--book');
    const hasVideo=assets.some(asset=>asset.type==='youtube');
    const heading=document.createElement('h2');heading.textContent=text(hasVideo?'video':'files',lang);container.append(heading);
    const note=document.createElement('p');note.className='media-note';note.textContent=text(hasVideo?'videoNote':'original',lang);container.append(note);
    if(material.source.pageNumber) {
      const nav=document.createElement('nav');nav.className='page-reading-nav';
      const index=pages.findIndex(p=>p.id===material.id);
      for(const [key,page] of [['previous',pages[index-1]],['next',pages[index+1]]])if(page){const b=document.createElement('button');b.type='button';b.textContent=text(key,lang);b.addEventListener('click',()=>openPage(page.id));nav.append(b);}
      container.append(nav);
    }
    // YouTube embeds accept only video IDs; other assets must use local media paths.
    for(const asset of [...assets].sort((a,b)=>(a.type==='audio'?-1:0)-(b.type==='audio'?-1:0))) {
      if(asset.type==='youtube') {
        if(!/^[A-Za-z0-9_-]{11}$/.test(asset.videoId))continue;
        const row=document.createElement('div');row.className='media-item';
        const player=document.createElement('iframe');player.className='video-player';
        player.src=`https://www.youtube-nocookie.com/embed/${asset.videoId}?hl=${lang}&cc_lang_pref=${lang}`;
        player.title=material.title;player.loading='lazy';player.referrerPolicy='strict-origin-when-cross-origin';
        player.allow='encrypted-media; fullscreen; picture-in-picture';player.allowFullscreen=true;
        const link=document.createElement('a');link.href=`https://www.youtube.com/watch?v=${asset.videoId}`;
        link.target='_blank';link.rel='noopener';link.className='document-link';link.textContent=text('youtube',lang);
        row.append(player,link);container.append(row);continue;
      }
      if(!/^media\/(uploads\/(files|posts)|templates\/islam\/(images|books))\//.test(asset.src)||asset.src.includes('..'))continue;
      const row=document.createElement('div');row.className='media-item';
      const error=()=>{const message=document.createElement('p');message.textContent=text('error',lang);row.append(message);};
      if(asset.type==='audio') {
        const player=document.createElement('audio');player.controls=true;player.preload='none';player.src=asset.src;player.setAttribute('aria-label',material.title);
        player.addEventListener('play',()=>document.querySelectorAll('audio').forEach(other=>{if(other!==player)other.pause();}));
        player.addEventListener('error',error,{once:true});row.append(player);
      } else if(asset.type==='image') {
        const image=document.createElement('img');image.src=asset.src;image.alt=material.title;image.loading='lazy';image.addEventListener('error',error,{once:true});row.append(image);
      } else if(asset.type==='document') {
        const title=document.createElement('strong');title.textContent=typeof asset.name==='object' ? (asset.name[lang]||asset.name.ky||material.title) : asset.name;
        const link=document.createElement('a');link.href=asset.src;link.target='_blank';link.rel='noopener';link.className='document-link';link.textContent=`${text('open',lang)} · ${asset.format}`;row.append(title,link);
        const download=document.createElement('a');download.href=asset.src;download.download=asset.src.split('/').pop();download.className='document-link';download.textContent=`${text('download',lang)} · ${asset.format}`;row.append(download);
      }
      if(row.childNodes.length)container.append(row);
    }
    if(material.source.pageNumber&&!assets.some(a=>a.type==='image')){const p=document.createElement('p');p.textContent=text('unavailable',lang);container.append(p);}
    document.querySelector('#article-content').before(container);
  }
  function stopMedia() {
    document.querySelectorAll('#material-media audio').forEach(audio=>audio.pause());
    document.querySelectorAll('#material-media iframe').forEach(player=>player.remove());
  }
  function pageNumber(material) {
    return material.source.pageNumber || Number(String(material.source.title).match(/^(\d+)\s+бет$/)?.[1]) || 0;
  }
  function mediaGroups(materials,lang) {
    const groups=[{key:'surahs',name:text('surahs',lang),materials:[]}];
    for(let start=1;start<=551;start+=50)groups.push({key:String(start),name:`${start}–${start===551?604:start+49} ${lang==='ru'?'страницы':lang==='en'?'pages':'беттер'}`,materials:[]});
    groups.push({key:'talks',name:text('talks',lang),materials:[]});
    for(const material of materials) {
      const page=pageNumber(material);
      const group=page ? groups.find(g=>g.key===String(Math.min(551,Math.floor((page-1)/50)*50+1)))
        : groups[material.category==='Сүрөлөр жана дубалар'||/кунут/i.test(String(material.source.title))?0:groups.length-1];
      group.materials.push(material);
    }
    return groups;
  }
  globalThis.IslamdiniSections={labels,text,renderMedia,stopMedia,pageNumber,mediaGroups,renderLinks};
})();
