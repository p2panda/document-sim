"use strict";(self.webpackChunknama_document_sim=self.webpackChunknama_document_sim||[]).push([[376],{4376:(e,t,n)=>{n.r(t),n.d(t,{nama_peer:()=>a});var i=n(729);const a=class{constructor(e){(0,i.r)(this,e),this.namaSend=(0,i.c)(this,"namaSend",7),this.namaChange=(0,i.c)(this,"namaChange",7),this.namaCaps=(0,i.c)(this,"namaCaps",7),this.pruneBefore=1e4,this.from=0,this.to=0,this.queue=new Array,this.namaDoc=null,this.author="noname",this.latency=0,this.interval=1e3,this.owner=!1,this.online=!0}handleOnSend(e){const{peer:t,latency:n,operations:i}=e.detail;this.author!==t&&this.online&&setTimeout((()=>{for(const e of i)this.queue.includes(e)||this.queue.push(e)}),this.latency+n)}handlePruneConfig(e){const{depth:t,ms:n,depthPerLog:i}=e.detail;this.pruneDepth=t,this.pruneDepthPerLog=i,this.pruneBefore=n}handleCaps(e){const{author:t,from:n,to:i}=e.detail;t===this.author&&(this.from=n,this.to=i)}prune(){let e=[];return this.pruneDepth&&this.namaDoc.pruneBeforeDepth(this.pruneDepth).forEach((t=>{e=e.concat(t)})),this.pruneDepthPerLog&&this.namaDoc.pruneBeforeDepthPerLog(this.pruneDepthPerLog).forEach((t=>{e=e.concat(t)})),this.pruneBefore&&this.namaDoc.pruneBeforeTimestamp((new Date).getTime()-this.pruneBefore).forEach((t=>{e=e.concat(t)})),e}run(){if(!this.namaDoc)return;let e=!1;const t=(new Date).getTime();if(t>=this.nextPublishAt){const n=(new Date).getTime();if(this.from<=n&&this.to>=n||this.owner){if(this.namaDoc.create(this.author,n),this.online){const e=this.namaDoc.operations();this.namaSend.emit({peer:this.author,latency:this.latency,operations:e})}e=!0,this.nextPublishAt=t+this.interval}}for(const t of this.queue)0==this.namaDoc.add(t).length&&(e=!0);if(this.queue=[],e){const e=this.namaDoc.operations(),t=this.prune();this.namaChange.emit({peer:this.author,operations:e,pruned:t})}}componentWillRender(){this.nextPublishAt=(new Date).getTime()+this.interval}componentWillUpdate(){clearInterval(this.intervalID),this.intervalID=null}componentDidUpdate(){this.intervalID=setInterval(this.run.bind(this),100)}render(){return(0,i.h)(i.H,{key:"1b4e49116031437608e6ee13e85dff980b1e71ac"},(0,i.h)("div",{key:"425670e4b772578e9aab4267c1a7694e371ea56a",id:"wrapper"},(0,i.h)("h2",{key:"7c3263fc56a44b03b0c8ee57c630a2b62360a5a6",class:this.owner?"owner":""},this.author),(0,i.h)("nama-peer-controls",{key:"6fe6c3b3e0025acdfb63a523dfdd723f305e368e",online:this.online,latency:this.latency,frequency:this.interval,setOnline:e=>this.online=e,setLatency:e=>this.latency=e,setFrequency:e=>this.interval=e})))}get el(){return(0,i.g)(this)}};a.style=":host{display:block}#wrapper{display:flex;flex-direction:column;align-items:center;height:100%;width:100%}.owner{text-decoration:underline}"}}]);