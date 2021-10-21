(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{26:function(e,t,n){e.exports={check:"TodoItem_check__1Vyp5",control:"TodoItem_control__Pk4k4",grip:"TodoItem_grip__18YEZ",remove:"TodoItem_remove__3Pi93",fadeIn:"TodoItem_fadeIn__2SAdo",fadeOut:"TodoItem_fadeOut__39KgA"}},31:function(e,t,n){e.exports={status:"NetworkStatus_status__jwDJp",online:"NetworkStatus_online__31Mwq",offline:"NetworkStatus_offline__1rOSz",text:"NetworkStatus_text__22sfn",animate:"NetworkStatus_animate__1709a",quickReveal:"NetworkStatus_quickReveal__3u39r"}},32:function(e,t,n){e.exports={snackWrap:"SnackBar_snackWrap__16cIp",snackInner:"SnackBar_snackInner__1vwPc",actionWrap:"SnackBar_actionWrap__10IA_",action:"SnackBar_action__3MmYh",close:"SnackBar_close__3aLzP"}},39:function(e,t,n){e.exports={settingsWrap:"TodoItemReminder_settingsWrap__1Vc_8",list:"TodoItemReminder_list__3JAY8"}},50:function(e,t,n){e.exports={footer:"App_footer__29Fsv"}},73:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),o=n(19),c=n.n(o),r=n(8),s=(n(71),n(72),n(73),n(25)),d=n(34),l=n(9),u=n(50),j=n.n(u),f=n(2),b=n(7),h=n(4),m=n(5),p=n.n(m),O=n(31),g=n.n(O),v=n(18),x=n.n(v),k=n(24),w="online",y="offline",N=navigator.connection||navigator.mozConnection||navigator.webkitConnection,_=["bluetooth","cellular","ethernet","wifi","wimax","other","unknown"];function T(e){return _.includes(e)?w:y}function S(){return C.apply(this,arguments)}function C(){return(C=Object(k.a)(x.a.mark((function e(){var t,n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(window.navigator.onLine){e.next=2;break}return e.abrupt("return",y);case 2:return(t=new URL(window.location.origin)).searchParams.set("rand",Date.now()),e.prev=4,e.next=7,fetch(t.toString(),{method:"HEAD"});case 7:return n=e.sent,e.abrupt("return",n.ok?w:y);case 11:return e.prev=11,e.t0=e.catch(4),e.abrupt("return",y);case 14:case"end":return e.stop()}}),e,null,[[4,11]])})))).apply(this,arguments)}var I=n(1);var E=function(e){var t=e.className,n=Object(h.a)(e,["className"]),i=Object(a.useState)(null),o=Object(b.a)(i,2),c=o[0],r=o[1],s=Object(a.useRef)(null);return Object(a.useEffect)((function(){s.current&&(s.current.classList.remove(g.a.animate),s.current.offsetWidth,s.current.classList.add(g.a.animate))}),[c]),Object(a.useEffect)((function(){var e=function(e){if(N&&N.type){function t(){e(T(N.type))}return console.log("\ud83d\udd0c - using navigtor.connection.type to check network status"),N.addEventListener("change",t),{check:function(){var e=Object(k.a)(x.a.mark((function e(){return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",T(N.type));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),cleanup:function(){return N.removeEventListener("change",t)}}}function n(){e(w)}function a(){e(y)}return console.log("\ud83d\udd0c - using navigtor.onLine and fallback to check network status"),window.addEventListener("online",n),window.addEventListener("offline",a),{check:S,cleanup:function(){window.removeEventListener("online",n),window.removeEventListener("offline",a)}}}(r);return e.check().then(r),e.cleanup}),[]),null===c?null:Object(I.jsxs)("div",{className:"d-flex align-items-center",children:[Object(I.jsx)("span",Object(f.a)(Object(f.a)({title:c},n),{},{className:p()(t,g.a.status,g.a[c])})),Object(I.jsx)("span",{ref:s,className:g.a.text,children:c})]})},M=n(37),D=n.n(M),L=n(29),R=n(93),W="open",A="done";function P(e,t){return Object(f.a)(Object(f.a)(Object(f.a)({},e),t),{},{modified:(new Date).toISOString()})}var q=Object(L.b)({name:"todos",initialState:{items:[]},reducers:{addTodo:function(e,t){var n;e.items.push((n=t.payload,{id:Object(R.a)(),title:n,status:W,created:(new Date).toISOString(),modified:void 0,reminders:[]}))},updateTodo:function(e,t){var n=t.payload,a=n.id,i=n.title,o=e.items.find((function(e){return a===e.id}));o&&P(o,{title:i})},removeTodo:function(e,t){var n=t.payload,a=e.items.findIndex((function(e){return e.id===n}));a>=0&&e.items.splice(a,1)},completeTodo:function(e,t){var n=t.payload,a=e.items.find((function(e){return n===e.id}));a&&P(a,{status:A})},openTodo:function(e,t){var n=t.payload,a=e.items.find((function(e){return n===e.id}));a&&P(a,{status:W})},reorder:function(e,t){var n=t.payload,a=n.id,i=n.endIndex,o=e.items.findIndex((function(e){return e.id===a}));if(o>=0){var c=e.items.splice(o,1),r=Object(b.a)(c,1)[0];e.items.splice(i,0,r)}},addReminder:function(e,t){var n=t.payload,a=n.id,i=n.tag,o=n.timestamp,c=e.items.find((function(e){return a===e.id}));c.reminders=c.reminders||[],c&&c.reminders.push(function(e,t){return{tag:e,timestamp:t}}(i,o))},removeReminder:function(e,t){var n=t.payload,a=n.id,i=n.tag,o=e.items.find((function(e){return a===e.id}));if(o){var c=o.reminders.findIndex((function(e){return e.tag===i}));c>=0&&o.reminders.splice(c,1)}}}}),K=q.actions,B=K.addTodo,F=K.updateTodo,U=K.removeTodo,z=K.completeTodo,J=K.openTodo,V=K.reorder,Y=K.addReminder,H=K.removeReminder,Z=function(e){return e.todos.present.items},$=q.reducer,G=n(10),Q=n(92),X=n(87),ee=n(52),te=n(91),ne=n(94),ae=n(53),ie=Object(L.b)({name:"settings",initialState:{allowNotification:!1,darkMode:"system",supportsNotifications:!1},reducers:{updateSimpleSetting:function(e,t){var n=t.payload,a=n.settingsKey,i=n.value;e[a]=i}}}),oe=ie.actions.updateSimpleSetting,ce=function(e){return e.settings.darkMode},re=function(e){return e.settings.allowNotification},se=function(e){return e.settings.supportsNotifications},de=ie.reducer;var le=function(e){var t=e.required,n=e.onTimeAccepted,i=void 0===n?function(){}:n,o=Object(a.useState)(""),c=Object(b.a)(o,2),r=c[0],d=c[1],l=Object(a.useState)(!1),u=Object(b.a)(l,2),j=u[0],f=u[1],h=Object(a.useState)(!1),m=Object(b.a)(h,2),p=m[0],O=m[1];return Object(I.jsxs)(te.a,{noValidate:!0,validated:j,onSubmit:function(e){var t=e.currentTarget;e.preventDefault(),e.stopPropagation(),!0===t.checkValidity()?(i(r),O(!1)):O(!0),f(!0)},children:[Object(I.jsx)(te.a.Label,{htmlFor:"addNotifcationReminder",children:"Choose a reminder time:"}),Object(I.jsxs)(ne.a,{children:[Object(I.jsx)(te.a.Control,{required:t,type:"datetime-local",id:"addNotifcationReminder",name:"notifcationReminder",value:r,min:s.DateTime.now().plus({minutes:1}).toISO().split(":").slice(0,2).join(":"),onChange:function(e){j&&f(!1),d(e.currentTarget.value)}}),Object(I.jsxs)(ae.a,{variant:"primary",type:"submit",children:[Object(I.jsx)("i",{className:"bi bi-plus-lg"}),Object(I.jsx)("span",{className:"visually-hidden",children:"add reminder"})]})]}),Object(I.jsx)(te.a.Control.Feedback,{type:"invalid",style:{display:p?"block":"none"},children:r?"Time must be in the future":"Must not be empty"})]})},ue=function(){var e=Object(k.a)(x.a.mark((function e(t,n,a){var i;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!("showTrigger"in Notification.prototype)){e.next=12;break}return e.next=3,navigator.serviceWorker.getRegistration();case 3:return i=e.sent,e.next=6,Notification.requestPermission();case 6:if("granted"!==e.sent){e.next=11;break}i.showNotification(n,{tag:t,body:"This notification was scheduled 30 seconds ago",showTrigger:new window.TimestampTrigger(a+3e4),data:{url:window.location.href},badge:"logo192.png",icon:"logo192.png",actions:[{action:"open",title:"Open app"},{action:"close",title:"Close notification"}]}),e.next=12;break;case 11:throw new Error("Notification permission denied");case 12:throw new Error("Notification.showTrigger not supported");case 13:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),je=function(){var e=Object(k.a)(x.a.mark((function e(t){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!("showTrigger"in Notification.prototype)){e.next=10;break}return e.next=3,navigator.serviceWorker.getRegistration();case 3:return n=e.sent,e.next=6,n.getNotifications({tag:t,includeTriggered:!0});case 6:e.sent.forEach((function(e){return e.close()})),e.next=11;break;case 10:throw new Error("Notification.showTrigger not supported");case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),fe=n(39),be=n.n(fe);var he=function(e){var t=e.todo,n=t.id,i=t.title,o=t.reminders,c=void 0===o?[]:o,d=Object(r.c)(),l=Object(r.d)(re);return Object(a.useEffect)((function(){Notification.requestPermission().then((function(e){d(oe({settingsKey:"allowNotification",value:"granted"===e}))})).catch(console.error)}),[]),l||be.a.settingsWrap,Object(I.jsxs)("div",{className:be.a.settingsWrap,children:[Object(I.jsx)(le,{required:!0,onTimeAccepted:function(e){if(e){var t=Object(R.a)(),a=s.DateTime.fromISO(e).toMillis();ue(t,i,a).then((function(){d(Y({id:n,tag:t,timestamp:a}))})).catch((function(e){console.error(e),alert("Error adding notification. ".concat(e.message))}))}}}),c.length>0&&Object(I.jsxs)("div",{children:[Object(I.jsx)("p",{className:"mb-0 mt-4 fw-bold",children:"Scheduled reminders:"}),Object(I.jsx)("ul",{className:be.a.list,children:c.map((function(e){return Object(I.jsxs)("li",{children:[s.DateTime.fromMillis(e.timestamp).toLocaleString(s.DateTime.DATETIME_MED)," ",Object(I.jsxs)(ae.a,{variant:"secondary",className:"rounded-circle",onClick:function(){d(H({id:n,tag:e.tag})),je(e.tag).catch((function(e){console.error(e)}))},children:[Object(I.jsx)("i",{className:"bi bi-x-lg"}),Object(I.jsx)("span",{className:"visually-hidden",children:"delete this reminder"})]})]},e.tag)}))})]})]})};var me=function(e){var t=e.text,n=e.onChange,i=(e.label,Object(h.a)(e,["text","onChange","label"])),o=Object(a.useRef)(null);return Object(a.useEffect)((function(){if(document.activeElement===o.current){var e=document.createRange();e.selectNodeContents(o.current),e.collapse(!1);var t=window.getSelection();t.removeAllRanges(),t.addRange(e)}}),[t]),Object(I.jsx)("div",Object(f.a)(Object(f.a)({ref:o,role:"textbox",contentEditable:"true",suppressContentEditableWarning:!0,onInput:n},i),{},{children:t}))},pe=n(26),Oe=n.n(pe),ge=A,ve=W;function xe(e,t){var n=e.todo,i=e.onDeleteItem,o=void 0===i?function(){}:i,c=Object(h.a)(e,["todo","onDeleteItem"]),s=n.id,d=n.title,l=n.status,u=Object(r.c)(),j=Object(a.useState)(!1),m=Object(b.a)(j,2),O=m[0],g=m[1],v=Object(a.useState)(!1),x=Object(b.a)(v,2),k=x[0],w=x[1],y=Object(r.d)(se),N=Object(Q.a)((function(e){u(F({id:s,title:e}))}),1e3);var _=l===ge;return Object(I.jsxs)(X.a,Object(f.a)(Object(f.a)({ref:t},c),{},{as:"li",className:p()("gx-0 mb-1",Oe.a.fadeIn,Object(G.a)({},Oe.a.fadeOut,k)),children:[l===ve&&Object(I.jsx)(ee.a,{xs:"auto",className:"align-items-center d-flex ".concat(Oe.a.grip),children:Object(I.jsx)("i",{className:"bi bi-grip-vertical"})}),Object(I.jsx)(ee.a,{xs:"auto",children:Object(I.jsxs)(te.a.Check,{className:Oe.a.check,id:"todo-checkbox-".concat(s),children:[Object(I.jsx)(te.a.Check.Input,{type:"checkbox",checked:_,onChange:function(e){e.target.checked?u(z(s)):u(J(s))}}),Object(I.jsx)(te.a.Check.Label,{htmlFor:"todo-checkbox-".concat(s),className:"visually-hidden",children:"Mark done"})]})}),Object(I.jsx)(ee.a,{children:Object(I.jsxs)(ne.a,{children:[_&&Object(I.jsx)("div",{className:"".concat(Oe.a.control," form-control text-muted text-decoration-line-through"),children:d}),!_&&Object(I.jsx)(me,{onChange:function(e){N(e.currentTarget.textContent)},className:p()(Oe.a.control,"form-control"),text:d}),!_&&y&&Object(I.jsxs)(ae.a,{variant:"link",title:"add reminder",onClick:function(){g(!O)},children:[Object(I.jsx)("i",{className:"bi bi-bell"}),Object(I.jsx)("span",{className:"visually-hidden",children:"add reminder"})]}),Object(I.jsxs)(ae.a,{className:Oe.a.remove,title:"delete",variant:"link",onClick:function(){var e;w(!0),o(s),null===(e=n.reminders)||void 0===e||e.forEach((function(e){je(e.tag).catch(console.error)})),setTimeout((function(){u(U(s))}),500)},children:[Object(I.jsx)("i",{className:"bi bi-trash"}),Object(I.jsx)("span",{className:"visually-hidden",children:"delete"})]})]})}),O&&Object(I.jsx)(ee.a,{xs:12,children:Object(I.jsx)(he,{todo:n})})]}))}var ke=Object(a.forwardRef)(xe),we=n(35),ye=A;var Ne=function(e){var t=e.todo,n=e.index,a=Object(h.a)(e,["todo","index"]),i=t.id,o=t.status,c=function(e,t){var n=Object(f.a)({},t);return e&&(n.userSelect="none",n.border="1px solid lightgreen"),o===ye&&(n.display="none"),n};return Object(I.jsx)(we.b,{draggableId:i,index:n,children:function(e,n){return Object(I.jsx)(ke,Object(f.a)(Object(f.a)(Object(f.a)({ref:e.innerRef},e.draggableProps),e.dragHandleProps),{},{style:c(n.isDragging,e.draggableProps.style),todo:t},a))}})},_e=n(88);var Te=function(){var e=Object(r.c)(),t=Object(a.useState)(""),n=Object(b.a)(t,2),i=n[0],o=n[1],c=Object(a.useState)(!1),s=Object(b.a)(c,2),d=s[0],l=s[1];return Object(I.jsxs)("form",{onSubmit:function(t){t.preventDefault(),e(B(i)),o("")},children:[Object(I.jsxs)(ne.a,{children:[Object(I.jsx)(te.a.Control,{onChange:function(e){var t=e.currentTarget.value;if(t.length>150)return e.preventDefault(),void l(!0);l(!1),o(t)},value:i,"aria-label":"Enter todo item","aria-describedby":"basic-addon2"}),Object(I.jsx)(ae.a,{type:"submit",variant:"outline-primary",id:"button-addon2",children:Object(I.jsx)("i",{className:"bi bi-plus"})})]}),Object(I.jsx)(te.a.Control.Feedback,{type:"invalid",style:{display:d?"block":"none"},children:"Max 150 characters"})]})},Se=n(32),Ce=n.n(Se);var Ie=function(e){var t=e.title,n=e.actionTitle,i=e.action,o=e.onClose;return Object(a.useEffect)((function(){var e=setTimeout(o,5e3);return function(){window.clearTimeout(e)}}),[o]),Object(I.jsx)("div",{role:"alert",className:Ce.a.snackWrap,children:Object(I.jsxs)("div",{className:Ce.a.snackInner,children:[Object(I.jsx)("div",{children:t}),Object(I.jsxs)("div",{className:Ce.a.actionWrap,children:[i&&n&&Object(I.jsx)("button",{className:Ce.a.action,type:"button",onClick:i,children:n}),Object(I.jsxs)("button",{type:"button",className:Ce.a.close,onClick:o,children:[Object(I.jsx)("i",{className:"bi bi-x-lg"}),Object(I.jsx)("span",{className:"visually-hidden",children:"close"})]})]})]})})},Ee=A;var Me=function(){var e=Object(r.d)(Z),t=Object(r.c)(),n=Object(a.useState)(!1),i=Object(b.a)(n,2),o=i[0],c=i[1],s=e.filter((function(e){return e.status===Ee}));function d(){c(!0)}return Object(I.jsx)(I.Fragment,{children:Object(I.jsx)(_e.a,{children:Object(I.jsx)(X.a,{children:Object(I.jsxs)(ee.a,{children:[Object(I.jsx)(we.a,{onDragEnd:function(e){e.destination&&t(V({id:e.draggableId,endIndex:e.destination.index}))},children:Object(I.jsx)(we.c,{droppableId:"home-list",children:function(t){return Object(I.jsxs)("ul",Object(f.a)(Object(f.a)({},t.droppableProps),{},{ref:t.innerRef,className:"list-unstyled",children:[e&&e.map((function(e,t){return Object(I.jsx)(Ne,{todo:e,onDeleteItem:d,index:t},e.id)})),t.placeholder]}))}})}),Object(I.jsx)(Te,{}),o&&Object(I.jsx)(Ie,{title:"Deleted todo item",actionTitle:"undo",action:function(){t(M.ActionCreators.undo()),c(!1)},onClose:function(){c(!1)}}),s.length>0&&Object(I.jsx)("ul",{className:"list-unstyled mt-4",children:s.map((function(e){return Object(I.jsx)(ke,{todo:e,onDeleteItem:d},e.id)}))})]})})})})};var De=function(){var e=Object(r.c)(),t=Object(r.d)((function(e){return e.settings}));return Object(I.jsxs)(_e.a,{children:[Object(I.jsx)(X.a,{children:Object(I.jsx)(ee.a,{children:Object(I.jsx)("h1",{children:"Settings"})})}),Object(I.jsxs)(X.a,{className:"mt-4",children:[Object(I.jsx)(ee.a,{children:"Allow notifications"}),Object(I.jsx)(ee.a,{xs:"auto",children:Object(I.jsx)(te.a.Check,{type:"switch",id:"allowNotifications","aria-label":"Toggle Allow Notifications",checked:t.allowNotification,onChange:function(t){t.target.checked?Notification.requestPermission().then((function(t){e(oe({settingsKey:"allowNotification",value:"granted"===t}))})):e(oe({settingsKey:"allowNotification",value:!1}))}})})]}),Object(I.jsxs)(X.a,{className:"mt-4",children:[Object(I.jsx)(ee.a,{children:"Dark Mode"}),Object(I.jsx)(ee.a,{xs:"auto",children:Object(I.jsxs)("fieldset",{children:[Object(I.jsx)(te.a.Check,{inline:!0,type:"radio",id:"darkMode-on",name:"darkMode",label:"on",checked:"on"===t.darkMode,value:"on",onChange:function(t){e(oe({settingsKey:"darkMode",value:"on"}))}}),Object(I.jsx)(te.a.Check,{inline:!0,type:"radio",id:"darkMode-off",name:"darkMode",label:"off",checked:"off"===t.darkMode,value:"off",onChange:function(t){e(oe({settingsKey:"darkMode",value:"off"}))}}),Object(I.jsx)(te.a.Check,{inline:!0,type:"radio",id:"darkMode-system",name:"darkMode",label:"OS",checked:"system"===t.darkMode,value:"system",onChange:function(t){e(oe({settingsKey:"darkMode",value:"system"}))}})]})})]})]})},Le=n(89),Re=n(90);var We=function(e){var t=e.darkMode,n="light",a="light",i=window.matchMedia("(prefers-color-scheme: dark)");return("on"===t||"system"===t&&i.matches)&&(n="dark",a="dark"),Object(I.jsx)(Le.a,{bg:n,variant:a,expand:"md",className:"mb-2",children:Object(I.jsxs)(_e.a,{children:[Object(I.jsx)(Le.a.Brand,{as:d.b,to:"/",children:"Todo+"}),Object(I.jsx)(Le.a.Toggle,{"aria-controls":"todo-nav"}),Object(I.jsx)(Le.a.Collapse,{id:"todo-nav",children:Object(I.jsx)(Re.a,{className:"me-auto",children:Object(I.jsx)(Re.a.Link,{as:d.b,to:"/settings",children:"Settings"})})})]})})};var Ae=function(){var e=Object(r.d)(ce),t=Object(r.c)();return Object(a.useEffect)((function(){var e="test-reminder-".concat(Date.now()),n=s.DateTime.now().plus({minutes:1}).toMillis();ue(e,"test scheduled reminder",n).then((function(){je(e).catch(console.error),t(oe({settingsKey:"supportsNotifications",value:!0}))})).catch((function(){t(oe({settingsKey:"supportsNotifications",value:!1}))}))}),[]),Object(a.useEffect)((function(){"on"===e?(document.body.classList.add("dark-theme"),document.body.classList.remove("light-theme")):"off"===e?(document.body.classList.remove("dark-theme"),document.body.classList.add("light-theme")):(document.body.classList.remove("dark-theme"),document.body.classList.remove("light-theme"))}),[e]),Object(I.jsxs)(d.a,{children:[Object(I.jsx)(We,{darkMode:e}),Object(I.jsx)("main",{className:"pb-4",children:Object(I.jsxs)(l.c,{children:[Object(I.jsx)(l.a,{path:"/",exact:!0,children:Object(I.jsx)(Me,{})}),Object(I.jsx)(l.a,{path:"/settings",exact:!0,children:Object(I.jsx)(De,{})})]})}),Object(I.jsx)("footer",{className:"".concat(j.a.footer," bg-light"),children:Object(I.jsx)(_e.a,{children:Object(I.jsx)(E,{})})})]})},Pe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function qe(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var Ke=n(59),Be=n(12),Fe=n(21),Ue=n(60),ze=n.n(Ue),Je=Object(Be.c)({todos:D()($,{limit:1}),settings:de}),Ve={key:"root",version:1,storage:ze()("TodoDB")},Ye=Object(Fe.g)(Ve,Je),He=Object(L.a)({reducer:Ye,middleware:function(e){return e({serializableCheck:{ignoredActions:[Fe.a,Fe.f,Fe.b,Fe.c,Fe.d,Fe.e]}})}}),Ze=Object(Fe.h)(He);c.a.render(Object(I.jsx)(i.a.StrictMode,{children:Object(I.jsx)(r.a,{store:He,children:Object(I.jsx)(Ke.a,{loading:null,persistor:Ze,children:Object(I.jsx)(Ae,{})})})}),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/pwa-todo",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/pwa-todo","/service-worker.js");Pe?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):qe(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):qe(t,e)}))}}(),"standalone"in navigator&&(fetch("manifest.json").then((function(e){return e.text()})).then((function(e){document.querySelector('link[rel="manifest"]').href="data:application/manifest+json;charset=utf-8,".concat(e)})).catch(console.error),fetch("logo180.png").then((function(e){return e.blob()})).then((function(e){var t=new FileReader;t.onload=function(){document.querySelector('link[rel="apple-touch-icon"]').href=t.result},t.readAsDataURL(e)})).catch(console.error))}},[[84,1,2]]]);
//# sourceMappingURL=main.05ef2e9f.chunk.js.map