import json,subprocess,os
A0=1135.0; TMP="tmp_pv/v"; os.makedirs(TMP,exist_ok=True); os.makedirs("out_pv",exist_ok=True)
subs=json.load(open("pv_plan.json"))
def run(c):
    r=subprocess.run(c,capture_output=True,text=True)
    if r.returncode: raise Exception(r.stderr[-1500:])
parts=[];cortes=[];acc=0.0;mapa=[]
for n,(a,b) in enumerate(subs):
    d=round((b-a)*25)/25; t=a-A0
    af=f"[1:a]aresample=48000,afade=t=in:d=0.02,afade=t=out:st={d-0.04:.3f}:d=0.04,apad,atrim=duration={d:.3f}[a]"
    vf="[0:v]fps=25,crop=1080:1080:440:0,setsar=1,format=yuv420p[v]"
    o=f"{TMP}/p{n:03d}.mkv"
    run(["ffmpeg","-v","error","-y","-ss",f"{t:.3f}","-t",f"{d:.3f}","-i","tmp_pv/Ff_c1.mp4","-ss",f"{a:.3f}","-t",f"{d:.3f}","-i","src/audio.wav",
         "-filter_complex",vf+";"+af,"-map","[v]","-map","[a]","-frames:v",str(int(round(d*25))),"-c:v","libx264","-preset","veryfast","-crf","15","-pix_fmt","yuv420p","-r","25","-c:a","pcm_s16le",o])
    parts.append(o); mapa.append([a,b,acc]); acc+=d; cortes.append(round(acc,3))
open(f"{TMP}/l.txt","w").write("".join(f"file '{os.path.abspath(x)}'\n" for x in parts))
run(["ffmpeg","-v","error","-y","-f","concat","-safe","0","-i",f"{TMP}/l.txt","-filter_complex","[0:a]loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]",
     "-map","0:v","-map","[a]","-c:v","libx264","-preset","medium","-crf","17","-pix_fmt","yuv420p","-r","30","-c:a","aac","-b:a","192k","out_pv/cam.mp4"])
# palabras en tiempo del video editado
W=[w for s in json.load(open("transcript.json")) for w in s["words"]]
pal=[]
for a,b,o in mapa:
    for w in W:
        m=(w["s"]+w["e"])/2
        if a<=m<b: pal.append({"w":w["w"].strip(),"s":round(o+max(w["s"],a)-a,3),"e":round(o+min(w["e"],b)-a,3)})
json.dump({"palabras":pal,"cortes":cortes[:-1],"dur":round(acc,3)},open("out_pv/meta.json","w"),ensure_ascii=False)
print(round(acc,2)); print(" ".join(f"{w['w']}@{w['s']:.2f}" for w in pal))
