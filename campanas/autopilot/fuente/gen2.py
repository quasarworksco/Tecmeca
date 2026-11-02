import re
ads=open('ads/ads.html').read()
css=re.search(r'<style>(.*?)</style>',ads,re.S).group(1)
defs=re.search(r'(<svg width="0" height="0" style="position:absolute">.*?</svg>)',ads,re.S).group(1)
extra='''<symbol id="key" viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="4.5"/><path d="m10.7 12.3 9.3-9.3M17 6l3 3M14 9l2 2"/></symbol>
<symbol id="leaf" viewBox="0 0 24 24"><path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15"/><path d="M5 19 13 11"/></symbol>
<symbol id="chat" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/></symbol>
<symbol id="phone" viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></symbol>
<symbol id="warn" viewBox="0 0 24 24"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/></symbol>
<symbol id="bolt" viewBox="0 0 24 24"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></symbol>'''
defs=defs.replace('</svg>',extra+'</svg>')
qr=open('posts2/qr.txt').read()
css+='''
/* ---------- set 2 ---------- */
.ph{position:absolute;left:0;right:0;top:0;height:690px;overflow:hidden}
.ph img{width:100%;height:100%;object-fit:cover}
.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55),transparent 32%,transparent 70%,rgba(247,246,243,.0))}
.cp .top svg use{}
.cp .tag{background:rgba(255,255,255,.92)}
.pcopy{position:absolute;left:70px;right:70px;top:730px;z-index:3;display:grid;gap:18px}
.pcopy h1{font-size:96px}
.pcopy .lead{font-size:30px}
.badge{position:absolute;left:70px;top:610px;z-index:4;display:inline-flex;align-items:center;gap:12px;padding:16px 24px;border-radius:16px;background:var(--red);color:#fff;font:900 26px Saira;text-transform:uppercase;letter-spacing:.03em;box-shadow:0 18px 36px -18px rgba(0,0,0,.6)}
.badge svg{width:30px;height:30px}
.gcopy{position:absolute;left:70px;right:70px;top:210px;z-index:3;display:grid;gap:22px}
.gcopy h1{font-size:104px}
.big{position:absolute;left:50%;transform:translateX(-50%);top:640px;width:300px;height:300px;border-radius:50%;background:#fff;border:3px solid #e4e4e7;display:grid;place-items:center;z-index:3;box-shadow:0 30px 60px -30px rgba(0,0,0,.35)}
.big i{width:200px;height:200px;border-radius:50%;background:var(--red);display:grid;place-items:center;color:#fff}
.big svg{width:110px;height:110px}
.chips2{position:absolute;left:70px;right:70px;top:990px;z-index:3;display:flex;flex-wrap:wrap;justify-content:center;gap:14px}
.chips2 span{display:inline-flex;align-items:center;gap:10px;padding:16px 22px;border-radius:16px;background:#fff;border:2px solid #e4e4e7;font:800 25px Saira;text-transform:uppercase;box-shadow:0 8px 20px -14px rgba(0,0,0,.3)}
.chips2 svg{width:26px;height:26px;color:var(--red)}
.nlist{position:absolute;left:70px;right:70px;top:580px;z-index:3;display:grid;gap:14px}
.nlist div{display:flex;align-items:center;gap:22px;padding:24px 28px;border-radius:20px;background:#fff;border:2px solid #e4e4e7;box-shadow:0 10px 24px -16px rgba(0,0,0,.3)}
.nlist b{flex:none;width:62px;height:62px;border-radius:16px;display:grid;place-items:center;background:var(--red);color:#fff;font:900 italic 34px Saira}
.nlist strong{display:block;font:800 29px/1.15 Saira;text-transform:uppercase}
.nlist span{display:block;margin-top:4px;font:500 22px/1.3 Inter;color:#52525b}
.bgrid{position:absolute;left:70px;right:70px;top:580px;z-index:3;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.bgrid div{display:flex;align-items:center;justify-content:center;gap:14px;height:104px;border-radius:20px;background:#fff;border:2px solid #e4e4e7;color:#27272a;box-shadow:0 8px 20px -16px rgba(0,0,0,.3)}
.bgrid svg{width:44px;height:44px;flex:none}
.bgrid svg.wide{width:66px;transform:scale(1.35)}
.bgrid span{font:800 italic 26px Saira;text-transform:uppercase}
.bgrid .w2{grid-column:span 2}
.steps3{position:absolute;left:70px;right:70px;top:570px;z-index:3;display:grid;gap:18px}
.steps3 div{display:grid;grid-template-columns:110px 1fr;align-items:center;gap:26px;padding:26px 30px;border-radius:24px;background:#fff;border:2px solid #e4e4e7;box-shadow:0 10px 24px -16px rgba(0,0,0,.3)}
.steps3 i{width:110px;height:110px;border-radius:28px;display:grid;place-items:center;background:rgba(238,51,34,.1);color:var(--red);position:relative}
.steps3 i svg{width:54px;height:54px}
.steps3 i b{position:absolute;top:-10px;left:-10px;width:44px;height:44px;border-radius:50%;background:var(--red);color:#fff;display:grid;place-items:center;font:900 22px Saira}
.steps3 strong{display:block;font:900 34px/1.1 Saira;text-transform:uppercase}
.steps3 span{display:block;margin-top:6px;font:500 24px/1.3 Inter;color:#52525b}
.langs{position:absolute;left:70px;right:70px;top:590px;z-index:3;display:grid;grid-template-columns:1fr 1fr;gap:20px}
.langs div{border-radius:28px;background:#fff;border:2px solid #e4e4e7;padding:40px 34px;display:grid;gap:14px;box-shadow:0 14px 30px -20px rgba(0,0,0,.35)}
.langs div:last-child{background:var(--ink);border-color:var(--ink);color:#fff}
.langs small{font:700 20px "JetBrains Mono";letter-spacing:.2em;color:var(--red)}
.langs strong{font:900 italic 64px/1 Saira;text-transform:uppercase}
.langs span{font:500 24px/1.35 Inter;color:inherit;opacity:.8}
.callbox{position:absolute;left:70px;right:70px;top:590px;z-index:3;display:grid;grid-template-columns:1fr 300px;gap:24px;align-items:center;padding:40px;border-radius:30px;background:var(--red);color:#fff;box-shadow:0 30px 60px -30px rgba(238,51,34,.8)}
.callbox small{font:800 22px Saira;letter-spacing:.14em;text-transform:uppercase}
.callbox strong{display:block;margin:10px 0 18px;font:900 italic 74px/1 Saira;white-space:nowrap}
.callbox .via{display:flex;flex-wrap:wrap;gap:10px}
.callbox .via span{display:inline-flex;align-items:center;gap:8px;padding:10px 16px;border-radius:999px;background:rgba(255,255,255,.16);font:700 21px Inter}
.callbox .via svg{width:22px;height:22px}
.qrbox{width:300px;height:300px;padding:20px;border-radius:22px;background:#fff}
.qrsvg{width:100%;height:100%;display:block}
.qrcap{position:absolute;right:70px;top:1000px;width:300px;text-align:center;font:700 18px "JetBrains Mono";letter-spacing:.14em;text-transform:uppercase;color:#52525b;z-index:3}
'''
B=['ford','chevrolet','ram','jeep','chrysler','toyota','honda','nissan','mitsubishi','hyundai','kia']
L={'es':dict(tag='Servicio móvil',btn='Agenda hoy',sub='tecmecatx.com · Llama, texto o WhatsApp',cal='Agenda hoy'),
   'en':dict(tag='Mobile service',btn='Book today',sub='tecmecatx.com · Call, text or WhatsApp',cal='Book today')}
