
(async () => {
 const root=document.getElementById('listening-studio');
 const content=root.querySelector('#ls-content');
 const delivery=globalThis.TINGXU_DELIVERY;
 if(delivery){content.textContent='正在加载篇章目录…';await delivery.ready;}
 const corpus=globalThis.TINGXU_CORPUS||{exams:[],sections:[]};
 const corpusPractice=globalThis.TINGXU_PRACTICE||{};
 const articleSummaries=globalThis.TINGXU_ARTICLE_SUMMARIES||{};
 const learning=globalThis.TINGXU_LEARNING;
 const articleCovers=new Map([
  ['cet4-2026-06-set2-news-report-1',{src:'images/news-1/s1-1.webp',alt:'银发女士准备出售居住多年的石屋'}],
  ['cet4-2026-06-set2-news-report-2',{src:'images/news-2/s1-0.webp',alt:'海军救援船驶近漂流者的小帆船'}],
  ['cet4-2026-06-set2-news-report-3',{src:'images/news-3/s1-0.webp',alt:'学区董事会讨论学校安排'}],
  ['cet4-2026-06-set2-conversation-1',{src:'images/theatre-booking/a2-1.webp',alt:'伦敦夜晚的剧院外观'}],
  ['cet4-2026-06-set2-conversation-2',{src:'images/phone-habits/scene-06.webp',alt:'约翰发现每天使用手机的时间过长'}],
  ['cet4-2026-06-set2-passage-1',{src:'images/wage-trends/scene-01.webp',alt:'求职者考虑从现有工作转到新的岗位'}],
  ['cet4-2026-06-set2-passage-2',{src:'images/processed-food/scene-01.webp',alt:'高度加工食品及糖、脂肪和盐的示意'}],
  ['cet4-2026-06-set2-passage-3',{src:'images/home-work-study/scene-01.webp',alt:'家中两位成年人分别照顾孩子和完成家务'}],
 ]);
 articleCovers.set('cet4-2026-06-set1-news-report-1',{src:'images/child-food-orders/scene-01.webp',banner:'images/child-food-orders/cover-wide.webp',alt:'孩子大量点餐给父亲留下高额账单'});
 articleCovers.set('cet4-2026-06-set1-news-report-2',{src:'images/zoo-visitor-study/cover-wide.webp',alt:'研究人员观察游客与大象的行为'});
 articleCovers.set('cet4-2026-06-set1-news-report-3',{src:'images/denver-ebike-incentives/cover-wide.webp',alt:'丹佛电动自行车补贴项目与城市出行情境'});
 articleCovers.set('cet4-2026-06-set1-conversation-1',{src:'images/rome-sightseeing/cover-wide.webp',alt:'Mike与Sue讨论罗马博物馆、街景和结伴旅行计划'});
 articleCovers.set('cet4-2026-06-set1-conversation-2',{src:'images/new-job-advice/cover-wide.webp',alt:'新人请教工作建议，讨论岗位职责与协作'});
 articleCovers.set('cet4-2026-06-set1-passage-1',{src:'images/emotion-consumer/cover-wide.webp',alt:'消费者思考商品与情感体验的关系'});
 articleCovers.set('cet4-2026-06-set1-passage-2',{src:'images/microplastic-diet/cover-wide.webp',alt:'研究者观察饮食样本中的微塑料示意'});
 articleCovers.set('cet4-2026-06-set1-passage-3',{src:'images/pet-aging/cover-wide.webp',alt:'老年人与狗和猫互动陪伴的虚构情境'});
 articleCovers.set('cet4-2025-12-set2-news-report-1',{src:'images/egg-border/cover-wide.webp',alt:'旅客携带鸡蛋接受陆路边境检查的虚构情境'});
 articleCovers.set('cet4-2025-12-set2-news-report-2',{src:'images/restaurant-policy/cover-wide.webp',alt:'餐厅经营者与带孩子的家庭讨论接待安排的虚构情境'});
 articleCovers.set('cet4-2025-12-set2-news-report-3',{src:'images/suburban-snake/cover-wide.webp',alt:'工作人员检查郊区工地发现的蛇蜕并搜寻线索的虚构情境'});
 articleCovers.set('cet4-2025-12-set2-conversation-1',{src:'images/hannah-winnings/cover-wide.webp',alt:'Hannah在奖金花光后与丈夫讨论跑车的虚构情境'});
 articleCovers.set('cet4-2025-12-set2-conversation-2',{src:'images/school-choice/cover-wide.webp',alt:"父母与Jake讨论不同学校的虚构情境"});
 articleCovers.set('cet4-2025-12-set2-passage-1',{src:'images/data-facts/cover-wide.webp',alt:"经理依据资料分析业务决策的虚构情境"});
 articleCovers.set('cet4-2025-12-set2-passage-2',{src:'images/long-life/cover-wide.webp',alt:"高龄老人分享生活经历与个人看法的虚构情境"});
 articleCovers.set('cet4-2025-12-set2-passage-3',{src:'images/classroom-seating/cover-wide.webp',alt:"学生与教师讨论教室座位的虚构情境"});
 articleCovers.set('cet4-2025-12-set1-news-report-1',{src:'images/cat-engine/cover-wide.webp',alt:"黑猫获救后与邻居主人团聚的虚构情境"});
 articleCovers.set('cet4-2025-12-set1-news-report-2',{src:'images/spring-games/cover-wide.webp',alt:"春季运动会上运动员展现能力与组织者鼓励的虚构情境"});
 articleCovers.set('cet4-2025-12-set1-news-report-3',{src:'images/chocolate-rabbit/cover-wide.webp',alt:"金色巧克力兔产品外观与诉讼争议的情境"});
 articleCovers.set('cet4-2025-12-set1-conversation-1',{src:'images/vegetarian-dinner/cover-wide.webp',alt:"素食晚餐准备与饮食选择讨论"});
 articleCovers.set('cet4-2025-12-set1-conversation-2',{src:'images/flight-jet-lag/cover-wide.webp',alt:"航空旅行、时差与飞行担忧的讨论"});
 articleCovers.set('cet4-2025-12-set1-passage-1',{src:'images/ux-experience/cover-wide.webp',alt:"用户体验设计中的工作实践与反馈"});
 articleCovers.set('cet4-2025-12-set1-passage-2',{src:'images/flexible-seating/cover-wide.webp',alt:"教师与学生在有多种座位的课堂中合作学习"});
 articleCovers.set('cet4-2025-12-set1-passage-3',{src:'images/school-uniform-cost/cover-wide.webp',alt:"母亲与中学生孩子商议学校黑鞋要求及家庭开销"});
 articleCovers.set('cet4-2025-06-set2-news-report-1',{src:'images/seven-mile-bridge-run/cover-wide.webp',alt:"跨海桥跑步赛的两名获奖跑者"});
 articleCovers.set('cet4-2025-06-set2-news-report-2',{src:'images/space-ambassador/cover-wide.webp',alt:"科学与航天推广者展示空间站模型"});
 articleCovers.set('cet4-2025-06-set2-news-report-3',{src:'images/supermarket-cats/cover-wide.webp',alt:"超市里的猫和购物者"});
 articleCovers.set('cet4-2025-06-set2-conversation-1',{src:'images/student-flatshare/cover-wide.webp',alt:"学生与父亲讨论校外合租计划"});
 articleCovers.set('cet4-2025-06-set2-conversation-2',{src:'images/nephew-gift/cover-wide.webp',alt:"顾客与店员比较人偶与棋类礼物"});
 articleCovers.set('cet4-2025-06-set2-passage-1',{src:'images/choice-overload/cover-wide.webp',alt:"顾客在果酱展示前考虑选择"});
 articleCovers.set('cet4-2025-06-set2-passage-2',{src:'images/work-volunteering/cover-wide.webp',alt:"员工共同参与社区服务"});
 articleCovers.set('cet4-2025-06-set2-passage-3',{src:'images/surplus-food-catering/cover-wide.webp',alt:"创业者与供应商查看可用剩余食材"});
 articleCovers.set('cet4-2025-06-set1-news-report-1',{src:'images/corn-ambassador/cover-wide.webp',alt:"孩子热情介绍玉米的情境"});
 articleCovers.set('cet4-2025-06-set1-news-report-2',{src:'images/mail-theft-investigation/cover-wide.webp',alt:"调查人员核查信件和钥匙材料"});
 articleCovers.set('cet4-2025-06-set1-news-report-3',{src:'images/fast-fashion-waste/cover-wide.webp',alt:"研究人员讨论衣物与废弃物管理"});
 articleCovers.set('cet4-2025-06-set1-conversation-1',{src:'images/rush-hour-commute/cover-wide.webp',alt:"同事讨论通勤困扰"});
 const corpusSections=new Map(corpus.sections.map(section=>[section.id,section]));
 const corpusExams=new Map(corpus.exams.map(exam=>[exam.id,exam]));
 const libraryFeatureChoices=corpus.sections.filter(section=>(corpusPractice[section.id]||[]).length).map(section=>section.id);
 let libraryFeatureId=null;
 function chooseLibraryFeature(excludeId=libraryFeatureId){libraryFeatureId=learning.chooseArticle(libraryFeatureChoices,corpusPractice,readCorpusReview(),excludeId);}
 chooseLibraryFeature();
 const cutLevels=[['overview','概览'],['fine','标准'],['micro','详细']];
 const recordCutLevels=[['overview','概览'],['standard','标准（旧记录）'],['fine','标准'],['micro','详细']];
 let cutSliderEditing=false,cutSliderWasPlaying=false;
 let practiceRevealKey='',practiceRevealStartedAt=-Infinity;
 const collapsedExams=new Set(corpus.exams.map((_,index)=>index));
 const state={view:'library',auto:true,replay:true,rate:1,corpusId:null,corpusEntry:'library',corpusReviewMode:false,corpusShowText:false,corpusPlaying:false,corpusError:false,corpusLine:-1,corpusTaskIndex:0,corpusTaskStage:'ready',corpusSelected:[],corpusShuffled:[],corpusFeedback:'',corpusCutLevel:'micro',corpusLoopCount:0,corpusCompletionMessage:''};
 try{const savedLevel=localStorage.getItem('tingxu-corpus-cut-level-v1');if(savedLevel==='standard'){state.corpusCutLevel='fine';localStorage.setItem('tingxu-corpus-cut-level-v1','fine');}else if(cutLevels.some(([key])=>key===savedLevel))state.corpusCutLevel=savedLevel;}catch(error){}
 const corpusLoopLimit=5;
 const completionMessages=[
  '恭喜完成这一篇，给认真练习的自己一个赞！',
  '又完成了一篇，今天的坚持值得肯定。',
  '一步一步练习，你正在积累听懂英语的经验。',
  '这篇练习完成啦，稍作休息再出发。',
  '保持耐心，每一次认真聆听都很有意义。',
  '做得不错，完成今天的一小步！',
 ];
 const design={palette:'forest',layout:'illustrated',radius:18};
 let corpusMedia=null,corpusEnd=0,corpusTimer=null,corpusCheckTimer=null,feedbackTimer=null,feedbackAudio=null;
 const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const coverHTML=(id,className,lazy=false)=>{const cover=articleCovers.get(id),original=cover&&(className==='ls-corpus-hero'&&cover.banner?cover.banner:cover.src),src=delivery?delivery.coverURL(id,original):original;return cover&&src?`<img class="${className}" src="${escapeHTML(src)}" alt="${escapeHTML(cover.alt)}" ${lazy?'loading="lazy" ':''}decoding="async">`:'';};
 const neutralChunk=s=>String(s).replace(/[.!?,;:]+\s*$/,'').toLowerCase().replace(/\bi\b/g,'I');
 const icon=(name)=>`<i data-lucide="${name}" aria-hidden="true"></i>`;
 const corpusVisualHTML=visual=>visual.image?`<span class="ls-practice-visual ls-practice-photo"><img src="${escapeHTML(visual.image)}" alt="${escapeHTML(visual.alt||visual.type)}" loading="lazy" decoding="async"></span>`:`<span class="ls-practice-visual" role="img" aria-label="${escapeHTML(visual.type)}语义示意图">${icon(visual.icon)}</span>`;
 function announce(s){root.querySelector('#ls-live').textContent=s;}
 function prepareFeedbackAudio(){const AudioContext=window.AudioContext||window.webkitAudioContext;if(!AudioContext)return null;try{feedbackAudio||=(new AudioContext());if(feedbackAudio.state==='suspended')feedbackAudio.resume().catch(()=>{});return feedbackAudio;}catch(error){return null;}}
 function playFeedbackSound(kind){const context=prepareFeedbackAudio();if(!context)return;const speech=corpusMedia;if(speech&&!speech.paused){const volume=speech.volume;speech.volume=Math.min(volume,.15);setTimeout(()=>{if(speech===corpusMedia)speech.volume=volume;},380);}const start=context.currentTime;const notes=kind==='correct'?[[659.25,0,.13],[880,.12,.2]]:[[329.63,0,.14],[246.94,.11,.2]];for(const [frequency,offset,duration] of notes){const oscillator=context.createOscillator(),gain=context.createGain(),at=start+offset;oscillator.type=kind==='correct'?'sine':'triangle';oscillator.frequency.setValueAtTime(frequency,at);gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(kind==='correct'?.33:.26,at+.025);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);oscillator.connect(gain);gain.connect(context.destination);oscillator.start(at);oscillator.stop(at+duration+.01);}}
 function persist(){try{localStorage.setItem('tingxu-preferences-v1',JSON.stringify({auto:state.auto,replay:state.replay,design:{...design}}));}catch(error){}}
 // Progression is automatic; ignore the legacy manual preference after removing its control.
 function restorePreferences(){try{const saved=JSON.parse(localStorage.getItem('tingxu-preferences-v1'))||JSON.parse(localStorage.getItem('tingxu-demo-v1'))?.privateContent;if(!saved)return;state.replay=saved.replay!==false;if(saved.design){if(['forest','ink'].includes(saved.design.palette))design.palette=saved.design.palette;if(['illustrated','compact'].includes(saved.design.layout))design.layout=saved.design.layout;if(Number.isFinite(saved.design.radius))design.radius=Math.max(8,Math.min(24,saved.design.radius));}}catch(error){}}
 function applyDesign(){root.dataset.layout=design.layout;root.style.setProperty('--ls-radius',design.radius+'px');const ink=design.palette==='ink';root.style.setProperty('--ls-accent',ink?'#314f6d':'#245b48');root.style.setProperty('--ls-soft',ink?'#e8edf0':'#e8eee7');root.style.setProperty('--ls-on-accent','#fffdf8');}
 function stopCorpus(){if(corpusMedia){corpusMedia.pause();corpusMedia.ontimeupdate=null;corpusMedia.onended=null;corpusMedia.onerror=null;corpusMedia=null;}state.corpusPlaying=false;state.corpusLine=-1;}
 function stopTimers(){clearTimeout(corpusTimer);clearTimeout(corpusCheckTimer);clearTimeout(feedbackTimer);stopCorpus();}
 let articleRequest=0;
 function withArticle(id,action){
  if(!delivery){action();return;}
  const request=++articleRequest;announce('正在加载篇章…');
  delivery.load(id).then(()=>{if(request===articleRequest){announce('');action();}}).catch(error=>{
   if(request!==articleRequest)return;
   const note=document.createElement('p');note.className='ls-feedback ls-error';note.setAttribute('role','alert');note.textContent=error.message;
   content.querySelector('[data-delivery-error]')?.remove();note.dataset.deliveryError='';content.prepend(note);announce(error.message);
  });
 }
 function libraryHTML(){
  const featured=corpusSections.get(libraryFeatureId),exam=featured&&corpusExams.get(featured.examId);
  const featureCard=featured?`<article class="ls-book ls-featured-book"><div class="ls-feature-copy"><h2>${escapeHTML(featured.title)}</h2><span class="ls-eyebrow">RANDOM LISTEN <span aria-hidden="true">/</span> 随机一篇</span><div class="ls-book-head"><div><span class="ls-feature-kicker">${escapeHTML(exam?.title||'四级听力')} <span aria-hidden="true">·</span> ${escapeHTML(featured.kind)}</span></div></div><p class="ls-featured-preview">${escapeHTML(articleSummaries[featured.id]||featured.preview)}</p></div><div class="ls-featured-actions"><button type="button" data-action="random-article" class="ls-next ls-secondary cursor-interaction">${icon('shuffle')}<span>换一篇</span></button><button type="button" data-action="start-corpus-practice" class="ls-next ls-feature-start cursor-interaction">${icon('arrow-up-right')}<span>开始这篇</span></button></div><div class="ls-feature-art ${articleCovers.has(featured.id)?'has-cover':'is-typographic'}">${coverHTML(featured.id,'ls-featured-cover')}${articleCovers.has(featured.id)?['soft','medium','strong'].map(level=>`<span class="ls-feature-blur ls-feature-blur-${level}" aria-hidden="true">${coverHTML(featured.id,'ls-feature-blur-image')}</span>`).join(''):''}</div></article>`:'';
  return `${featureCard}${featured?`<div class="ls-home-article-info">${corpusInfoHTML(featured)}</div>`:''}<div class="ls-corpus-head"><div><span class="ls-eyebrow">THE ARCHIVE</span><h2>全部篇章</h2><p>${corpus.exams.length} 套录音 · ${corpus.sections.length} 篇新闻、对话与短文</p></div><div class="ls-home-links" aria-label="学习导航"><button type="button" class="ls-link" data-view="record">${icon('chart-no-axes-combined')}学习记录</button></div></div>${corpus.exams.map((exam,examIndex)=>`<section class="ls-exam"><button type="button" class="ls-exam-head cursor-interaction" data-exam-toggle="${examIndex}" aria-expanded="${!collapsedExams.has(examIndex)}" aria-controls="ls-exam-grid-${examIndex}"><span class="ls-exam-index">${String(examIndex+1).padStart(2,'0')}</span><span class="ls-exam-title">${escapeHTML(exam.title)}</span><span class="ls-exam-count">${exam.sectionIds.length} 篇</span>${icon(collapsedExams.has(examIndex)?'chevron-down':'chevron-up')}</button><div class="ls-corpus-grid" id="ls-exam-grid-${examIndex}" ${collapsedExams.has(examIndex)?'hidden':''}>${exam.sectionIds.map(id=>{const section=corpusSections.get(id),index=String(corpus.sections.indexOf(section)+1).padStart(2,'0');return `<article class="ls-corpus-card ls-archive-book"><button type="button" class="ls-card-hit cursor-interaction" data-corpus="${section.id}" aria-label="开始${escapeHTML(exam.title)}${escapeHTML(section.title)}的意群练习"></button><div class="ls-feature-art ${articleCovers.has(section.id)?'has-cover':'is-typographic'}">${articleCovers.has(section.id)?coverHTML(section.id,'ls-corpus-cover',true)+['soft','medium','strong'].map(level=>`<span class="ls-feature-blur ls-feature-blur-${level}" aria-hidden="true">${coverHTML(section.id,'ls-feature-blur-image',true)}</span>`).join(''):`<div class="ls-corpus-cover ls-corpus-cover-placeholder" aria-hidden="true"><span>${index}</span></div>`}</div><div class="ls-feature-copy"><h4>${escapeHTML(section.title)}</h4><span class="ls-eyebrow ls-corpus-kind">${escapeHTML(section.kind)} <span aria-hidden="true">/</span> ${index}</span><p class="ls-featured-preview">${escapeHTML(articleSummaries[section.id]||section.preview)}</p></div><div class="ls-featured-actions" aria-hidden="true"><span class="ls-next ls-feature-start">${icon('arrow-up-right')}<span>开始这篇</span></span></div></article>`}).join('')}</div></section>`).join('')}`;
 }
 function corpusInfoHTML(section){
  return `<section class="ls-corpus-timeline" aria-labelledby="ls-corpus-timeline-title">
    <div class="ls-corpus-player ls-corpus-transcript-head">
     <div class="ls-corpus-player-copy"><h2 id="ls-corpus-timeline-title">播放全文</h2>${state.corpusPlaying?'<p>正在播放 · 本篇结束后自动停止</p>':''}</div>
     <div class="ls-corpus-player-actions">
      <button type="button" class="ls-next ls-secondary" data-action="corpus-text" aria-expanded="${state.corpusShowText}" aria-controls="ls-corpus-transcript-body">${state.corpusShowText?'隐藏原文':'查看原文'}</button>
      <button type="button" class="ls-play" data-action="corpus-play" aria-label="${state.corpusPlaying?'暂停播放全文':'播放全文'}">${icon(state.corpusPlaying?'pause':'play')}</button>
     </div>
    </div>
    <div id="ls-corpus-transcript-body">
     ${state.corpusError?'<p class="ls-feedback ls-error" role="alert">音频加载失败，请检查素材文件并重试。</p>':''}
     ${state.corpusShowText?`<ol class="ls-corpus-lines">${section.lines.map((line,i)=>`<li class="${state.corpusLine===i?'active':''}"><button type="button" data-corpus-line="${i}" aria-label="重听第 ${i+1} 句：${escapeHTML(line.text)}"><span class="ls-corpus-line-time">${icon('volume-2')}<span>${Math.floor(line.start/60).toString().padStart(2,'0')}:${Math.floor(line.start%60).toString().padStart(2,'0')}</span></span><span class="ls-corpus-line-text">${escapeHTML(line.text)}</span></button></li>`).join('')}</ol>`:'<p class="ls-corpus-hidden">原文已隐藏。听完后可自行展开，并点时间戳重听单句。</p>'}
    </div>
   </section>`;
 }
 function corpusHTML(){
  const section=corpusSections.get(state.corpusId);if(!section)return libraryHTML();
  const exam=corpusExams.get(section.examId),taskCount=(corpusPractice[section.id]||[]).length;
  return `<span class="ls-eyebrow">${escapeHTML(exam.title)} · ${section.kind}</span><h1 class="ls-corpus-title">${escapeHTML(section.title)}</h1>${coverHTML(section.id,'ls-corpus-hero')}
   <div class="ls-corpus-start"><button type="button" class="ls-next" data-action="start-corpus-practice">${icon('headphones')}开始意群排序 · ${taskCount} 句</button><span>每次从第一句开始</span></div>`;
 }
 function playCorpus(start,end,lineIndex=-1,done=null,loop=false){if(delivery&&!delivery.isFresh(state.corpusId)){withArticle(state.corpusId,()=>playCorpus(start,end,lineIndex,done,loop));return;}const section=corpusSections.get(state.corpusId),exam=section&&corpusExams.get(section.examId);if(!exam)return;stopCorpus();state.corpusError=false;state.corpusLine=lineIndex;corpusEnd=end;const offset=section.audioOffset||0,audio=new Audio(section.audio||exam.audio);corpusMedia=audio;audio.preload='auto';audio.playbackRate=state.rate;audio.onloadedmetadata=()=>{if(audio===corpusMedia)audio.currentTime=start-offset;};const finish=()=>{if(audio!==corpusMedia)return;if(loop&&state.view==='corpus-practice'&&['arrange','error'].includes(state.corpusTaskStage)){
    if(audio.currentTime+offset<corpusEnd-.05&&!audio.ended)return;
    state.corpusLoopCount++;
    if(state.corpusLoopCount<corpusLoopLimit){audio.currentTime=start-offset;audio.play().catch(()=>{if(audio===corpusMedia){stopCorpus();state.corpusError=true;render();}});return;}
    stopCorpus();announce('本句已循环播放5次，已暂停。');render();return;
   }stopCorpus();render();if(done)done();};audio.ontimeupdate=()=>{if(audio!==corpusMedia)return;if(audio.currentTime+offset>=corpusEnd-.05){finish();return;}const current=section.lines.findIndex(line=>audio.currentTime+offset>=line.start&&audio.currentTime+offset<line.end);root.querySelectorAll('.ls-corpus-lines li').forEach((item,i)=>item.classList.toggle('active',i===current));};audio.onended=finish;audio.onerror=()=>{if(audio===corpusMedia){stopCorpus();state.corpusError=true;render();}};state.corpusPlaying=true;audio.play().then(()=>{if(audio===corpusMedia)render();}).catch(()=>{if(audio===corpusMedia){stopCorpus();state.corpusError=true;render();}});render();}
 function startCorpusPractice(articleId=state.corpusId){withArticle(articleId,()=>beginCorpusPractice(articleId));}
 function beginCorpusPractice(articleId=state.corpusId){if(!corpusSections.has(articleId)||!(corpusPractice[articleId]||[]).length)return;state.corpusId=articleId;state.corpusEntry='library';state.corpusReviewMode=false;openCorpusTask(0);}
 function corpusTasks(){return corpusPractice[state.corpusId]||[];}
 function corpusTask(){const task=corpusTasks()[state.corpusTaskIndex];return task?{...task,chunks:task.variants?.[state.corpusCutLevel]||task.chunks}:undefined;}
 function readCorpusProgress(){return globalThis.TINGXU_STORAGE.read('progress',corpusPractice);}
 function saveCorpusProgress(nextIndex){const data=readCorpusProgress();data[state.corpusId]=nextIndex;globalThis.TINGXU_STORAGE.save('progress',data);}
 function readCorpusReview(){return globalThis.TINGXU_STORAGE.read('review',corpusPractice);}
 function updateCorpusReview(kind){const task=corpusTask();if(!task||!state.corpusId)return;const data=readCorpusReview(),article=data[state.corpusId]||{};const entry=learning.applyEvent(article[task.id],kind,{level:state.corpusCutLevel,chunkCount:task.chunks.length,reviewMode:state.corpusReviewMode,now:Date.now()});article[task.id]=entry;data[state.corpusId]=article;globalThis.TINGXU_STORAGE.save('review',data);return entry;}
 function corpusReviewArticles(){const data=readCorpusReview();return corpus.sections.map(section=>{const entries=Object.values(data[section.id]||{}),pending=entries.filter(entry=>entry.pending),attempted=entries.filter(entry=>entry.attempted).length,wrong=pending.reduce((total,entry)=>total+(entry.wrong||0),0),assisted=pending.reduce((total,entry)=>total+(entry.assisted||0),0);return {section,pending:pending.length,attempted,wrong,assisted,severity:(wrong+assisted*2)/Math.max(2,attempted)};}).filter(item=>item.pending).sort((a,b)=>b.severity-a.severity||b.pending-a.pending||b.wrong+b.assisted-a.wrong-a.assisted);}
 function corpusStudyArticles(data=readCorpusReview()){
  const progress=readCorpusProgress();return corpus.sections.map(section=>{
   const tasks=corpusPractice[section.id]||[],ids=new Set(tasks.map(task=>task.id)),entries=Object.entries(data[section.id]||{}).filter(([id,entry])=>ids.has(id)&&entry&&typeof entry==='object').map(([,entry])=>entry),studied=entries.filter(entry=>entry.attempted).length;if(!studied)return null;
   const levels=Object.fromEntries(recordCutLevels.map(([level])=>{const values=entries.map(entry=>entry.levels?.[level]).filter(Boolean);return [level,{heard:values.filter(value=>value.heard>0).length,independent:values.filter(value=>value.correct>0).length,wrong:values.reduce((sum,value)=>sum+(value.wrong||0),0),assisted:values.reduce((sum,value)=>sum+(value.assisted||0),0)}];}));
   const hasLegacyData=entries.some(entry=>['correct','wrong','assisted'].some(field=>(entry[field]||0)>Object.values(entry.levels||{}).reduce((sum,value)=>sum+(value[field]||0),0))||(entry.heard&&!Object.values(entry.levels||{}).some(value=>value.heard>0)));
   return {section,total:tasks.length,studied,levels,hasLegacyData,independent:entries.filter(entry=>(entry.correct||0)>0).length,wrong:entries.reduce((sum,entry)=>sum+(entry.wrong||0),0),assisted:entries.reduce((sum,entry)=>sum+(entry.assisted||0),0),pending:entries.filter(entry=>entry.pending).length,progress:Math.min(progress[section.id]||0,tasks.length),lastAt:Math.max(0,...entries.map(entry=>entry.lastAt||0))};
  }).filter(Boolean).sort((a,b)=>b.lastAt-a.lastAt||b.studied-a.studied);
 }
 function nextCorpusReviewIndex(from=0){const article=readCorpusReview()[state.corpusId]||{};return corpusTasks().findIndex((task,index)=>index>=from&&article[task.id]?.pending);}
 function nextCorpusTask(){const task=corpusTask();if(!state.corpusReviewMode&&task?.chunks.length===1&&state.corpusTaskStage==='success')saveCorpusProgress(state.corpusTaskIndex+1);if(state.corpusReviewMode){const nextIndex=nextCorpusReviewIndex(state.corpusTaskIndex+1);if(nextIndex>=0){openCorpusTask(nextIndex,true);}else{stopTimers();state.corpusReviewMode=false;state.view='review';render();}}else openCorpusTask(state.corpusTaskIndex+1,true);}
 function openCorpusTask(index,autoStart=false,preserveRound=false,continueArranging=false){
  const enteringPractice=state.view!=='corpus-practice';
  stopTimers();const tasks=corpusTasks();state.corpusTaskIndex=Math.max(0,Math.min(index,tasks.length));state.corpusTaskStage=index>=tasks.length?'finished':continueArranging?'arrange':'ready';state.corpusSelected=[];state.corpusFeedback='';state.corpusError=false;
  const task=corpusTask(),count=task?.chunks.length||0;
  if(!preserveRound)state.corpusLoopCount=0;
  state.corpusCompletionMessage=task?'':completionMessages[Math.floor(Math.random()*completionMessages.length)]||completionMessages[0];
  if(task){const data=readCorpusReview(),article=data[state.corpusId]||{};article[task.id]=learning.beginRound(article[task.id],{level:state.corpusCutLevel,chunkCount:count,reviewMode:state.corpusReviewMode,preserve:preserveRound,id:Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,8)});data[state.corpusId]=article;globalThis.TINGXU_STORAGE.save('review',data);}
  state.corpusShuffled=learning.shuffle(count);state.view='corpus-practice';render();if(enteringPractice)window.scrollTo(0,0);if(autoStart){if(state.corpusTaskStage==='ready')playCorpusSentence();else if(state.corpusTaskStage==='arrange')playCorpusLoop();}
 }
 function playCorpusLoop(restartAfterLimit=false){const task=corpusTask();if(!task||!['arrange','error'].includes(state.corpusTaskStage))return;if(state.corpusLoopCount>=corpusLoopLimit){if(!restartAfterLimit)return;state.corpusLoopCount=0;}playCorpus(task.start,task.end,-1,null,true);}
 function playCorpusSentence(){const task=corpusTask();if(!task)return;state.corpusTaskStage='listening';playCorpus(task.start,task.end,-1,()=>{if(state.view!=='corpus-practice'||state.corpusTaskStage!=='listening')return;updateCorpusReview('heard');state.corpusTaskStage='arrange';announce(task.chunks.length===1?'听完了，请点击卡片确认；原句最多循环播放5次。':'开始排列意群，原句最多循环播放5次。');render();playCorpusLoop();});}
 function finishCorpusTask(message,outcome='correct'){
  const task=corpusTask();if(!task)return;stopCorpus();state.corpusTaskStage='success';const entry=updateCorpusReview(outcome);
  if(entry?.pending){if(outcome==='listened')message+=' 本句仅记听过，待复习标记保留。';else if(state.corpusReviewMode){if(entry.activeRound.wrong||entry.activeRound.assisted)message+=' 本轮有排错或查看答案，仍需复习。';else{const required=(entry.pendingLevels||[]).reduce((a,b)=>learning.levels.indexOf(a)>learning.levels.indexOf(b)?a:b,state.corpusCutLevel);message+=' 请用'+cutLevels.find(([key])=>key===(required==='standard'?'fine':required))[1]+'或更细档复习，待复习标记保留。';}}}
  state.corpusFeedback=message;if(outcome==='correct')playFeedbackSound('correct');if(!state.corpusReviewMode&&task.chunks.length>1)saveCorpusProgress(state.corpusTaskIndex+1);announce(message);render();
  const advance=()=>{if(learning.canAutoAdvance(state.auto,task.chunks.length))corpusTimer=setTimeout(nextCorpusTask,1500);};const replay=()=>{if(state.view==='corpus-practice'&&state.corpusTaskStage==='success')playCorpus(task.start,task.end,-1,advance);};if(state.replay){if(outcome==='listened')replay();else feedbackTimer=setTimeout(replay,350);}else advance();
 }
 function checkCorpusTask(){const task=corpusTask();if(!task||state.corpusSelected.length!==task.chunks.length)return;if(task.chunks.length===1){finishCorpusTask(state.replay?'已选择本句。再听完整原句。':'已选择本句，稍后自动进入下一句。','listened');return;}if(state.corpusSelected.every((id,i)=>id===i)){finishCorpusTask(state.replay?'顺序正确。再听完整原句。':'顺序正确。');}else{state.corpusSelected=[];state.corpusTaskStage='error';updateCorpusReview('wrong');state.corpusFeedback='顺序还不符合录音，已清空。请重听原句后重新排列。';playFeedbackSound('wrong');announce(state.corpusFeedback);render();}}
 function selectCorpusCard(id){const task=corpusTask();if(!task||!['arrange','error'].includes(state.corpusTaskStage)||!Number.isInteger(id)||id<0||id>=task.chunks.length)return;clearTimeout(corpusCheckTimer);if(state.corpusSelected.includes(id))state.corpusSelected=state.corpusSelected.filter(x=>x!==id);else state.corpusSelected.push(id);state.corpusTaskStage='arrange';state.corpusFeedback='';if(task.chunks.length===1){checkCorpusTask();return;}render();if(state.corpusSelected.length===task.chunks.length)corpusCheckTimer=setTimeout(checkCorpusTask,650);}
 function sentenceIllustrationHTML(task){
  const visual=task.sentenceVisual;
  return `<figure class="ls-sentence-illustration" aria-label="整句意思图">${visual?.image?`<img src="${escapeHTML(visual.image)}" alt="${escapeHTML(visual.alt||task.text)}" decoding="async">`:`<div class="ls-sentence-image-pending">${icon('image')}<span>整句配图待补充</span></div>`}</figure>`;
 }
 function corpusTaskHTML(){const section=corpusSections.get(state.corpusId),exam=section&&corpusExams.get(section.examId),tasks=corpusTasks(),task=corpusTask();if(!section||!exam)return libraryHTML();if(!task)return `<span class="ls-eyebrow">${escapeHTML(exam.title)} · ${escapeHTML(section.title)}</span><h1>本篇练习完成</h1><p class="ls-page-intro">${escapeHTML(state.corpusCompletionMessage||completionMessages[0])}</p><div class="ls-actions"><button type="button" class="ls-next cursor-interaction" data-action="back-library">返回首页${icon('house')}</button></div>`
  const locked=['ready','listening'].includes(state.corpusTaskStage),success=state.corpusTaskStage==='success',n=task.chunks.length;
  const answer=success?`<span class="ls-chip">${escapeHTML(task.text)}</span>`:state.corpusSelected.length?state.corpusSelected.map((id,i)=>`<button type="button" class="ls-chip" data-practice-remove="${id}"><span class="ls-order">${i+1}</span>${escapeHTML(n===1?task.chunks[id].text:neutralChunk(task.chunks[id].text))}</button>`).join(''):`<span class="ls-answer-help">${icon('move-right')}${locked?'听完本句原音后显示卡片':n===1?'点击下方卡片，确认听到的意群':'点击下方卡片，按听到的顺序排列'}</span>`;
    const cutIndex=cutLevels.findIndex(([key])=>key===state.corpusCutLevel),currentCut=cutLevels[cutIndex];
  const cards=locked?task.chunks.map(()=>`<div class="ls-empty-chunk">${icon('image')}<span>听完后显示意群</span></div>`).join(''):state.corpusShuffled.map(id=>{const chunk=task.chunks[id],selected=state.corpusSelected.includes(id);return `<div class="ls-chunk-wrap"><button type="button" class="ls-chunk ls-practice-card ${selected?'chosen':''}" data-practice-card="${id}" ${selected||success?'disabled':''}>${corpusVisualHTML(chunk.visual)}<span class="ls-card-text">${escapeHTML(n===1?chunk.text:neutralChunk(chunk.text))}</span></button></div>`}).join('');
  return `<span class="ls-eyebrow">${escapeHTML(exam.title)} · ${escapeHTML(section.title)}</span><section class="ls-player"><div class="ls-player-main"><div class="ls-player-copy"><span class="ls-player-progress" aria-label="第 ${state.corpusTaskIndex+1} 句，共 ${tasks.length} 句"><b>${state.corpusTaskIndex+1}</b> / ${tasks.length}</span><strong>${state.corpusPlaying?state.corpusTaskStage==='listening'?'正在首听整句':state.corpusTaskStage==='success'?'正在复听整句':'正在循环播放整句':locked?(n===1?'播放整句后选择意群':'播放整句后开始排列'):success?(n===1?'已选择本句':'本句已完成'):state.corpusLoopCount>=corpusLoopLimit?'已循环播放5次，点击播放可再听':'整句循环已暂停，点击播放继续'}</strong></div>${canSwitchCorpusCut()?`<section class="ls-cut-selector" aria-label="切分程度"><div class="ls-cut-segments" style="--ls-cut-count:${cutLevels.length};--ls-cut-position:${cutIndex*100}%"><span class="ls-cut-highlight" aria-hidden="true"></span><div class="ls-cut-options" aria-hidden="true">${cutLevels.map(([,label],index)=>`<span class="${index===cutIndex?'is-current':''}">${label}</span>`).join('')}</div><input id="ls-cut-range" class="ls-cut-range" type="range" min="0" max="${cutLevels.length-1}" step="1" value="${cutIndex}" data-current-cut-level="${currentCut[0]}" aria-label="切分程度" aria-valuetext="${currentCut[1]}" style="--ls-cut-fill:${cutIndex/(cutLevels.length-1)*100}%"></div></section>`:''}</div><div class="ls-player-footer"><div class="ls-steps"><span class="${locked?'is-current':''}"><em class="ls-step-dot">1</em>先听</span><span class="${!locked&&!success?'is-current':''}"><em class="ls-step-dot">2</em>${n===1?'选意群':'排意群'}</span><span class="${success?'is-current':''}"><em class="ls-step-dot">3</em>复听巩固</span></div><button type="button" class="ls-play" data-action="practice-play" aria-label="${state.corpusPlaying?'停止播放':'播放本句原音'}">${icon(state.corpusPlaying?'pause':'play')}</button></div></section>${state.corpusError?'<div class="ls-feedback ls-error" role="alert">原音无法播放，请重试；此句暂不计完成。</div>':''}<div class="ls-practice-workspace" ${locked?'hidden':''}><div class="ls-answer ${success?'correct':state.corpusTaskStage==='error'?'wrong':''}">${answer}</div>${success?sentenceIllustrationHTML(task):`<div class="ls-chunks ls-practice-chunks">${cards}</div>`}${state.corpusFeedback&&!success?`<div class="ls-feedback ls-error" role="status"><p>${escapeHTML(state.corpusFeedback)}</p></div>`:''}</div>`;}
 function reviewHTML(){const articles=corpusReviewArticles();return `<span class="ls-eyebrow">LISTEN AGAIN</span><h1>待复习</h1><p class="ls-page-intro">按每句排错与查看答案的频率排序，优先复习错误程度高的文章。在同档或更细的多卡题上，本轮无排错、无查看答案地通过复习后，该句移出；只听单卡仍保留。</p>${articles.length?articles.map(({section,pending,attempted,wrong,assisted})=>{const exam=corpusExams.get(section.examId);return `<div class="ls-review-row"><div><p>${escapeHTML(exam?.title||'四级听力')} · ${escapeHTML(section.kind)} ${escapeHTML(section.title)}</p><small>待复习 ${pending} 句 · 排错 ${wrong} 次${assisted?` · 查看答案 ${assisted} 次`:''} · 已练 ${attempted} 句</small></div><button type="button" data-corpus-review="${escapeHTML(section.id)}" class="ls-next ls-secondary cursor-interaction">复习薄弱句${icon('arrow-right')}</button></div>`;}).join(''):`<div class="ls-empty">${icon('circle-check')}<h2>暂无待复习文章</h2><p>在文章练习中排错或查看答案后，文章会出现在这里。</p><button type="button" data-action="back-library" class="ls-next cursor-interaction">去文章库${icon('arrow-right')}</button></div>`}`;}
 function recordHTML(){
  const review=readCorpusReview(),articles=corpusStudyArticles(review),studied=articles.reduce((sum,item)=>sum+item.studied,0),pending=articles.filter(item=>item.pending).length;
  const available=[...new Set(libraryFeatureChoices)].filter(id=>(corpusPractice[id]||[]).length),other=available.filter(id=>id!==libraryFeatureId),candidates=other.length?other:available;
  const scores=new Map(available.map(id=>[id,learning.articleMastery(corpusPractice[id],review[id])])),weightTotal=candidates.reduce((sum,id)=>sum+scores.get(id).weight,0),percent=value=>(value*100).toFixed(1)+'%';
  const rows=articles.map(item=>{
   const score=scores.get(item.section.id),eligible=candidates.includes(item.section.id),chance=eligible?score.weight/weightTotal:0;
   const metrics=`<dl class="ls-record-mastery"><div><dt>熟练度参考</dt><dd data-record-score>${score.mastery===null?'尚待评估':percent(score.mastery)}</dd></div><div><dt>推荐权重</dt><dd data-record-weight>${score.weight.toFixed(2)}</dd></div><div><dt>下次换篇概率</dt><dd data-record-chance>${eligible?percent(chance):'本轮跳过'}</dd></div></dl><small class="ls-record-evidence">可排序句覆盖 ${percent(score.coverage)}${score.total?` · 共 ${score.total} 句`:''}${score.mastery===null?' · 尚无独立排对、排错或答案辅助记录':` · 推荐计算：独立排对 ${score.correct} 次、排错 ${score.wrong} 次、查看答案 ${score.assisted} 次`}${!eligible?' · 当前首页篇章，下次换篇不重复':''}</small>`;
   const levelText=recordCutLevels.filter(([level])=>Object.values(item.levels[level]).some(value=>value>0)).map(([level,label])=>{const value=item.levels[level];return `<small class="ls-record-level">${label}：已听 ${value.heard} 句 · 独立排对 ${value.independent} 句 · 排错 ${value.wrong} 次 · 查看答案 ${value.assisted} 次</small>`;}).join('');
   const exam=corpusExams.get(item.section.examId),last=item.lastAt?new Date(item.lastAt).toLocaleString('zh-CN',{year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}):'旧记录，时间未保存';
   return `<div class="ls-review-row" data-record-article="${escapeHTML(item.section.id)}"><div><p>${escapeHTML(exam?.title||'四级听力')} · ${escapeHTML(item.section.kind)} ${escapeHTML(item.section.title)}</p>${metrics}<small>已练 ${item.studied}/${item.total} 句 · 已记录独立排对 ${item.independent} 句 · 排错 ${item.wrong} 次 · 查看答案 ${item.assisted} 次 · 待复习 ${item.pending} 句</small>${levelText}${item.hasLegacyData?'<small class="ls-record-level">部分旧记录未区分档位，保留在总计中。</small>':''}<small class="ls-record-date">最近学习：${escapeHTML(last)}${item.progress?` · 上次进度 ${item.progress}/${item.total}`:''}</small></div><button type="button" data-corpus="${escapeHTML(item.section.id)}" class="ls-next ls-secondary cursor-interaction">打开篇章${icon('arrow-right')}</button></div>`;
  }).join('');
  const explanation=`<section class="ls-recommendation-note" aria-labelledby="ls-recommendation-title"><h2 id="ls-recommendation-title">熟练度与随机推荐</h2><p>熟练度参考同时考虑整篇可排序句的覆盖、独立排对、排错与查看答案。只听过或只确认单卡时尚待评估，重复练同一句不能代表整篇熟练。</p><p>熟练度越低，推荐权重越高，更容易抽中；熟练度越高，出现机会越少，但仍会推荐。权重为 1–5，尚待评估的篇章为 3。</p><small>下方概率按当前 ${candidates.length} 篇候选的权重计算，包含未练篇章${other.length?'，并跳过当前首页篇章':''}；学习记录或首页篇章变化后会重新计算。熟练度参考不代表真实听力水平。</small></section>`;
  return `<span class="ls-eyebrow">YOUR LEARNING HISTORY</span><h1>学习记录</h1><p class="ls-page-intro">文章练习记录自动保存在此浏览器本地；刷新后仍可查看。清除站点数据会删除记录。排序表现不等同于听力水平。</p><div class="ls-stats"><div class="ls-stat"><span>已练文章</span><strong>${articles.length}</strong></div><div class="ls-stat"><span>已练句子</span><strong>${studied}</strong></div><div class="ls-stat"><span>待复习文章</span><strong>${pending}</strong></div></div>${explanation}<h2>文章学习记录</h2>${articles.length?rows:`<div class="ls-empty">${icon('book-open')}<h2>还没有文章练习记录</h2><p>听完文章中的句子后，这里会显示学习记录。</p><button type="button" data-action="back-library" class="ls-next cursor-interaction">去文章库${icon('arrow-right')}</button></div>`}`;
 }
 function render(){
  if(cutSliderEditing&&state.view==='corpus-practice')return;
  const keepCutFocus=root.contains(document.activeElement)&&document.activeElement.matches('.ls-cut-range');
  const focusedLine=root.contains(document.activeElement)?document.activeElement.dataset.corpusLine:undefined,focusedArticle=state.corpusId;
  if(state.view==='library'){if(state.corpusId!==libraryFeatureId){state.corpusShowText=false;state.corpusError=false;}state.corpusId=libraryFeatureId;}
  const inReview=state.view==='review',inRecord=state.view==='record';
    content.innerHTML=state.view==='corpus'?corpusHTML():state.view==='corpus-practice'?corpusTaskHTML():inReview?reviewHTML():inRecord?recordHTML():libraryHTML();
  root.classList.toggle('ls-in-practice',state.view==='corpus-practice'&&!!corpusTask());
  const workspace=content.querySelector('.ls-practice-workspace');
  if(!workspace||workspace.hidden){practiceRevealKey='';practiceRevealStartedAt=-Infinity;}
  else{
   const key=state.corpusId+':'+state.corpusTaskIndex+':'+state.corpusCutLevel;
   if(practiceRevealKey!==key){practiceRevealKey=key;practiceRevealStartedAt=performance.now();}
   const elapsed=performance.now()-practiceRevealStartedAt;
   if(elapsed<320){workspace.classList.add('is-entering');workspace.style.setProperty('--ls-reveal-delay',-elapsed+'ms');}
  }

  if(globalThis.lucide)globalThis.lucide.createIcons({attrs:{width:18,height:18}});
  if(keepCutFocus)root.querySelector('.ls-cut-range')?.focus({preventScroll:true});
  if(focusedLine!==undefined&&state.view==='library'&&focusedArticle===state.corpusId)root.querySelector(`[data-corpus-line="${focusedLine}"]`)?.focus({preventScroll:true});
 }
 root.addEventListener('click',event=>{const button=event.target.closest('button');if(!button||button.disabled)return;prepareFeedbackAudio();if(button.dataset.examToggle!==undefined){const index=Number(button.dataset.examToggle);if(collapsedExams.has(index))collapsedExams.delete(index);else collapsedExams.add(index);render();root.querySelector(`[data-exam-toggle="${index}"]`)?.focus({preventScroll:true});return;}if(button.dataset.view){articleRequest++;stopTimers();state.view=button.dataset.view;if(state.view==='library')state.corpusEntry='library';if(state.view==='review')state.corpusReviewMode=false;if(state.corpusTaskStage==='listening')state.corpusTaskStage='ready';render();if(state.view==='library')window.scrollTo(0,0);persist();return;}if(button.dataset.corpusReview!==undefined){const articleId=button.dataset.corpusReview;if(corpusSections.has(articleId))withArticle(articleId,()=>{stopTimers();state.corpusId=articleId;state.corpusEntry='review';state.corpusReviewMode=true;const first=nextCorpusReviewIndex();if(first>=0)openCorpusTask(first);else{state.corpusReviewMode=false;state.view='review';render();}});return;}if(button.dataset.corpus!==undefined){startCorpusPractice(button.dataset.corpus);return;}if(button.dataset.corpusLine!==undefined){const section=corpusSections.get(state.corpusId),line=section?.lines[+button.dataset.corpusLine];if(line)playCorpus(line.start,line.end,+button.dataset.corpusLine);return;}if(button.dataset.practiceCard!==undefined){selectCorpusCard(+button.dataset.practiceCard);return;}if(button.dataset.practiceRemove!==undefined){selectCorpusCard(+button.dataset.practiceRemove);return;}const action=button.dataset.action;
   if(action==='random-article'){articleRequest++;stopTimers();state.corpusShowText=false;state.corpusError=false;chooseLibraryFeature();render();}
   else if(action==='corpus-play'){if(state.corpusPlaying){stopCorpus();render();}else{const section=corpusSections.get(state.corpusId);if(section)withArticle(section.id,()=>playCorpus(section.start,section.end));}}
   else if(action==='corpus-text'){if(state.corpusShowText){state.corpusShowText=false;render();}else withArticle(state.corpusId,()=>{state.corpusShowText=true;render();});}
   else if(action==='back-library'){articleRequest++;stopTimers();state.corpusEntry='library';state.corpusReviewMode=false;state.view='library';render();window.scrollTo(0,0);}
   else if(action==='start-corpus-practice'){startCorpusPractice();}
   else if(action==='practice-play'){if(state.corpusPlaying){stopCorpus();if(state.corpusTaskStage==='listening')state.corpusTaskStage='ready';render();}else if(['ready','listening'].includes(state.corpusTaskStage))playCorpusSentence();else if(['arrange','error'].includes(state.corpusTaskStage))playCorpusLoop(true);else{const task=corpusTask();if(task){clearTimeout(corpusTimer);playCorpus(task.start,task.end,-1,()=>{if(state.corpusTaskStage==='success'&&learning.canAutoAdvance(state.auto,task.chunks.length))corpusTimer=setTimeout(nextCorpusTask,1500);});}}}
   else if(action==='practice-answer'){const task=corpusTask();if(task&&task.chunks.length>1){clearTimeout(corpusCheckTimer);stopCorpus();state.corpusSelected=task.chunks.map((_,i)=>i);state.corpusTaskStage='success';state.corpusFeedback='已查看答案，本句记为借助答案完成。';updateCorpusReview('assisted');if(!state.corpusReviewMode)saveCorpusProgress(state.corpusTaskIndex+1);render();if(state.replay)playCorpus(task.start,task.end,-1,()=>{if(learning.canAutoAdvance(state.auto,task.chunks.length))corpusTimer=setTimeout(nextCorpusTask,1500);});else if(learning.canAutoAdvance(state.auto,task.chunks.length))corpusTimer=setTimeout(nextCorpusTask,1500);}}
   else if(action==='rate'){state.rate=state.rate===1?.85:1;render();}
   persist();
 });
 function previewCutSlider(slider){
  const index=Number(slider.value),[level,label]=cutLevels[index]||[];
  if(!level)return;
  slider.style.setProperty('--ls-cut-fill',index/(cutLevels.length-1)*100+'%');
  slider.parentElement.style.setProperty('--ls-cut-position',index*100+'%');
  slider.parentElement.querySelectorAll('.ls-cut-options span').forEach((option,i)=>option.classList.toggle('is-current',i===index));
  slider.setAttribute('aria-valuetext',label);
 }
 function canSwitchCorpusCut(){return state.view==='corpus-practice'&&['arrange','error'].includes(state.corpusTaskStage)&&!!corpusTask();}
 function commitCutSlider(slider){
  const level=cutLevels[Number(slider.value)]?.[0];
  cutSliderEditing=false;
  if(!level||!canSwitchCorpusCut()){cutSliderWasPlaying=false;return;}
  if(level===state.corpusCutLevel){
   render();
   if(cutSliderWasPlaying)root.querySelector('[data-action="practice-play"]')?.click();
   if(state.corpusSelected.length===corpusTask()?.chunks.length&&['arrange','error'].includes(state.corpusTaskStage))corpusCheckTimer=setTimeout(checkCorpusTask,650);
   if(state.corpusTaskStage==='success'&&!state.corpusPlaying&&learning.canAutoAdvance(state.auto,corpusTask()?.chunks.length))corpusTimer=setTimeout(nextCorpusTask,1500);
  }else{
   state.corpusCutLevel=level;
   try{localStorage.setItem('tingxu-corpus-cut-level-v1',level);}catch(error){}
   updateCorpusReview('level-change');
   openCorpusTask(state.corpusTaskIndex,cutSliderWasPlaying||state.corpusPlaying,true,true);
   announce('已切换为'+cutLevels.find(([key])=>key===level)[1]+'，继续排列本句；本轮错误与辅助记录保留。');
  }
  cutSliderWasPlaying=false;
  root.querySelector('.ls-cut-range')?.focus({preventScroll:true});
 }
 root.addEventListener('pointerdown',event=>{
  if(!event.target.matches('.ls-cut-range')||!canSwitchCorpusCut())return;
  cutSliderEditing=true;cutSliderWasPlaying=state.corpusPlaying;
  stopTimers();
  if(state.corpusTaskStage==='listening')state.corpusTaskStage='ready';
  event.target.setPointerCapture(event.pointerId);
 });
 root.addEventListener('input',event=>{
  if(!event.target.matches('.ls-cut-range')||!canSwitchCorpusCut())return;
  cutSliderEditing=true;previewCutSlider(event.target);
 });
 root.addEventListener('pointerup',event=>{
  if(cutSliderEditing&&event.target.matches('.ls-cut-range'))commitCutSlider(event.target);
 });
 root.addEventListener('pointercancel',()=>{
  if(cutSliderEditing){
   const slider=root.querySelector('.ls-cut-range');
   if(slider){slider.value=cutLevels.findIndex(([key])=>key===state.corpusCutLevel);commitCutSlider(slider);}
   else{cutSliderEditing=false;cutSliderWasPlaying=false;}
  }
 });
 root.addEventListener('focusout',event=>{
  if(cutSliderEditing&&event.target.matches('.ls-cut-range'))commitCutSlider(event.target);
 });
 root.addEventListener('change',event=>{if(event.target.matches('.ls-cut-range'))commitCutSlider(event.target);});
 root.addEventListener('keydown',event=>{if(event.code==='Space'&&state.view==='corpus-practice'&&!['BUTTON','INPUT','SELECT','TEXTAREA'].includes(event.target.tagName)){event.preventDefault();root.querySelector('[data-action="practice-play"]')?.click();}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cutSliderEditing=false;cutSliderWasPlaying=false;stopTimers();if(state.corpusTaskStage==='listening')state.corpusTaskStage='ready';render();}});
 restorePreferences();applyDesign();render();

 if(document.modelContext?.registerTool){const controller=new AbortController();const register=tool=>{try{Promise.resolve(document.modelContext.registerTool(tool,{signal:controller.signal})).catch(()=>{});}catch(error){}};
 register({name:'read_listening_progress',description:'Read the current corpus task and local progress; chunk text is hidden until the first listening completes.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true},execute(){const task=corpusTask();return {view:state.view,articleId:state.corpusId,taskId:task?.id,sentence:state.corpusTaskIndex+1,total:corpusTasks().length,stage:state.corpusTaskStage,completed:state.corpusId?(readCorpusProgress()[state.corpusId]||0):0,reviewCount:corpusReviewArticles().length,chunks:state.view==='corpus-practice'&&['arrange','error','success'].includes(state.corpusTaskStage)?task?.chunks.map((chunk,id)=>({id,text:chunk.text}))||[]:[]};}});
 register({name:'submit_chunk_order',description:'Submit all current corpus chunk IDs after the first listening; records an attempt and checks the order.',inputSchema:{type:'object',properties:{order:{type:'array',items:{type:'integer',minimum:0},minItems:1,uniqueItems:true}},required:['order'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){const task=corpusTask();if(state.view!=='corpus-practice'||!task||task.chunks.length<2||!['arrange','error'].includes(state.corpusTaskStage))throw new Error('Listen to a sortable corpus sentence first.');if(!input||Object.keys(input).some(key=>key!=='order')||!Array.isArray(input.order)||input.order.length!==task.chunks.length||new Set(input.order).size!==task.chunks.length||input.order.some(id=>!Number.isInteger(id)||id<0||id>=task.chunks.length))throw new Error('Provide all distinct chunk IDs for the current sentence.');clearTimeout(corpusCheckTimer);state.corpusSelected=[...input.order];checkCorpusTask();return {correct:state.corpusTaskStage==='success',stage:state.corpusTaskStage};}});
 window.addEventListener('pagehide',()=>{stopTimers();controller.abort();},{once:true});}
})().catch(()=>{const content=document.getElementById('ls-content');content.textContent='篇章目录加载失败，请稍后重试。';const retry=document.createElement('button');retry.type='button';retry.className='ls-next';retry.textContent='重试';retry.addEventListener('click',()=>location.reload());content.append(retry);});
