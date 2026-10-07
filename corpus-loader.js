/* Static delivery: HTTP JSON and local file scripts both load one article at a time. */
(() => {
  const practice={}, pending=new Map(), loaded=new Set();
  const localRequests=new Map();
  let corpus;
  if(location.protocol==='file:')globalThis.TINGXU_STATIC_RECEIVE=(relative,data)=>{
    const receive=localRequests.get(relative);if(receive)receive(data);
  };
  function requestLocal(relative) {
    return new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      let received=false,value;
      const cleanup=()=>{clearTimeout(timer);localRequests.delete(relative);script.remove();};
      const fail=()=>{cleanup();reject(new Error('篇章加载失败，请确认已完整解压运行包。'));};
      const timer=setTimeout(fail,15000);
      localRequests.set(relative,data=>{received=true;value=data;});
      script.src=new URL(relative.replace(/\.json$/,'.js'),document.baseURI).href;
      script.onload=()=>{if(!received){fail();return;}cleanup();resolve(value);};
      script.onerror=fail;document.head.append(script);
    });
  }
  async function request(relative) {
    if(location.protocol==='file:')return requestLocal(relative);
    const response=await fetch(new URL(relative,document.baseURI),{credentials:'same-origin',cache:'no-store'});
    if(!response.ok)throw new Error('篇章加载失败，请重试。');
    return response.json();
  }
  const ready=request('data/catalog.json').then(data=>{
    corpus=data.corpus;
    for(const section of corpus.sections)practice[section.id]=section.taskMeta;
    globalThis.TINGXU_CORPUS=corpus;globalThis.TINGXU_PRACTICE=practice;
  });
  async function load(id) {
    await ready;
    const section=corpus.sections.find(section=>section.id===id);
    if(!section)throw new Error('找不到该篇章。');
    if(loaded.has(id))return;
    if(!pending.has(id))pending.set(id,request('data/articles/'+encodeURIComponent(id)+'.json').then(data=>{
      if(data.section.id!==id||!Array.isArray(data.tasks))throw new Error('篇章数据不一致。');
      Object.assign(section,data.section);practice[id]=data.tasks;loaded.add(id);
    }).finally(()=>pending.delete(id)));
    return pending.get(id);
  }
  globalThis.TINGXU_DELIVERY={ready,load,isFresh:id=>loaded.has(id),coverURL(id,original){return corpus?.sections.find(section=>section.id===id)?.covers?.[original]||'';}};
})();