def top(l,photo=False):
    logo='#logo' if photo else '#logo-dark'
    return f'<div class="top"><svg viewBox="0 0 330 84"><use href="{logo}"/></svg><span class="tag"><i></i>{L[l]["tag"]}</span></div>'
def cta(l):
    return f'<div class="cta"><span class="btn"><svg class="ic"><use href="#cal"/></svg>{L[l]["btn"]}</span><div class="contact"><b><svg><use href="#wa"/></svg>(214) 930-7707</b><small>{L[l]["sub"]}</small></div></div>'
def ic(n): return f'<svg class="ic"><use href="#{n}"/></svg>'
def sec(pid,body,cls='post'): return f'<section class="{cls}" id="{pid}"><div class="grid"></div>{body}</section>\n'
def photo(pid,l,img,badge,bicon,kicker,h1,lead,pos='center'):
    return sec(pid,f'<div class="ph"><img src="{img}.jpg" style="object-position:{pos}"></div>{top(l,True)}<div class="badge">{ic(bicon)}{badge}</div><div class="pcopy"><span class="kicker">{kicker}</span><h1>{h1}</h1><p class="lead" style="margin:0">{lead}</p></div>{cta(l)}','post cp')
def icon(pid,l,i,kicker,h1,lead,chips):
    ch=''.join(f'<span>{ic(a)}{b}</span>' for a,b in chips)
    return sec(pid,f'{top(l)}<div class="gcopy"><span class="kicker">{kicker}</span><h1>{h1}</h1><p class="lead" style="margin:0">{lead}</p></div><div class="big"><i>{ic(i)}</i></div><div class="chips2">{ch}</div>{cta(l)}')
