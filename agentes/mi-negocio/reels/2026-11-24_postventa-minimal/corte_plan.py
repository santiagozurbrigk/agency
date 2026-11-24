# Postventa (3 a 8 tickets cada 100 pedidos): plano general de frente, Manu chico.
import numpy as np, subprocess, json, os
SR=16000; T0=1130.0; A0=1135.0
raw=subprocess.run(["ffmpeg","-v","error","-ss",str(T0),"-t","80","-i","src/audio.wav","-ac","1","-ar",str(SR),"-f","s16le","-"],capture_output=True).stdout
x=np.frombuffer(raw,dtype=np.int16).astype(np.float32)/32768
hop=int(SR*0.01); rms=np.sqrt(np.convolve(x**2,np.ones(hop*3)/(hop*3),'same')[::hop])+1e-9
db=20*np.log10(rms); thr=np.percentile(db,10)+12
EXTRA=[0]
loud=lambda t: db[max(0,min(int((t-T0)*100),len(db)-1))]>thr+EXTRA[0]
def take(a,b,minp=0.6,maxp=0.35,keep=0.12,pad=True):
    s,e=a,b
    if pad:
        while s-0.01>a-0.25 and loud(s-0.01): s-=0.01
        while e+0.01<b+0.25 and loud(e+0.01): e+=0.01
        s-=0.05; e+=0.08
    cuts=[];t=s;rs=None
    while t<e:
        if not loud(t):
            if rs is None: rs=t
        else:
            if rs is not None and t-rs>=maxp: cuts.append((rs+keep,t-keep))
            rs=None
        t+=0.01
    pcs=[];cur=s
    for p,q in cuts: pcs.append([cur,p]); cur=q
    pcs.append([cur,e])
    i=0
    while i<len(pcs):
        if pcs[i][1]-pcs[i][0]<minp and len(pcs)>1:
            j=i+1 if i+1<len(pcs) else i-1
            lo,hi=min(i,j),max(i,j); pcs[lo:hi+1]=[[pcs[lo][0],pcs[hi][1]]]; i=0; continue
        i+=1
    return [[round(p,3),round(q,3)] for p,q in pcs]
# (a, b, pad) en tiempo del audio; los empalmes de palabra a palabra van sin "pad"
T=[(1138.95,1142.20,False),(1143.22,1144.02,False),        # de cada 100 personas 3 a 8 tickets · de contacto
   (1151.80,1154.25,'S'),                                 # 3 es, vamos a decirle, élite y
   (1157.35,1163.00,'S'),                                 # 8 vamos a decirle que es mucho, o sea que es como pobre
   (1166.0,1174.85,True),                                 # si tenemos de cada 100 pedidos ... cuello de botella
   (1195.66,1196.12,False),(1197.12,1198.48,False),       # la mitad nos · va a preguntar dónde está nuestro pedido
   (1188.44,1189.96,False),                               # dónde está mi código de seguimiento
   (1198.56,1204.80,'S')]                                # es importante tener un buen sistema de postventa...
subs=[]
for a,b,p in T:
    EXTRA[0]=9 if p=='S' else 0
    subs+= take(a,b,pad=(p is True))
json.dump(subs,open('pv_plan.json','w'))
tot=sum(q-p for p,q in subs); print(len(subs),"piezas",round(tot,2),"s")
