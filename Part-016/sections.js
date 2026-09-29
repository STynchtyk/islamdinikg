(() => {
  const labels={quran:['Куран','Коран','Quran'],prayer:['Намаз','Намаз','Prayer'],dua:['Дуба','Дуа','Dua'],hadith:['Хадис','Хадисы','Hadith'],worship:['Ибадат','Поклонение','Worship'],ethics:['Ахлак','Нравственность','Ethics'],library:['Китепкана','Библиотека','Library'],media:['Медиа','Медиа','Media']};
  const messages={
    search:['Бул бөлүмдөн издөө…','Поиск в этом разделе…','Search this section…'],
    files:['Түп нуска материалдар','Оригинальные материалы','Original materials'],
    unavailable:['Бул файл архивде жок.','Этого файла нет в архиве.','This file is missing from the archive.'],
    error:['Файл ачылган жок.','Не удалось открыть файл.','The file could not be opened.'],
    open:['Окуу / ачуу','Читать / открыть','Read / open'],
    original:['Тиркемелер түп нуска тилинде сакталган.','Вложения сохранены на языке оригинала.','Attachments retain their original language.'],
    empty:['Бул бөлүмдө табылган жок.','В этом разделе ничего не найдено.','No matches in this section.'],
    previous:['← Мурунку бет','← Предыдущая страница','← Previous page'],next:['Кийинки бет →','Следующая страница →','Next page →'],
    prayer:['Бүгүнкү намаз убактысы →','Время намаза на сегодня →','Today’s prayer times →'],
  };
  const text=(key,lang)=> (labels[key]||messages[key]||[key,key,key])[{ky:0,ru:1,en:2}[lang]||0];
  function renderMedia(material,lang,openPage,pages) {
    document.querySelector('#material-media')?.remove();
    const assets=material.source.media||[];
    if(!assets.length&&!material.source.pageNumber)return;
    const container=document.createElement('section');container.id='material-media';container.className='material-media';
    const heading=document.createElement('h2');heading.textContent=text('files',lang);container.append(heading);
    const note=document.createElement('p');note.className='media-note';note.textContent=text('original',lang);container.append(note);
    if(material.source.pageNumber) {
      const nav=document.createElement('nav');nav.className='page-reading-nav';
      const index=pages.findIndex(p=>p.id===material.id);
      for(const [key,page] of [['previous',pages[index-1]],['next',pages[index+1]]])if(page){const b=document.createElement('button');b.type='button';b.textContent=text(key,lang);b.addEventListener('click',()=>openPage(page.id));nav.append(b);}
      container.append(nav);
    }
    // Render only typed local assets, never legacy HTML, scripts, Flash or DNS files.
    for(const asset of [...assets].sort((a,b)=>(a.type==='audio'?-1:0)-(b.type==='audio'?-1:0))) {
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
        const title=document.createElement('strong');title.textContent=asset.name;
        const link=document.createElement('a');link.href=asset.src;link.target='_blank';link.rel='noopener';link.className='document-link';link.textContent=`${text('open',lang)} · ${asset.format}`;row.append(title,link);
      }
      if(row.childNodes.length)container.append(row);
    }
    if(material.source.pageNumber&&!assets.some(a=>a.type==='image')){const p=document.createElement('p');p.textContent=text('unavailable',lang);container.append(p);}
    document.querySelector('#article-content').before(container);
  }
  globalThis.IslamdiniSections={labels,text,renderMedia};
})();