def nlist(pid,l,kicker,h1,items,lead=''):
    it=''.join(f'<div><b>{k+1}</b><p style="margin:0"><strong>{a}</strong><span>{b}</span></p></div>' for k,(a,b) in enumerate(items))
    return sec(pid,f'{top(l)}<div class="gcopy"><span class="kicker">{kicker}</span><h1>{h1}</h1>{lead}</div><div class="nlist">{it}</div>{cta(l)}')
def brands(pid,l,kicker,h1,more):
    names={'ford':'Ford','chevrolet':'Chevrolet','ram':'Dodge · Ram','jeep':'Jeep','chrysler':'Chrysler','toyota':'Toyota','honda':'Honda','nissan':'Nissan','mitsubishi':'Mitsubishi','hyundai':'Hyundai','kia':'Kia'}
    t=''.join(f'<div{" class=w2" if k=="ram" else ""}><svg{" class=wide" if k=="chrysler" else ""}><use href="#b-{k}"/></svg><span>{names[k]}</span></div>' for k in B if k!='ram')
    t=f'<div class="w2"><svg><use href="#b-ram"/></svg><span>Dodge · Ram</span></div>'+t
    return sec(pid,f'{top(l)}<div class="gcopy"><span class="kicker">{kicker}</span><h1>{h1}</h1></div><div class="bgrid">{t}</div>{cta(l)}')
def steps(pid,l,kicker,h1,items):
    it=''.join(f'<div><i><b>{k+1}</b>{ic(a)}</i><p style="margin:0"><strong>{b}</strong><span>{c}</span></p></div>' for k,(a,b,c) in enumerate(items))
    return sec(pid,f'{top(l)}<div class="gcopy"><span class="kicker">{kicker}</span><h1>{h1}</h1></div><div class="steps3">{it}</div>{cta(l)}')
def langs(pid,l,kicker,h1,a,b):
    return sec(pid,f'{top(l)}<div class="gcopy"><span class="kicker">{kicker}</span><h1>{h1}</h1></div><div class="langs"><div><small>ESPAÑOL</small><strong>{a[0]}</strong><span>{a[1]}</span></div><div><small>ENGLISH</small><strong>{b[0]}</strong><span>{b[1]}</span></div></div>{cta(l)}')
