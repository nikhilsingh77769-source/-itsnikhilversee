(() => {
  const dialog=document.querySelector('#pocketDrive'),canvas=document.querySelector('#driveCanvas'),ctx=canvas.getContext('2d');
  const start=document.querySelector('#driveStart'),message=document.querySelector('#driveMessage'),distance=document.querySelector('#driveDistance'),fuelFill=document.querySelector('#driveFuel'),fuelLabel=document.querySelector('#driveFuelLabel');
  const key='nikhil.little-detour.best.v1';
  let best=0,frame=0,trigger=null,width=480,height=270,last=0;
  try{best=Number(localStorage.getItem(key))||0}catch{}
  let state={phase:'idle',lane:1,x:.5,fuel:75,km:0,elapsed:0,spawn:0,items:[],bump:0,pickups:0};
  const lanes=()=>[width*.37,width*.5,width*.63];
  const rounded=(x,y,w,h,r,fill,stroke)=>{ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}};
  const fuelIcon=(x,y)=>{rounded(x-7,y-8,12,17,1,'#d9eaf0','#537b91');ctx.fillStyle='#537b91';ctx.fillRect(x-5,y-5,8,5);ctx.fillRect(x-8,y+9,16,2);ctx.strokeStyle='#537b91';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x+5,y-4);ctx.lineTo(x+10,y);ctx.lineTo(x+10,y+8);ctx.quadraticCurveTo(x+8,y+11,x+7,y+6);ctx.stroke()};
  const cone=(x,y)=>{ctx.fillStyle='#9b8671';ctx.beginPath();ctx.moveTo(x,y-11);ctx.lineTo(x-8,y+7);ctx.lineTo(x+8,y+7);ctx.closePath();ctx.fill();ctx.fillStyle='#ece8db';ctx.fillRect(x-4,y-1,8,3);rounded(x-10,y+7,20,3,1,'#6b7780')};
  const tree=(x,y,s=1)=>{ctx.fillStyle='#8da4ab';ctx.fillRect(x-1,y+7*s,2,6*s);ctx.beginPath();ctx.moveTo(x,y-11*s);ctx.lineTo(x-8*s,y+9*s);ctx.lineTo(x+8*s,y+9*s);ctx.closePath();ctx.fill();ctx.fillStyle='#a9bdc2';ctx.beginPath();ctx.moveTo(x,y-13*s);ctx.lineTo(x-6*s,y+1*s);ctx.lineTo(x+6*s,y+1*s);ctx.fill()};
  const car=(x,y)=>{ctx.save();ctx.translate(x,y);const scale=Math.min(1,width/360);ctx.scale(scale,scale);if(state.bump>0)ctx.translate(Math.sin(state.bump*45)*3,0);rounded(-18,-16,5,11,1,'#233947');rounded(13,-16,5,11,1,'#233947');rounded(-18,12,5,11,1,'#233947');rounded(13,12,5,11,1,'#233947');rounded(-14,-28,28,56,6,'#263a48','#b6cbd5');rounded(-11,-17,22,12,3,'#9bb5c3');rounded(-10,11,20,8,2,'#778f9d');ctx.fillStyle='#d8d9c2';ctx.fillRect(-11,-25,6,3);ctx.fillRect(5,-25,6,3);ctx.fillStyle='#9a6862';ctx.fillRect(-11,23,6,2);ctx.fillRect(5,23,6,2);ctx.strokeStyle='#597483';ctx.beginPath();ctx.moveTo(-10,-1);ctx.lineTo(-10,9);ctx.moveTo(10,-1);ctx.lineTo(10,9);ctx.stroke();ctx.restore()};
  const draw=()=>{
    ctx.clearRect(0,0,width,height);ctx.fillStyle='#ccd9de';ctx.fillRect(0,0,width,height);
    const roadLeft=width*.29,roadWidth=width*.42,offset=state.km*400;
    ctx.fillStyle='#6d8391';ctx.fillRect(roadLeft,0,roadWidth,height);ctx.fillStyle='#d8e1e0';ctx.fillRect(roadLeft+4,0,2,height);ctx.fillRect(roadLeft+roadWidth-6,0,2,height);
    ctx.strokeStyle='#bbcbd0';ctx.lineWidth=1;ctx.setLineDash([12,15]);ctx.lineDashOffset=-offset%27;for(const x of [width*.435,width*.565]){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke()}ctx.setLineDash([]);
    for(let i=-1;i<6;i++){const y=((i*75+offset*.55)%(height+90)+height+90)%(height+90)-40;tree(width*.16,y,.8);tree(width*.84,y+28,1)}
    for(const item of state.items){const x=lanes()[item.lane];if(item.type==='fuel')fuelIcon(x,item.y);else cone(x,item.y)}car(state.x*width,height*.76);
    if(state.phase==='idle'){fuelIcon(width*.37,height*.27);cone(width*.63,height*.48)}
  };
  const updateUI=()=>{distance.textContent=state.km.toFixed(2);fuelFill.style.width=`${Math.max(0,state.fuel)}%`;fuelLabel.setAttribute('aria-valuenow',String(Math.round(state.fuel)));document.querySelector('#driveBest').textContent=`${best.toFixed(2)} KM`};
  const finish=()=>{state.phase='finished';cancelAnimationFrame(frame);if(state.km>best){best=state.km;try{localStorage.setItem(key,String(best))}catch{}}message.textContent=state.fuel<=0?'Out of fuel. Luckily, this one has a restart.':`${state.km.toFixed(2)} km. See? The longer way is better.`;start.textContent='One more spin?';start.hidden=false;updateUI()};
  const tick=now=>{
    if(!dialog.open||state.phase!=='driving')return;
    const dt=Math.min((now-last)/1000,.05);last=now;state.elapsed+=dt;state.km+=dt*.042;state.fuel-=dt*3.3;state.bump=Math.max(0,state.bump-dt);state.x+=(lanes()[state.lane]/width-state.x)*Math.min(1,dt*13);state.spawn+=dt;
    if(state.spawn>=1.7){state.spawn=0;const count=Math.floor(state.elapsed/1.7);state.items.push({type:count%3===0?'cone':'fuel',lane:count%3,y:-20,passed:false})}
    const playerY=height*.76;
    for(const item of state.items){item.y+=dt*height*.53;if(!item.passed&&item.y>playerY-16&&item.y<playerY+24&&Math.abs(lanes()[item.lane]-state.x*width)<width*.075){item.passed=true;if(item.type==='fuel'){state.fuel=Math.min(100,state.fuel+23);state.pickups++;message.textContent=['Fuelled up. Long way home?','One more song. Plenty of petrol.','Good catch. Keep rolling.'][state.pickups%3];item.y=height+50}else{state.fuel-=12;state.bump=.5;message.textContent='A tiny bump. We carry on.';item.y=height+50}}}
    state.items=state.items.filter(item=>item.y<height+40);updateUI();draw();if(state.elapsed>=22||state.fuel<=0){finish();return}frame=requestAnimationFrame(tick);
  };
  const steer=direction=>{if(state.phase==='driving')state.lane=Math.max(0,Math.min(2,state.lane+direction))};
  const resize=()=>{const r=canvas.getBoundingClientRect();if(!r.width)return;width=r.width;height=r.height;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=width*ratio;canvas.height=height*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);draw()};
  const reset=()=>{cancelAnimationFrame(frame);state={phase:'idle',lane:1,x:.5,fuel:75,km:0,elapsed:0,spawn:0,items:[],bump:0,pickups:0};message.textContent='No rush. Just a little detour.';start.hidden=false;start.textContent='Let’s drive';updateUI();resize()};
  start.addEventListener('click',()=>{reset();state.phase='driving';start.hidden=true;message.textContent='Grab the fuel. Miss the cones. Take it easy.';last=performance.now();frame=requestAnimationFrame(tick)});
  document.querySelectorAll('[data-play-drive]').forEach(button=>button.addEventListener('click',()=>{trigger=button;document.body.classList.add('locked');dialog.showModal();reset()}));
  document.querySelector('.drive-close').addEventListener('click',()=>dialog.close());document.querySelector('[data-steer="left"]').addEventListener('click',()=>steer(-1));document.querySelector('[data-steer="right"]').addEventListener('click',()=>steer(1));
  document.addEventListener('keydown',event=>{if(!dialog.open)return;if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();steer(event.key==='ArrowLeft'?-1:1)}if(event.code==='Space'&&event.target!==start&&state.phase!=='driving'){event.preventDefault();start.click()}});
  let touchStart=0;canvas.addEventListener('pointerdown',event=>{touchStart=event.clientX});canvas.addEventListener('pointerup',event=>{const delta=event.clientX-touchStart;if(Math.abs(delta)>12)steer(delta<0?-1:1);else steer(event.offsetX<width/2?-1:1)});
  dialog.addEventListener('close',()=>{cancelAnimationFrame(frame);document.body.classList.remove('locked');trigger?.focus({preventScroll:true})});dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
  new ResizeObserver(resize).observe(canvas);
})();
