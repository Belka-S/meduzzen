import{C as U,a as V,b as C,F as T,r as g,i as O,v as is,j as s,B as N,$ as cs,a0 as B,J as H,a1 as us,y as ls,V as ds,l as G,z as ms,a2 as Z,I as R,o as L,a3 as _s,a4 as J,a5 as F,S as M,a6 as hs,a7 as Y,a8 as ss,a9 as fs,aa as Q,H as P,ab as ps,ac as es,ad as vs,ae as bs,af as xs,M as js,N as gs,c as ts,Q as ys,ag as ks,n as qs,G as ws,O as zs,P as Ns}from"./index-0c623FNQ.js";import{g as Ss,I as $s,a as As,P as Es}from"./getArrFromObj-BeGakrOr.js";import{S as Cs}from"./index-C6sbcqFx.js";import{U as Qs}from"./index-080sLIoF.js";import"./trimName-Cn-Df3iO.js";const Is="_form_5nafv_1",Ts="_button_5nafv_5",W={form:Is,button:Ts},Fs=()=>{const{id:y}=U(),r=V(),_=C(),{company:e}=T(),[l,a]=g.useState(""),{register:m,control:d,handleSubmit:p,formState:b}=O({mode:"onChange"}),h=async t=>{const i=new FormData;let c=t.file[0];c!=null&&c.type||(c=t.file),i.append("file",c),await _(cs(i)),await _(B({company_id:Number(y)})),r(H(!1))},n=async t=>{const c=t.target.files[0],q=URL.createObjectURL(c);r(us({company_avatar:q}));try{await ls.validate({file:c},{abortEarly:!1}),a("noError")}catch(w){if(w instanceof ds){const j=w.inner[0].message;G.error(j),a(j)}return w}},o=`profile-${Ss(12)}`,f=ms(60);g.useEffect(()=>{if(e!=null&&e.company_avatar)document.styleSheets[0].insertRule(`#${o} {background-image: url(${e==null?void 0:e.company_avatar})}`,0);else if(e!=null&&e.company_name){const t=is(e==null?void 0:e.company_name);document.styleSheets[0].insertRule(`#${o}::after { background-color: ${f}; color: #ffffff; content: '${t}'}`)}},[o,f,e]);const v=l==="noError"?"":l,k=!(Object.keys(b.touchedFields).length>0)||v;return s.jsxs("form",{className:W.form,onSubmit:p(h),children:[s.jsx($s,{inputName:"file",register:m,control:d,callback:n,accept:"image/*",btnId:o,fileError:l,errorMessage:v}),Object.keys(b.touchedFields).length>0&&s.jsx(N,{className:W.button,type:"submit",color:k?"disabled":"outlined",variant:"smooth",label:"Submit",onClick:t=>t.currentTarget.blur()})]})},Os="_form_1ahl5_1",Ms={form:Os},I=Object.keys(Z.fields),Ds=()=>{const y=V(),r=C(),{id:_}=U(),{company:e}=T(),l=I.filter(t=>t.includes("link"));let a=g.useMemo(()=>l.map((t,i)=>{if(e!=null&&e.company_links&&!e.company_links[i])return t}).filter(t=>t&&t).slice(1),[l,e==null?void 0:e.company_links]);a=g.useMemo(()=>a.length>0?a:I.filter(t=>t.includes("_link")),[a]);const m=g.useMemo(()=>l.reduce((t,i,c)=>e!=null&&e.company_links&&(e!=null&&e.company_links[c])?{...t,[i]:e==null?void 0:e.company_links[c]}:t,{}),[l,e==null?void 0:e.company_links]),d=L(Z),{register:p,handleSubmit:b,watch:h,formState:n}=O({resolver:d,mode:"onChange",defaultValues:{...e,...m}}),{errors:o,isValid:f,touchedFields:v}=n,x=async t=>{const i=Number(_),c=l.map(j=>t[j]).filter(j=>j&&j),q={company_id:i,...t,company_links:c},{payload:w}=await r(_s(q));G.success(w.detail),y(H(!1)),await r(B({company_id:Number(_)}))};I.map(t=>h(t)),g.useEffect(()=>{const t=I.filter(i=>i.includes("link")).map(i=>{const c=document.querySelector(`input[name="${i}"]`),q=c==null?void 0:c.closest("label");return{input:c,label:q}});if(t&&t[0].input)for(let i=0;i<t.length-1;i+=1)t[i].input.value?t[i+1].label.style.display="block":t[i+1].label.style.display="none"},[m]);const k=!f||Object.keys(v).length===0;return s.jsxs("form",{className:Ms.form,onSubmit:b(x),children:[I.map(t=>s.jsx(R,{style:{display:a.includes(t)?"none":"block"},inputName:t,errors:o,watch:h,register:p},t)),s.jsx(N,{type:"submit",color:k?"disabled":"outlined",variant:"smooth",label:"Submit",onClick:t=>t.currentTarget.blur(),onMouseOver:t=>t.currentTarget.focus()})]})},Rs=y=>{const{setAnswerObj:r,setCount:_,setQuestionId:e,setValue:l}=y,a=C(),{quiz:m}=J(),d=m==null?void 0:m.quiz_id;if(!d)return;const{questions_list:p}=m,b=n=>{const{question_id:o,question_text:f}=n;e(o);const v=n.question_answers.reduce((x,k,t)=>(l(`question_answer_${t+1}`,k),{...x,[`answer_${t+1}`]:t+1}),{});r(v),_(n.question_answers.length),l("question_text",f)},h=async n=>{const{question_id:o,question_text:f}=n;o&&confirm(`Are you sure you want to delete: ${f}`)&&(await a(hs({question_id:o})),await a(Y({quiz_id:d})))};return s.jsx("div",{className:F.list,children:p.map((n,o)=>s.jsxs("div",{className:F.item,children:[s.jsxs("span",{children:[(o+1).toString().padStart(2,"0"),":"]}),s.jsxs("span",{children:[" ",n.question_text," ?"]}),s.jsxs("span",{children:["[ ",n.question_answers.map((f,v)=>s.jsx("span",{className:F.answer,children:f},f+v))," ]"]}),s.jsxs("span",{children:["id: ",n.question_id]}),s.jsxs("div",{className:F.btn_wrap,children:[s.jsx(N,{size:"s",variant:"round",color:"transparent",onClick:()=>b(n),children:s.jsx(M,{svgId:"ui-edit",size:16})}),s.jsx(N,{size:"s",variant:"round",color:"transparent",onClick:()=>h(n),children:s.jsx(M,{svgId:"ui-trash",size:16})})]})]},n.question_id))})},Ls=Object.keys(ss.fields),X={answer_1:1},Ps=({setIsModal:y})=>{const r=C(),{company:_}=T(),{quiz:e}=J(),[l,a]=g.useState(1),[m,d]=g.useState(X),[p,b]=g.useState(NaN),h=L(ss),{register:n,handleSubmit:o,formState:f}=O({resolver:h,mode:"onChange",defaultValues:{quiz_name:e==null?void 0:e.quiz_name,quiz_frequency:e==null?void 0:e.quiz_frequency}}),v=fs(m),x=Object.keys(v.fields),k=L(v),{reset:t,setValue:i,register:c,handleSubmit:q,formState:w}=O({resolver:k,mode:"onChange"});if(!e||!_)return;const{questions_list:j,quiz_id:A}=e,{company_id:u}=_,$=async z=>{await r(ps({...z,quiz_id:A})),await r(es({company_id:u})),y()},as=async z=>{const{question_text:D,question_correct_answer:rs}=z,K={question_id:p,question_text:D,question_answers:vs(z,!0),question_correct_answer:rs-1};if(p)await r(xs({...K,question_id:p}));else{if(j.find(os=>os.question_text===D))return alert(`You alreddy have ${D} question`);await r(bs({...K,quiz_id:A}))}await r(Y({quiz_id:A})),d(X),a(1),b(NaN),t()},ns=()=>{a(l+1),d({...m,[`answer_${l+1}`]:l+1})};return s.jsxs("div",{className:Q.form_wrap,children:[s.jsx(P,{className:Q.title,children:"Edit quiz"}),s.jsxs("form",{className:Q.form,onSubmit:o($),children:[Ls.map(z=>s.jsx(R,{inputName:z,errors:f.errors,register:n},z)),s.jsx(N,{className:Q.button,type:"submit",variant:"smooth",color:j.length>1?"default":"disabled",label:"Update quiz info"})]}),s.jsx(Rs,{setAnswerObj:d,setCount:a,setValue:i,setQuestionId:b}),s.jsxs("form",{className:Q.form,onSubmit:q(as),children:[x.map(z=>s.jsx(R,{inputName:z,errors:w.errors,register:c},z)),s.jsx(N,{variant:"smooth",label:"Add answer",onClick:ns}),s.jsx(N,{color:Object.keys(m).length>1?"default":"disabled",type:"submit",variant:"smooth",label:"Add or edit question"})]})]})},Us="_head_1rulr_1",Vs="_head__wrap_1rulr_11",Bs="_item_1rulr_20",Hs="_active_1rulr_32",Gs="_icon_svg_1rulr_41",Js="_hover_1rulr_45",Ys="_vision_svg_1rulr_51",Ks="_avatar_1rulr_55",Ws="_button_1rulr_60",Xs="_icon_svg__shown_1rulr_63",S={head:Us,head__wrap:Vs,item:Bs,active:Hs,icon_svg:Gs,hover:Js,vision_svg:Ys,avatar:Ks,button:Ws,icon_svg__shown:Xs},Zs=({props:y})=>{const{quiz_id:r,quiz_name:_,quiz_title:e,quiz_description:l}=y,{pathname:a}=js(),m=C(),{company:d}=T(),{result:p,quiz:b}=J(),[h,n]=g.useState(!1);if(!r||!d)return;const o=(b==null?void 0:b.quiz_id)===r,f=async x=>{x.preventDefault(),x.currentTarget.blur();const{company_id:k}=d;confirm(`Are you sure you want to delete: ${_}`)&&(await m(ks({quiz_id:r})),await m(es({company_id:k})))},v=async x=>{x.preventDefault(),x.currentTarget.blur(),await m(Y({quiz_id:r})),n(!h)};return s.jsxs(gs,{to:`/quiz/${r}`,state:{from:a},className:ts(S.item,S.hover,o&&S.active),children:[s.jsx("span",{children:r}),s.jsx("span",{children:_}),s.jsx("span",{children:e}),s.jsx("span",{children:l}),o&&s.jsxs("span",{children:[`result: ${p==null?void 0:p.result_score}%`," "]}),!o&&s.jsx("span",{}),s.jsx(N,{className:S.button,variant:"round",color:"transparent",onClick:v,children:s.jsx(M,{className:S.icon_svg,svgId:"ui-edit"})}),s.jsx(N,{className:S.button,variant:"round",color:"transparent",onClick:f,children:s.jsx(M,{className:S.icon_svg,svgId:"ui-trash"})}),h&&s.jsx(ys,{className:S.modal,setIsModal:()=>n(!h),children:s.jsx(Ps,{setIsModal:()=>n(!h)})})]})},se="_screen_1oc64_1",ee="_main_1oc64_9",te="_avatar_1oc64_17",ae="_name_1oc64_21",ne="_title_1oc64_27",E={screen:se,main:ee,avatar:te,name:ae,title:ne},le=()=>{var q,w,j,A;const y=V(),r=C(),{id:_}=U(),{owner:e,checkedUsers:l}=qs(),{company:a,profileInfo:m,appendix:d,edit:p,loading:b}=T(),{companyData:h}=ws();g.useEffect(()=>{r(B({company_id:Number(_)}))},[r,_]);const n=g.useMemo(()=>{if(d==="checked")return{users:[...l].sort((u,$)=>u.user_id-$.user_id)};if(d==="quizzes")return{quizzes:[...h.quizzes].sort((u,$)=>u.quiz_id-$.quiz_id)};if(d)return{users:[...h[d]].sort((u,$)=>u.user_id-$.user_id)}},[d,l,h]);if(!a)return;const o=((q=a==null?void 0:a.company_owner)==null?void 0:q.user_id)===(e==null?void 0:e.user_id),f=!b&&_===((w=a==null?void 0:a.company_id)==null?void 0:w.toString()),v=p==="avatar"||o,x=p==="data"&&o,k={id:a==null?void 0:a.company_id,url:a==null?void 0:a.company_avatar,name:a==null?void 0:a.company_name},t=As(m),i=a.company_links?a.company_links:[],c=u=>{if(!(e!=null&&e.is_superuser)&&!o){u.preventDefault(),u.currentTarget.blur(),G.error("It's not your account");return}return y(H("avatar"))};return f?s.jsxs(Cs,{className:ts("container",E.screen),children:[s.jsxs("div",{children:[s.jsxs("div",{className:E.main,children:[v&&s.jsx(Fs,{}),!v&&s.jsx(Ns,{className:E.avatar,ava:k,size:"xl",onClick:c}),s.jsx(P,{className:E.name,children:`${a==null?void 0:a.company_name}`})]}),x&&s.jsx(Ds,{}),!x&&s.jsx(Es,{info:t,links:i})]}),s.jsxs("div",{className:E.appendix,children:[d?s.jsx(P,{className:E.title,children:`Company's ${d}:`}):s.jsx("span",{}),(j=n==null?void 0:n.users)==null?void 0:j.map(u=>u&&s.jsx(Qs,{props:u},u==null?void 0:u.user_id)),(A=n==null?void 0:n.quizzes)==null?void 0:A.map(u=>u&&s.jsx(Zs,{props:u},u==null?void 0:u.quiz_id))]})]}):s.jsx(zs,{})};export{le as default};