def callp(pid,l,kicker,h1,small,via,scan):
    v=''.join(f'<span>{s}{t}</span>' for s,t in via)
    return sec(pid,f'{top(l)}<div class="gcopy"><span class="kicker">{kicker}</span><h1>{h1}</h1></div><div class="callbox"><div><small>{small}</small><strong>(214) 930-7707</strong><div class="via">{v}</div></div><div class="qrbox">{qr}</div></div><div class="qrcap" style="top:1010px">{scan}</div>{cta(l)}')
W='<svg style="color:#25d366"><use href="#wa"/></svg>'
P=[]
# 07 laptop diagnostics (photo)
P+= [photo('d07es','es','laptop','Diagnóstico pro','cpu','Escáner · Laptop · Software','Diagnóstico<br><em>profesional.</em>','Conectamos el equipo a tu vehículo y encontramos la falla real.'),
     photo('d07en','en','laptop','Pro diagnostics','cpu','Scanner · Laptop · Software','Professional<br><em>diagnostics.</em>','We plug in pro equipment and find the real problem.')]
# 08 eco tuner (icon)
P+= [icon('d08es','es','leaf','Eco tuner','Gasta menos<br><em>gasolina.</em>','Optimizamos la computadora para que rinda más cada galón.',[('leaf','Menos consumo'),('gauge-i','Mismo desempeño'),('bolt','Respuesta suave')]),
     icon('d08en','en','leaf','Eco tuner','Save on<br><em>fuel.</em>','We tune your ECU to get more out of every gallon.',[('leaf','Lower fuel use'),('gauge-i','Same performance'),('bolt','Smooth response')])]
# 09 mobile service (photo engine1)
P+= [photo('d09es','es','engine1','Vamos a ti','van','Servicio a domicilio','Vamos a<br>donde <em>estés.</em>','En tu casa, tu trabajo o donde se quedó tu vehículo.','center 30%'),
     photo('d09en','en','engine1','We come to you','van','Mobile service','We come<br>to <em>you.</em>','At home, at work or wherever your vehicle stopped.','center 30%')]
# 10 cloning (list)
P+= [nlist('d10es','es','Clonación de computadoras','¿Se dañó tu<br><em>computadora?</em>',[('Leemos la original','Copiamos la información de tu computadora'),('La pasamos a la nueva','La unidad de reemplazo queda igual'),('Sin programar llaves','Tus llaves y módulos siguen funcionando'),('Lista para encender','Probamos todo antes de irnos')]),
     nlist('d10en','en','ECU cloning','Computer<br><em>went bad?</em>',[('We read the original','We copy your computer’s data'),('Move it to the new one','The replacement works the same'),('No key reprogramming','Keys and modules keep working'),('Ready to start','We test everything before we leave')])]
# 11 diesel tips (photo cummins)
P+= [photo('d11es','es','cummins','Especialistas diésel','drop','Diésel · DEF · EGR','Expertos en<br><em>diésel.</em>','DEF/AdBlue, SCR, EGR y sensores NOx en tu camioneta.'),
     photo('d11en','en','cummins','Diesel specialists','drop','Diesel · DEF · EGR','Diesel<br><em>experts.</em>','DEF/AdBlue, SCR, EGR and NOx sensors on your truck.')]
# 12 immo off & keys (icon)
P+= [icon('d12es','es','key','Inmovilizador · Llaves','¿Tu carro<br>no <em>arranca?</em>','Si el inmovilizador no reconoce tu llave, lo resolvemos.',[('lock','Immo off'),('key','Llaves con chip'),('cpu','Computadora nueva')]),
     icon('d12en','en','key','Immobilizer · Keys','Car won’t<br><em>start?</em>','If the immobilizer won’t recognize your key, we fix it.',[('lock','Immo off'),('key','Chip keys'),('cpu','New computer')])]
