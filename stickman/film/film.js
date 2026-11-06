// THE TIME LOCK - 8 min stickman film (2D)
const FPS=30, DUR=480;
const DOOR={L:2170,R:2470,T:130,B:640,C:2320},XA=-900,XB=3700,FLOOR0=642;
const cafeScale=y=>lerp(.55,.82,(y-642)/(868-642));
const GY=930, KERB=778;
const HERO_POS=[440,600], TOOL_POS=[1500,760], WINDOW_POS=[2600,400];
const inW=makeWalk({pts:[[2320,642],[2100,700],[1600,780],[1200,800]],t0:2.0,t1:8.0,steps:8,scale:cafeScale});
const outW=makeWalk({pts:[[440,600],[700,700],[1100,780],[1500,800]],t0:8.5,t1:14.5,steps:8,scale:cafeScale});
const returnW=makeWalk({pts:[[1500,800],[1100,780],[700,700],[440,600]],t0:38.0,t1:44.0,steps:8,scale:cafeScale});

function hero(t){
  const p={x:HERO_POS[0],y:HERO_POS[1],s:.86,face:1,noLegs:true,breath:t*2.1,
    look:kf(t,[[0,.55],[2.5,.55],[3.0,.9],[7.5,.9],[8.0,.55],[8.5,.55],[14.0,.55],[38.0,.55],[44.0,.55]]),
    tilt:0.05,blink:blinkAt(t,[1.5,4.2,8.5,12,20,28,36,44]),hands:{},tuck:{r:true}};
  return p;
}
function stranger(t){
  const w=inW.at(t);
  const p={x:w.c[0],y:standY(w.c[1],w.s),s:w.s,face:-1,breath:t*2,look:kf(t,[[0,0],[5,0],[5.5,-0.7]]),time:t};
  return walkPose(p,w);
}
function heroWalk(t){
  const w=outW.at(t);
  const p={x:w.c[0],y:standY(w.c[1],w.s),s:w.s,face:1,breath:t*2.1,look:0.5,time:t};
  return walkPose(p,w);
}
function heroReturn(t){
  const w=returnW.at(t);
  const p={x:w.c[0],y:standY(w.c[1],w.s),s:w.s,face:1,breath:t*2.1,look:-0.3,time:t};
  return walkPose(p,w);
}

FILM={
  dur:DUR,
  cuts:[0,90,270,480,720,1200,1800,2400,3000,3600,4200,4380,480],
  cam(s,u,t){
    const cams=[
      {x:600,y:550,z:1.8,b:[10,5,0]},
      {x:1800,y:600,z:0.7,b:[3,0.6,0]},
      {x:1200,y:600,z:0.8,b:[4,0.8,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]},
      {x:1500,y:620,z:0.9,b:[5,1,0]}
    ];
    return cams[s]||cams[0];
  },
  draw(t,cam,s,u){
    const open=ease(seg(t,2.0,3.0));
    let x=layer('out',cam,0.6);
    cafeOutside(x); camT(x,cam,1); cafeRain(x,t);
    x=layer('wall',cam); cafeWall(x); cafeFloor(x);
    const act=layer('act',cam);
    doorLight(act,open,0);
    const hp=hero(t);
    actor(act,'hero',HERO,hp,cam);
    if(t>1.8){const sp=stranger(t);actor(act,'stranger',STRANGER,sp,cam);}
    if(t>8.5&&t<15){const wp=heroWalk(t);actor(act,'hero',HERO,wp,cam);}
    if(t>38&&t<45){const rp=heroReturn(t);actor(act,'hero',HERO,rp,cam);}
    const d=layer('door',cam);
    doorLeaf(d,open*2.02,kf(t,[[1.0,0],[1.8,0.75],[2.0,0]]));
    const fg=layer('fg',cam);
    sideTable(fg,340,900,830); saucer(fg,CUP[0],CUP[1],0.86); drawCup(fg,CUP[0],CUP[1],0.86);
    comp([['out',cam.b[0]]]);
    cafeRefl(open,cam);
    blit(ctx,L.wall,cam.b[1]);
    blit(ctx,L.door,cam.b[1]*0.7);
    blit(ctx,L.act,0);
    blit(ctx,L.fg,0);
  },
  plants(){return{hero:[],stranger:inW.plants()};}
};
say(2.0,'door');
say(3.0,'doorstop');