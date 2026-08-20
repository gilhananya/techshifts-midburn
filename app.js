// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONFIG  ← שנה את הסיסמה כאן
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ADMIN_PASSWORD = 'techshifts2026';  // << שנה לפי רצונך

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PEOPLE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const PEOPLE = [
  {name:'מיכאל ווינטר',  phone:'0548029828',camp:'שנ"ץ'},
  {name:'אילן בן דנן',    phone:'0546850817',camp:''},
  {name:'ניר גרינברג',    phone:'0523609233',camp:'לוסט בויז'},
  {name:'שיר חנונו',      phone:'0524423630',camp:'ברנזונס'},
  {name:'תומר ליבר',      phone:'0524485590',camp:'פיקסל'},
  {name:'שגיא בן עקיבא',  phone:'0544970634',camp:'קריוקאמפ'},
  {name:'בן קורן',        phone:'0544970183',camp:'פיקסל'},
  {name:'אלון לונדנר',    phone:'0549985779',camp:'פרי קאמפ'},
  {name:'אלדר סולומון',   phone:'0523067778',camp:'מקורבים לצלחת'},
  {name:'גל דהן',         phone:'0529403831',camp:''},
  {name:'רון בלטר',       phone:'0547826263',camp:''},
  {name:'אלירן אדרי',     phone:'0544882000',camp:''},
  {name:'יאיר מימון',     phone:'0524627958',camp:''},
  {name:'ליאור אדרי',     phone:'0543080212',camp:'פרי קאמפ'},
  {name:'דור רחמים',      phone:'0502377087',camp:'פרי קאמפ'},
  {name:'בני מאיר',       phone:'0547404340',camp:'free camp'},
  {name:'רפאל כהן',       phone:'0526886119',camp:''},
  {name:'דן גורארי',      phone:'054-2049533',camp:'פרי קאמפ'},
  {name:'רות סמיה שרדון', phone:'0524686803',camp:'קאמפ הדואר'},
  {name:'מאי לינסקי',     phone:'0525410791',camp:''},
  {name:'אדר כורם',       phone:'0509711234',camp:'שיחות נפש'},
  {name:"עמרי ברדיצ'ב",   phone:'0544771120',camp:''},
  {name:'אלין בראי',      phone:'7472579682',camp:'פרי קאמפ'},
  {name:'ורד אדרי',       phone:'0545716559',camp:''},
  {name:'מורן לונדנר',    phone:'0555530399',camp:''},
  {name:'לואיס שרדון',    phone:'0548619344',camp:'קאמפ הדואר'},
  {name:'עידו אסתרוביץ',  phone:'0546234428',camp:''},
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCHEDULE DEFINITIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const REGULAR_DAYS = [
  {label:'יום שלישי', date:'3.11'},
  {label:'יום רביעי', date:'4.11'},
  {label:'יום חמישי', date:'5.11'},
  {label:'יום שישי',  date:'6.11'},
  {label:'יום שבת',   date:'7.11'},
];
const REGULAR_SHIFTS = [
  {key:'night',  label:'לילה', time:'00:00 – 08:00',icon:'🌙',cls:'night'},
  {key:'morning',label:'בוקר', time:'08:00 – 16:00',icon:'☀️',cls:'morning'},
  {key:'evening',label:'ערב',  time:'16:00 – 24:00',icon:'🌆',cls:'evening'},
];

// Each setup day can have its own shifts array
const SETUP_DAYS = [
  {
    label:'רביעי ← חמישי', date:'28.10 → 29.10',
    shifts:[{key:'a',label:'הקמות',time:'10:00 – 15:00 (יום המחרת)',icon:'🔧',cls:'setup'}]
  },
  {
    label:'חמישי ← שישי', date:'29.10 → 30.10',
    shifts:[{key:'a',label:'הקמות',time:'15:00 – 15:00 (יום המחרת)',icon:'🔧',cls:'setup'}]
  },
  {
    label:'שישי ← שבת', date:'30.10 → 31.10',
    shifts:[{key:'a',label:'הקמות',time:'15:00 – 15:00 (יום המחרת)',icon:'🔧',cls:'setup'}]
  },
  {
    label:'שבת ← ראשון', date:'31.10 → 1.11',
    shifts:[{key:'a',label:'הקמות',time:'15:00 – 15:00 (יום המחרת)',icon:'🔧',cls:'setup'}]
  },
  {
    label:'ראשון ← שני', date:'1.11 → 2.11',
    shifts:[{key:'a',label:'הקמות',time:'15:00 – 15:00 (יום המחרת)',icon:'🔧',cls:'setup'}]
  },
  {
    label:'יום שני', date:'2.11',
    shifts:[
      {key:'b',label:'ערב הקמות', time:'15:00 – 00:00 (חצות)', icon:'🌙',cls:'setup2'}
    ]
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
let S = {regular:{}, setup:{}};
let isAdmin = false;

function loadState(){
  try{ const d=localStorage.getItem('techshifts26'); if(d) S=JSON.parse(d); }catch(e){}
  try{ if(localStorage.getItem('techshifts26_adm')===ADMIN_PASSWORD) isAdmin=true; }catch(e){}
}
function persist(){
  try{ localStorage.setItem('techshifts26', JSON.stringify(S)); }catch(e){}
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ADMIN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function openAdminModal(){
  if(isAdmin){ logoutAdmin(); return; }
  document.getElementById('adminPwd').value='';
  document.getElementById('adminErr').textContent='';
  document.getElementById('adminModal').classList.add('open');
  setTimeout(()=>document.getElementById('adminPwd').focus(),220);
}
function closeAdminModal(){
  document.getElementById('adminModal').classList.remove('open');
}
function submitAdmin(){
  const pwd=document.getElementById('adminPwd').value;
  if(pwd===ADMIN_PASSWORD){
    isAdmin=true;
    try{ localStorage.setItem('techshifts26_adm',ADMIN_PASSWORD); }catch(e){}
    closeAdminModal();
    updateAdminUI();
    buildAll();
  } else {
    const err=document.getElementById('adminErr');
    err.textContent='❌ סיסמה שגויה';
    document.getElementById('adminPwd').value='';
    document.getElementById('adminPwd').focus();
    setTimeout(()=>{ err.textContent=''; },2500);
  }
}
function logoutAdmin(){
  if(!confirm('לצאת ממצב ממונה/ת?')) return;
  isAdmin=false;
  try{ localStorage.removeItem('techshifts26_adm'); }catch(e){}
  updateAdminUI();
  buildAll();
}
function updateAdminUI(){
  const btn=document.getElementById('adminBtn');
  const badge=document.getElementById('adminBadge');
  const clr=document.getElementById('clearBtn');
  const swR=document.getElementById('stats-wrap-regular');
  const swS=document.getElementById('stats-wrap-setup');
  if(isAdmin){
    btn.textContent='🔓 יציאה'; btn.classList.add('admin-on');
    badge.style.display=''; clr.style.display='';
    if(swR) swR.style.display=''; if(swS) swS.style.display='';
  } else {
    btn.textContent='🔒 ממונה/ת'; btn.classList.remove('admin-on');
    badge.style.display='none'; clr.style.display='none';
    if(swR) swR.style.display='none'; if(swS) swS.style.display='none';
  }
}
// modal wiring
document.getElementById('adminSubmitBtn').addEventListener('click', submitAdmin);
document.getElementById('adminPwd').addEventListener('keydown', e=>{ if(e.key==='Enter') submitAdmin(); });
document.getElementById('adminModal').addEventListener('click', function(e){ if(e.target===this) closeAdminModal(); });

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BUILD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildAll(){
  buildRegularBoard();
  buildSetupBoard();
  renderStats('regular');
  renderStats('setup');
  buildDots('regular', REGULAR_DAYS.length);
  buildDots('setup', SETUP_DAYS.length);
  initScrollDots();
  // refresh calendar if currently visible
  ['regular','setup'].forEach(ns=>{
    const cv=document.getElementById(`${ns}-cal-view`);
    if(cv&&cv.style.display!=='none') buildCalendar(ns);
  });
  updateOfflineUI();
}

function buildRegularBoard(){
  const container = document.getElementById('regular-scroll');
  container.innerHTML = '';
  REGULAR_DAYS.forEach((day, di) => {
    const col = el('div','day-col');
    col.appendChild(dayHeader(day.label, day.date));
    REGULAR_SHIFTS.forEach((shift, si) => {
      const sKey = `r_${di}_${si}`;
      col.appendChild(buildShiftCard(shift, sKey, 'regular'));
    });
    container.appendChild(col);
  });
}

function buildSetupBoard(){
  const container = document.getElementById('setup-scroll');
  container.innerHTML = '';
  SETUP_DAYS.forEach((day, di) => {
    const col = el('div','day-col');
    col.appendChild(dayHeader(day.label, day.date));
    day.shifts.forEach((shift, si) => {
      const sKey = `s_${di}_${shift.key}`;
      col.appendChild(buildShiftCard(shift, sKey, 'setup'));
    });
    container.appendChild(col);
  });
}

function dayHeader(label, date){
  const hdr = el('div','day-hdr');
  hdr.innerHTML = `<div class="day-name">${label}</div><div class="day-date">${date}</div>`;
  return hdr;
}

function buildShiftCard(shift, sKey, ns){
  const saved = S[ns][sKey] || {};
  const card = el('div', `shift-card ${shift.cls}`);
  // header
  const hdr = el('div','shift-hdr');
  hdr.innerHTML = `<span class="shift-icon">${shift.icon}</span>
    <span class="shift-label">${shift.label}</span>
    <span class="shift-time">${shift.time}</span>`;
  card.appendChild(hdr);
  // body
  const body = el('div','shift-body');
  body.appendChild(buildSlot(ns, sKey, 1, saved.n1||'', !!saved.approved1));
  // second slot only on setup board
  if(ns === 'setup') body.appendChild(buildSlot(ns, sKey, 2, saved.n2||'', !!saved.approved2));
  card.appendChild(body);
  return card;
}

function buildSlot(ns, sKey, num, savedName, savedApproved){
  const approvedKey = num===1 ? 'approved1' : 'approved2';
  const nameKey = num===1 ? 'n1' : 'n2';
  const slot = el('div','slot');
  const lbl = el('div','slot-label');
  lbl.textContent = num===1 ? 'משובצ/ת' : 'משובצ/ת נוסף/ת';
  slot.appendChild(lbl);

  // Permission: locked only once the person has confirmed it's final (or admin unlocked it)
  let isLocked = !isAdmin && !!savedName && savedApproved;

  const sel = el('select','name-sel');
  if(savedName) sel.classList.add('filled');
  sel.disabled = isLocked;

  const emptyOpt = document.createElement('option');
  emptyOpt.value=''; emptyOpt.textContent='— בחר/י שם —';
  sel.appendChild(emptyOpt);
  PEOPLE.forEach(p=>{
    const opt = document.createElement('option');
    opt.value = p.name; opt.textContent = p.name;
    if(p.name===savedName) opt.selected=true;
    sel.appendChild(opt);
  });
  slot.appendChild(sel);

  const lockNote = el('div','lock-note');
  lockNote.textContent = '🔒 נעול · לשינוי פנה/י לממונה/ת';
  lockNote.style.display = isLocked ? '' : 'none';
  slot.appendChild(lockNote);

  // inline confirm — checking it is what locks the slot in
  const confirmRow = el('div','slot-confirm');
  const cbWrap = el('div',`confirm-cb-wrap${(!savedName)?' disabled':''}`);
  const box = el('div', `confirm-box${savedApproved?' checked':''}`);
  box.textContent = savedApproved ? '✓' : '';
  const txt = el('span', `confirm-text${savedApproved?' checked':''}`);
  txt.textContent = 'אישרתי — נכנס/ת לאבק! 🔥';
  cbWrap.appendChild(box); cbWrap.appendChild(txt);
  confirmRow.appendChild(cbWrap);
  slot.appendChild(confirmRow);

  // auto-info chips
  const info = el('div','auto-info');
  const phoneChip = makeChip('📞','');
  const campChip  = makeChip('🏕','');
  info.appendChild(phoneChip); info.appendChild(campChip);
  slot.appendChild(info);

  const initP = PEOPLE.find(x=>x.name===savedName);
  if(initP){
    phoneChip.querySelector('.cv').textContent = initP.phone;
    campChip.querySelector('.cv').textContent  = initP.camp||'—';
    info.classList.add('show');
  }

  cbWrap.addEventListener('click',()=>{
    if(isLocked || !sel.value) return;
    const nowChecked = !box.classList.contains('checked');
    box.classList.toggle('checked', nowChecked);
    txt.classList.toggle('checked', nowChecked);
    box.textContent = nowChecked ? '✓' : '';
    ensureKey(ns,sKey); S[ns][sKey][approvedKey] = nowChecked; persist();
    updateOfflineUI();
    if(!isAdmin && nowChecked){
      isLocked = true;
      sel.disabled = true;
      lockNote.style.display = '';
    }
  });

  if(!isLocked){
    sel.addEventListener('change',()=>{
      const name = sel.value;
      const person = PEOPLE.find(x=>x.name===name);
      if(person){
        phoneChip.querySelector('.cv').textContent = person.phone;
        campChip.querySelector('.cv').textContent  = person.camp||'—';
        info.classList.add('show'); sel.classList.add('filled');
      } else {
        info.classList.remove('show'); sel.classList.remove('filled');
      }
      cbWrap.classList.toggle('disabled', !name);
      ensureKey(ns,sKey);
      S[ns][sKey][nameKey] = name;
      persist();
      renderStats(ns);
      updateOfflineUI();
    });
  }
  return slot;
}

function ensureKey(ns,sKey){ if(!S[ns][sKey]) S[ns][sKey]={}; }
function makeChip(icon,val){
  const c=el('div','chip');
  c.innerHTML=`<span class="ci">${icon}</span><span class="cv">${val}</span>`;
  return c;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SWIPE DOTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildDots(ns,count){
  const wrap=document.getElementById(`dots-${ns}`);
  if(!wrap) return;
  wrap.innerHTML='';
  for(let i=0;i<count;i++){
    const d=el('div',`swipe-dot${i===0?' active':''}`);
    wrap.appendChild(d);
  }
}
function initScrollDots(){
  ['regular','setup'].forEach(ns=>{
    const scroll=document.getElementById(`${ns}-scroll`);
    const dotsEl=document.getElementById(`dots-${ns}`);
    if(!scroll||!dotsEl) return;
    scroll.addEventListener('scroll',()=>{
      const colW=(scroll.querySelector('.day-col')?.offsetWidth||274)+14;
      const idx=Math.round(scroll.scrollLeft/colW);
      dotsEl.querySelectorAll('.swipe-dot').forEach((d,i)=>
        d.classList.toggle('active',i===idx));
    },{passive:true});
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// STATS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function renderStats(ns){
  // refresh calendar if visible
  const cv=document.getElementById(`${ns}-cal-view`);
  if(cv&&cv.style.display!=='none') buildCalendar(ns);
  const cnt={};
  PEOPLE.forEach(p=>cnt[p.name]=0);
  Object.values(S[ns]).forEach(v=>{
    if(v.n1) cnt[v.n1]=(cnt[v.n1]||0)+1;
    if(v.n2) cnt[v.n2]=(cnt[v.n2]||0)+1;
  });
  const sorted=PEOPLE.map(p=>({name:p.name,c:cnt[p.name]||0}))
    .sort((a,b)=>b.c-a.c||a.name.localeCompare(b.name,'he'));
  const grid=document.getElementById(`stats-${ns}`);
  grid.innerHTML='';
  sorted.forEach(({name,c})=>{
    const s=el('div',`stat ${c>0?'has-shifts':''}`);
    s.innerHTML=`<span class="stat-name">${name}</span>
      <span class="badge ${c>0?'has':'zero'}">${c}</span>`;
    grid.appendChild(s);
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ACTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function saveData(){
  persist();
  const btn=document.getElementById('saveBtn');
  btn.textContent='✅ נשמר!'; btn.classList.add('success');
  setTimeout(()=>{ btn.textContent='💾 שמור'; btn.classList.remove('success'); },1800);
}
function clearAll(){
  if(!isAdmin) return;
  if(!confirm('למחוק את כל שיבוצי האבק? פעולה זו בלתי הפיכה.')) return;
  S={regular:{},setup:{}}; persist(); buildAll();
}
function switchTab(tab,btn){
  document.querySelectorAll('.board').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('board-'+tab).classList.add('active');
  btn.classList.add('active');
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CALENDAR VIEW
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function buildCalendar(ns){
  const grid = document.getElementById(`cal-${ns}`);
  if(!grid) return;
  grid.innerHTML='';

  if(ns==='regular'){
    // Corner cell
    const corner = el('div','cal-cell cal-hdr-cell cal-corner');
    grid.appendChild(corner);
    // Day headers
    REGULAR_DAYS.forEach(day=>{
      const hdr = el('div','cal-cell cal-hdr-cell');
      hdr.innerHTML=`<div class="cal-day-name">${day.label}</div><div class="cal-day-date">${day.date}</div>`;
      grid.appendChild(hdr);
    });
    // Shift rows
    const bgMap={night:'cal-night-bg',morning:'cal-morning-bg',evening:'cal-evening-bg'};
    REGULAR_SHIFTS.forEach((shift,si)=>{
      // Time label
      const [from,to]=shift.time.split('–').map(s=>s.trim());
      const tc = el('div','cal-cell cal-time-cell');
      tc.innerHTML=`<span class="cal-time-icon">${shift.icon}</span>
        <span class="cal-time-label">${shift.label}</span>
        <span class="cal-time-range">${from}–${to}</span>`;
      grid.appendChild(tc);
      // Day cells
      REGULAR_DAYS.forEach((_,di)=>{
        const sKey=`r_${di}_${si}`;
        const saved=S.regular[sKey]||{};
        const cell=el('div',`cal-cell ${bgMap[shift.key]||''}`);
        if(saved.n1){
          const c=el('div',`cal-chip${saved.approved1?' confirmed':''}`);
          const nameLine=el('div','cal-chip-name');
          nameLine.textContent=saved.n1+(saved.approved1?' ✓':'');
          c.appendChild(nameLine);
          const person=PEOPLE.find(x=>x.name===saved.n1);
          if(person){
            const detail=el('div','cal-chip-detail');
            detail.textContent=`${person.phone||''} · ${person.camp||'—'}`;
            c.appendChild(detail);
          }
          cell.appendChild(c);
        } else {
          const empty=el('div','cal-empty'); empty.textContent='—'; cell.appendChild(empty);
        }
        grid.appendChild(cell);
      });
    });

  } else {
    // Setup calendar
    // Collect all unique shift keys across days
    const allShiftKeys=[];
    SETUP_DAYS.forEach(day=>day.shifts.forEach(sh=>{
      if(!allShiftKeys.find(x=>x.key===sh.key&&x.cls===sh.cls))
        allShiftKeys.push(sh);
    }));

    // Corner
    const corner=el('div','cal-cell cal-hdr-cell cal-corner');
    grid.appendChild(corner);
    // Day headers
    SETUP_DAYS.forEach(day=>{
      const hdr=el('div','cal-cell cal-hdr-cell');
      hdr.innerHTML=`<div class="cal-day-name">${day.label}</div><div class="cal-day-date">${day.date}</div>`;
      grid.appendChild(hdr);
    });
    // Shift rows
    allShiftKeys.forEach(shDef=>{
      // Time label using first day that has this shift key
      const exDay=SETUP_DAYS.find(d=>d.shifts.find(s=>s.key===shDef.key&&s.cls===shDef.cls));
      const exSh=exDay?exDay.shifts.find(s=>s.key===shDef.key):shDef;
      const tc=el('div','cal-cell cal-time-cell');
      const [from,to]=exSh.time.split('–').map(s=>s.trim());
      tc.innerHTML=`<span class="cal-time-icon">${exSh.icon}</span>
        <span class="cal-time-label">${exSh.label}</span>
        <span class="cal-time-range">${from}–${to.split(' ')[0]}</span>`;
      grid.appendChild(tc);
      // Day cells
      SETUP_DAYS.forEach((day,di)=>{
        const hasShift=day.shifts.find(s=>s.key===shDef.key&&s.cls===shDef.cls);
        const cell=el('div',`cal-cell ${hasShift?'cal-'+shDef.cls+'-bg':''}`);
        if(!hasShift){
          cell.style.background='#f4f2ec'; cell.style.opacity='.4';
          grid.appendChild(cell); return;
        }
        const sKey=`s_${di}_${shDef.key}`;
        const saved=S.setup[sKey]||{};
        let filled=false;
        ['n1','n2'].forEach(nk=>{
          if(saved[nk]){
            filled=true;
            const apKey = nk==='n1' ? 'approved1' : 'approved2';
            const c=el('div',`cal-chip${saved[apKey]?' confirmed':''}`);
            const nameLine=el('div','cal-chip-name');
            nameLine.textContent=saved[nk]+(saved[apKey]?' ✓':'');
            c.appendChild(nameLine);
            const person=PEOPLE.find(x=>x.name===saved[nk]);
            if(person){
              const detail=el('div','cal-chip-detail');
              detail.textContent=`${person.phone||''} · ${person.camp||'—'}`;
              c.appendChild(detail);
            }
            cell.appendChild(c);
          }
        });
        if(!filled){ const empty=el('div','cal-empty'); empty.textContent='—'; cell.appendChild(empty); }
        grid.appendChild(cell);
      });
    });
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// VIEW SWITCH
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function switchView(ns, mode){
  const cardsView=document.getElementById(`${ns}-cards-view`);
  const calView=document.getElementById(`${ns}-cal-view`);
  const btnCards=document.getElementById(`vt-${ns}-cards`);
  const btnCal=document.getElementById(`vt-${ns}-cal`);
  if(mode==='cal'){
    cardsView.style.display='none'; calView.style.display='';
    btnCards.classList.remove('active'); btnCal.classList.add('active');
    buildCalendar(ns);
  } else {
    calView.style.display='none'; cardsView.style.display='';
    btnCal.classList.remove('active'); btnCards.classList.add('active');
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OFFLINE READINESS + SNAPSHOT EXPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function isScheduleComplete(){
  for(let di=0; di<REGULAR_DAYS.length; di++){
    for(let si=0; si<REGULAR_SHIFTS.length; si++){
      const saved = S.regular[`r_${di}_${si}`];
      if(!saved || !saved.n1 || !saved.approved1) return false;
    }
  }
  for(let di=0; di<SETUP_DAYS.length; di++){
    for(const shift of SETUP_DAYS[di].shifts){
      const saved = S.setup[`s_${di}_${shift.key}`];
      if(!saved || !saved.n1 || !saved.approved1) return false;
    }
  }
  return true;
}

function updateOfflineUI(){
  const complete = isScheduleComplete();
  const btn = document.getElementById('offlineBtn');
  const banner = document.getElementById('readyBanner');
  if(btn) btn.style.display = (isAdmin || complete) ? '' : 'none';
  if(banner) banner.style.display = complete ? '' : 'none';
}

function personRow(name){
  const p = PEOPLE.find(x=>x.name===name);
  const phone = p ? p.phone : '';
  const camp = p && p.camp ? p.camp : '—';
  return {phone, camp};
}

function buildOfflineHTML(){
  const esc = s => String(s).replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

  const regRows = REGULAR_SHIFTS.map((shift,si)=>{
    const cells = REGULAR_DAYS.map((day,di)=>{
      const saved = S.regular[`r_${di}_${si}`] || {};
      if(!saved.n1) return '<td class="empty">—</td>';
      const {phone,camp} = personRow(saved.n1);
      return `<td><div class="name">${esc(saved.n1)}${saved.approved1?' ✓':''}</div><div class="detail">${esc(phone)} · ${esc(camp)}</div></td>`;
    }).join('');
    return `<tr><th>${shift.icon} ${esc(shift.label)}<br><span class="time">${esc(shift.time)}</span></th>${cells}</tr>`;
  }).join('');

  const setupShiftDefs = [];
  SETUP_DAYS.forEach(day=>day.shifts.forEach(sh=>{
    if(!setupShiftDefs.find(x=>x.key===sh.key && x.cls===sh.cls)) setupShiftDefs.push(sh);
  }));
  const setupRows = setupShiftDefs.map(shDef=>{
    const cells = SETUP_DAYS.map((day,di)=>{
      const hasShift = day.shifts.find(s=>s.key===shDef.key && s.cls===shDef.cls);
      if(!hasShift) return '<td class="na"></td>';
      const saved = S.setup[`s_${di}_${shDef.key}`] || {};
      const names = ['n1','n2'].filter(k=>saved[k]).map(k=>{
        const {phone,camp} = personRow(saved[k]);
        const apKey = k==='n1' ? 'approved1' : 'approved2';
        return `<div class="name">${esc(saved[k])}${saved[apKey]?' ✓':''}</div><div class="detail">${esc(phone)} · ${esc(camp)}</div>`;
      }).join('');
      return names ? `<td>${names}</td>` : '<td class="empty">—</td>';
    }).join('');
    return `<tr><th>${shDef.icon} ${esc(shDef.label)}<br><span class="time">${esc(shDef.time)}</span></th>${cells}</tr>`;
  }).join('');

  const genDate = new Date().toLocaleDateString('he-IL');

  return `<!DOCTYPE html>
<html lang="he" dir="rtl"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>לוח משמרות סופי — מחלקת טק | מידברן 2026</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Arial,Heebo,sans-serif;background:#f0ede6;color:#1A1A2E;direction:rtl;padding:14px}
h1{font-size:1.15rem;font-weight:900;color:#1A1A2E;margin-bottom:2px}
.sub{font-size:.78rem;color:#7a8090;margin-bottom:16px}
h2{font-size:1rem;font-weight:800;margin:18px 0 8px;padding-top:10px;border-top:2px solid #DFA030}
.tblwrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
table{border-collapse:collapse;width:100%;min-width:560px;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,.08)}
th,td{border:1px solid #e0dbd0;padding:8px 6px;text-align:center;vertical-align:top;font-size:.78rem}
th{background:#1A1A2E;color:#fff;font-size:.72rem;font-weight:700;white-space:nowrap}
th .time{font-weight:400;opacity:.75;font-size:.62rem}
td.empty{color:#c8c2b4;font-style:italic}
td.na{background:#f4f2ec;opacity:.4}
.name{font-weight:700;font-size:.8rem}
.detail{font-size:.66rem;color:#7a8090;margin-top:2px}
.foot{margin-top:22px;font-size:.68rem;color:#7a8090;text-align:center}
</style></head>
<body>
<h1>🔥 לוח משמרות סופי — מחלקת טק | מידברן 2026</h1>
<div class="sub">גרסה אופליין · נוצרה בתאריך ${esc(genDate)} · ניתן לשמור ולפתוח ללא אינטרנט</div>

<h2>📅 משמרות (3–7.11)</h2>
<div class="tblwrap"><table>
<tr><th></th>${REGULAR_DAYS.map(d=>`<th>${esc(d.label)}<br>${esc(d.date)}</th>`).join('')}</tr>
${regRows}
</table></div>

<h2>🔧 הקמות (28.10–3.11)</h2>
<div class="tblwrap"><table>
<tr><th></th>${SETUP_DAYS.map(d=>`<th>${esc(d.label)}<br>${esc(d.date)}</th>`).join('')}</tr>
${setupRows}
</table></div>

<div class="foot">מחלקת טק · מידברן 2026 · הפלאייה לא ישנה 🔥</div>
</body></html>`;
}

function downloadOfflineSnapshot(){
  const html = buildOfflineHTML();
  const blob = new Blob([html], {type:'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'לוח-משמרות-סופי-מידברן2026.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 4000);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UTILS & INIT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function el(tag,cls){ const e=document.createElement(tag); e.className=cls; return e; }

loadState();
updateAdminUI();
buildAll();

if('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost')){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}