# 13 brands
P+= [brands('d13es','es','Marcas','Trabajamos<br>con <em>tu marca.</em>',''),brands('d13en','en','Makes','We work on<br><em>your make.</em>','')]
# 14 signs computer failing (list)
P+= [nlist('d14es','es','Consejos','Señales de<br><em>alerta.</em>',[('No arranca o se apaga','Sin razón aparente'),('Luces en el tablero','Check engine, airbag o ABS'),('Pierde potencia','Tirones o modo de emergencia'),('Cambios bruscos','La transmisión no responde bien')]),
     nlist('d14en','en','Tips','Warning<br><em>signs.</em>',[('Won’t start or stalls','For no clear reason'),('Dashboard lights','Check engine, airbag or ABS'),('Loss of power','Jerking or limp mode'),('Harsh shifting','The transmission acts up')])]
# 15 modules (photo engine2)
P+= [photo('d15es','es','engine2','Módulos y ECUs','swap','Cambio de módulos','Instalamos<br>y <em>programamos.</em>','Módulos y computadoras listos para funcionar.','center 40%'),
     photo('d15en','en','engine2','Modules & ECUs','swap','Module replacement','Installed<br>&amp; <em>programmed.</em>','Modules and computers ready to go.','center 40%')]
# 16 how it works
P+= [steps('d16es','es','Así de fácil','¿Cómo<br><em>funciona?</em>',[('chat','Escríbenos','Llamada, texto o WhatsApp'),('van','Vamos a ti','Con todo el equipo'),('check','Listo','Tu vehículo funcionando')]),
     steps('d16en','en','That easy','How it<br><em>works</em>',[('chat','Message us','Call, text or WhatsApp'),('van','We drive to you','With all the equipment'),('check','Done','Your vehicle running')])]
# 17 airbag (icon)
P+= [icon('d17es','es','airbag','Airbag · SRS','¿Luz del<br><em>airbag?</em>','Reseteamos el módulo después de un choque para que el sistema funcione.',[('airbag','Reset de módulo'),('warn','Borrado de choque'),('check','Prueba final')]),
     icon('d17en','en','airbag','Airbag · SRS','Airbag<br><em>light on?</em>','We reset the module after a crash so the system works again.',[('airbag','Module reset'),('warn','Crash data cleared'),('check','Final test')])]
# 18 bilingual
P+= [langs('d18es','es','Atención','Hablamos<br><em>tu idioma.</em>',('Te atendemos','Explicamos todo claro, sin tecnicismos.'),('We speak English','Clear answers, no jargon.')),
     langs('d18en','en','Service','We speak<br><em>your language.</em>',('Te atendemos','Explicamos todo claro, sin tecnicismos.'),('We speak English','Clear answers, no jargon.'))]
# 19 diesel truck (photo superduty)
P+= [photo('d19es','es','superduty','Trocas diésel','bolt','Diésel · Tuning','Tu troca,<br>al <em>100%.</em>','Programación, tuning y sistemas DEF/EGR para camionetas.'),
     photo('d19en','en','superduty','Diesel trucks','bolt','Diesel · Tuning','Your truck<br>at <em>100%.</em>','Programming, tuning and DEF/EGR systems for trucks.')]
# 20 CTA
P+= [callp('d20es','es','Agenda hoy','¿Listo para<br><em>agendar?</em>','Llama o escribe',[(ic('phone'),'Llamada'),(ic('chat'),'Texto'),(W,'WhatsApp')],'Escanea y agenda'),
     callp('d20en','en','Book today','Ready to<br><em>book?</em>','Call or text',[(ic('phone'),'Call'),(ic('chat'),'Text'),(W,'WhatsApp')],'Scan to book')]
html=f'''<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Saira:ital,wght@0,500..900;1,700..900&family=Inter:wght@500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet">
<style>{css}</style></head><body>{defs}{"".join(P)}</body></html>'''
open('posts2/posts2.html','w').write(html)
print(len(P))
