import json,os
from PIL import Image
OUT='/home/user/adv-dgp-/contenido/autopilot/tecmeca/'
F='/home/user/Tecmeca/campanas/facebook/'; P2='posts2/'
def jpg(src,dst):
    im=Image.open(src).convert('RGB')
    if abs(im.width/im.height-0.8)>0.01:
        h=1350; w=round(im.width*h/im.height); im=im.resize((w,h),Image.LANCZOS)
        bg=Image.new('RGB',(1080,1350),(247,246,243)); bg.paste(im,((1080-w)//2,0)); im=bg
    else: im=im.resize((1080,1350),Image.LANCZOS)
    im.save(OUT+dst,quality=90,optimize=True)
W='👉 https://tecmecatx.com/'
TEL='📞 Llamada, texto o WhatsApp: (214) 930-7707'
cred={'laptop':'Shixart1985','engine1':'Shixart1985','engine2':'Shixart1985','cummins':'Tony Webster','superduty':'Tony Webster'}
def foto(k): return f"\n📷 Foto: {cred[k]} (CC BY 2.0)"
# (slug, titulo, es_src, en_src, texto, photo)
S=[
('diesel-def-egr','¿Tu diésel en modo de emergencia?',F+'07-diesel-def-egr-es.png',F+'08-diesel-def-egr-en.png',
 "🚛 ¿Tu camioneta diésel entró en modo de emergencia o perdió potencia? Diagnosticamos y reparamos sistemas DEF/AdBlue, SCR y EGR: sensores NOx, inyector de DEF, válvula y enfriador EGR, y programación de módulos. Vamos a donde estés.\n"+TEL+"\n"+W+"\n\n🇺🇸 Diesel stuck in limp mode? We diagnose and repair DEF/AdBlue, SCR and EGR systems at your location. Call, text or WhatsApp (214) 930-7707.\n\n#DieselRepair #DEF #AdBlue #EGR #ServicioMovil #Tecmeca",None),
('diagnostico-pro','Diagnóstico profesional',P2+'d07es.png',P2+'d07en.png',
 "🔍 Antes de cambiar piezas, encontramos la falla real. Conectamos escáner, laptop y software profesional a tu vehículo para leer cada módulo y darte un diagnóstico claro.\n"+TEL+"\n"+W+"\n\n🇺🇸 Before replacing parts, we find the real problem with pro scanners and software, right at your location. (214) 930-7707.\n\n#DiagnosticoAutomotriz #CarDiagnostics #MobileMechanic #Tecmeca","laptop"),
('chip-tuning','Más potencia. Más respuesta.',F+'01-chip-tuning-es.png',F+'02-chip-tuning-en.png',
 "🏁 Más potencia, mejor respuesta y un motor que se siente como nuevo. Con chip tuning reprogramamos la computadora de tu vehículo con equipo profesional.\n"+TEL+"\n"+W+"\n\n🇺🇸 More power, sharper response. Chip tuning with pro equipment, done at your location. (214) 930-7707.\n\n#ChipTuning #ECUTune #Performance #Tecmeca",None),
('eco-tuner','Gasta menos gasolina',P2+'d08es.png',P2+'d08en.png',
 "🌱 ¿Sientes que la gasolina no te rinde? Con eco tuner optimizamos la computadora de tu motor para que aproveche mejor cada galón, sin perder desempeño.\n"+TEL+"\n"+W+"\n\n🇺🇸 Save on fuel. Our eco tune optimizes your ECU to get more out of every gallon without losing performance. (214) 930-7707.\n\n#EcoTuner #AhorroDeGasolina #FuelEconomy #Tecmeca",None),
('computadoras','¿Cambiaste la computadora?',F+'03-computadoras-es.png',F+'04-computers-en.png',
 "💻 ¿Cambiaste la computadora de tu carro y no enciende? Programamos y clonamos computadoras (ECU, TCM, BCM), instalamos y configuramos módulos y resolvemos problemas de inmovilizador y llaves. Todo en tu ubicación.\n"+TEL+"\n"+W+"\n\n🇺🇸 Replaced your car's computer? We program and clone ECUs, set up modules and fix immobilizer and key issues at your location. (214) 930-7707.\n\n#ProgramacionECU #ECUProgramming #ECUCloning #Tecmeca",None),
('vamos-a-ti','Vamos a donde estés',P2+'d09es.png',P2+'d09en.png',
 "🚐 No tienes que llevar tu vehículo a ningún taller. Llevamos el equipo a tu casa, tu trabajo o donde se quedó tu carro, y trabajamos ahí mismo.\n"+TEL+"\n"+W+"\n\n🇺🇸 No need to tow it anywhere. We bring the equipment to your home, work or wherever your vehicle stopped. (214) 930-7707.\n\n#ServicioMovil #MobileMechanic #ServicioADomicilio #Tecmeca","engine1"),
('luces-airbag','¿Se encendió esta luz?',F+'05-luces-airbag-es.png',F+'06-warning-lights-en.png',
 "🚨 ¿Se encendió el check engine o la luz del airbag? Leemos y eliminamos códigos de falla, reseteamos módulos de airbag y te explicamos qué tiene tu vehículo. Ford, Chevrolet, Dodge · Ram, Jeep, Chrysler, Toyota, Honda, Nissan, Mitsubishi, Hyundai y Kia.\n"+TEL+"\n"+W+"\n\n🇺🇸 Check engine or airbag light on? We read and clear fault codes and reset airbag modules at your location. (214) 930-7707.\n\n#CheckEngine #Airbag #Diagnostico #Tecmeca",None),
('clonacion','¿Se dañó tu computadora?',P2+'d10es.png',P2+'d10en.png',
 "🔁 Si la computadora de tu vehículo se dañó, la clonamos: copiamos la información de la original a la unidad de reemplazo para que funcione igual, sin reprogramar llaves ni módulos.\n"+TEL+"\n"+W+"\n\n🇺🇸 Computer went bad? We clone your original ECU onto the replacement so it works the same, no key reprogramming needed. (214) 930-7707.\n\n#ClonacionECU #ECUCloning #ModuloAutomotriz #Tecmeca",None),
('expertos-diesel','Expertos en diésel',P2+'d11es.png',P2+'d11en.png',
 "🛻 Las camionetas diésel necesitan un especialista. Trabajamos con sistemas DEF/AdBlue, SCR, EGR y sensores NOx para que tu troca no se quede parada.\n"+TEL+"\n"+W+"\n\n🇺🇸 Diesel trucks need a specialist. We work on DEF/AdBlue, SCR, EGR and NOx sensors so your truck keeps running. (214) 930-7707.\n\n#Diesel #Cummins #Powerstroke #Duramax #Tecmeca","cummins"),
('immo-llaves','¿Tu carro no arranca?',P2+'d12es.png',P2+'d12en.png',
 "🔑 ¿Tu carro no arranca porque el inmovilizador no reconoce la llave? Resolvemos problemas de inmovilizador, llaves con chip y computadoras nuevas.\n"+TEL+"\n"+W+"\n\n🇺🇸 Car won't start because the immobilizer won't recognize your key? We fix immobilizer, chip key and new computer issues. (214) 930-7707.\n\n#Inmovilizador #ImmoOff #LlavesConChip #Tecmeca",None),
('flyer-servicios','Electrónica automotriz a domicilio',P2+'simple-noloc-es.png',P2+'simple-noloc-en.png',
 "🔧 Electrónica automotriz a domicilio: diésel DEF/EGR, chip tuning, programación de ECU, clonación de computadoras, reset de airbag, immo off y llaves. Escanea el código o escríbenos.\n"+TEL+"\n"+W+"\n\n🇺🇸 Mobile auto electronics. Scan the code or message us and we'll come to you. (214) 930-7707.\n\n#Tecmeca #ServicioMovil #MobileMechanic",None),
('marcas','Trabajamos con tu marca',P2+'d13es.png',P2+'d13en.png',
 "🚗 Trabajamos con Ford, Chevrolet, Dodge · Ram, Jeep, Chrysler, Toyota, Honda, Nissan, Mitsubishi, Hyundai y Kia. ¿No ves tu marca? Escríbenos y te decimos si podemos ayudarte.\n"+TEL+"\n"+W+"\n\n🇺🇸 We work on Ford, Chevrolet, Dodge · Ram, Jeep, Chrysler, Toyota, Honda, Nissan, Mitsubishi, Hyundai and Kia. (214) 930-7707.\n\n#Ford #Chevrolet #Ram #Toyota #Tecmeca",None),
('senales-computadora','Señales de alerta',P2+'d14es.png',P2+'d14en.png',
 "⚠️ Señales de que la computadora de tu vehículo está fallando: no arranca o se apaga sin razón, se encienden luces en el tablero, pierde potencia o entra en modo de emergencia, y los cambios se sienten bruscos. Si te pasa, mejor revisarlo a tiempo.\n"+TEL+"\n"+W+"\n\n🇺🇸 Signs your ECU is failing: stalling, dashboard lights, loss of power or limp mode, harsh shifting. Get it checked early. (214) 930-7707.\n\n#ConsejosAutomotrices #CarTips #ECU #Tecmeca",None),
('modulos','Instalamos y programamos',P2+'d15es.png',P2+'d15en.png',
 "🧩 Cambio de módulos y computadoras: los instalamos, los programamos y los dejamos funcionando con tu vehículo. Incluye adaptación y llaves con chip.\n"+TEL+"\n"+W+"\n\n🇺🇸 Module and ECU replacement: installed, programmed and working with your vehicle, including chip keys. (214) 930-7707.\n\n#Modulos #ECU #ProgramacionAutomotriz #Tecmeca","engine2"),
('como-funciona','¿Cómo funciona?',P2+'d16es.png',P2+'d16en.png',
 "✅ Así de fácil: 1) Escríbenos por llamada, texto o WhatsApp. 2) Vamos a tu ubicación con todo el equipo. 3) Tu vehículo queda funcionando.\n"+TEL+"\n"+W+"\n\n🇺🇸 That easy: message us, we drive to you with all the equipment, your vehicle is running again. (214) 930-7707.\n\n#ServicioMovil #MobileService #Tecmeca",None),
('airbag','¿Luz del airbag?',P2+'d17es.png',P2+'d17en.png',
 "🎈 Después de un choque, la luz del airbag puede quedarse encendida aunque todo esté reparado. Reseteamos el módulo SRS, borramos los datos del choque y probamos el sistema.\n"+TEL+"\n"+W+"\n\n🇺🇸 Airbag light still on after a crash? We reset the SRS module, clear crash data and test the system. (214) 930-7707.\n\n#Airbag #SRS #AirbagLight #Tecmeca",None),
('idiomas','Hablamos tu idioma',P2+'d18es.png',P2+'d18en.png',
 "🗣️ Te atendemos en español o en inglés y te explicamos todo claro, sin tecnicismos: qué tiene tu vehículo, qué vamos a hacer y cuánto cuesta.\n"+TEL+"\n"+W+"\n\n🇺🇸 We speak English and Spanish. Clear answers about what your vehicle needs, no jargon. (214) 930-7707.\n\n#Bilingue #Bilingual #NegociosHispanos #Tecmeca",None),
('trocas-diesel','Tu troca al 100%',P2+'d19es.png',P2+'d19en.png',
 "💪 Tu troca diésel al 100%: programación, tuning y sistemas DEF/EGR para que tenga la potencia y la respuesta que necesitas para trabajar.\n"+TEL+"\n"+W+"\n\n🇺🇸 Your diesel truck at 100%: programming, tuning and DEF/EGR systems for the power you need to work. (214) 930-7707.\n\n#Diesel #SuperDuty #TruckTuning #Tecmeca","superduty"),
('flyer-completo','Todos nuestros servicios',P2+'flyer-noloc-es.png',P2+'flyer-noloc-en.png',
 "📋 Todos nuestros servicios en un solo lugar: programación, diagnóstico y chip tuning con equipo profesional, en tu casa, tu trabajo o donde se quedó tu vehículo. Hablamos español e inglés.\n"+TEL+"\n"+W+"\n\n🇺🇸 All our services in one place: programming, diagnostics and chip tuning at your location. We speak English and Spanish. (214) 930-7707.\n\n#Tecmeca #AutoElectrical #ECU",None),
('agenda-hoy','¿Listo para agendar?',P2+'d20es.png',P2+'d20en.png',
 "📅 ¿Listo para agendar? Llámanos, mándanos un texto o escríbenos por WhatsApp, o escanea el código para agendar en línea. Respondemos rápido.\n"+TEL+"\n"+W+"\n\n🇺🇸 Ready to book? Call, text, WhatsApp or scan the code to book online. (214) 930-7707.\n\n#AgendaHoy #BookNow #Tecmeca",None),
]
assert len(S)==20
items=[]
for i,(slug,t,es,en,tx,ph) in enumerate(S,1):
    a=f'p{i:02d}-{slug}-es.jpg'; b=f'p{i:02d}-{slug}-en.jpg'
    jpg(es,a); jpg(en,b)
    txt=tx+(foto(ph) if ph else '')
    assert not any(w in txt for w in ['Dallas','DFW','Metroplex','Texas','Arlington']), slug
    items.append(dict(titulo=t,archivo=a,archivoEn=b,texto=txt,formato='carrusel'))
title='Servicios Tecmeca · noviembre 2026 (20 posts)'
json.dump(dict(titulo=title,items=items),open(OUT+'2026-11-completo.json','w'),ensure_ascii=False,indent=2)
json.dump([dict(mes='2026-11',titulo=title,archivo='2026-11-completo.json')],open(OUT+'planes.json','w'),ensure_ascii=False,indent=2)
print('ok',max(len(x['texto']) for x in items))
