// Garaj / Diagnoza Auto - Cozi OBD2 - incarca direct (fara fetch)
const CODURI_OBD = [
  {
    code: "P0100",
    brand: "TOATE",
    subsystem: "Admisie / MAF",
    severity: "Putere redusă / Fum",
    desc: "Debitmetru masă aer (MAF) — defecțiune circuit",
    explanation: "Calculatorul nu primește semnal corect de la senzorul de aer.",
    causes: ["D","e","b","i","t","m","e","t","r","u"," ","M","A","F"," ","d","e","f","e","c","t",","," ","m","u","f","ă"," ","o","x","i","d","a","t","ă",","," ","f","i","r"," ","î","n","t","r","e","u","p","t",","," ","f","i","l","t","r","u"," ","a","e","r"," ","m","u","r","d","a","r","."]
    symptoms: ["M","o","t","o","r","u","l"," ","t","r","a","g","e"," ","g","r","e","u",","," ","c","o","n","s","u","m"," ","c","r","e","s","c","u","t",","," ","m","a","r","t","o","r"," ","C","h","e","c","k"," ","E","n","g","i","n","e"," ","a","p","r","i","n","s","."]
    action: "Verifică mufa debitmetrului, siguranțele și valorile aerului pe tester."
  },
  {
    code: "P0102",
    brand: "TOATE",
    subsystem: "Admisie / MAF",
    severity: "Limp Mode / Putere redusă",
    desc: "Debitmetru masă aer (MAF) — semnal prea slab",
    explanation: "Tensiunea sau frecvența trimisă de debitmetru este sub limita minimă admisă.",
    causes: ["S","e","n","z","o","r"," ","M","A","F"," ","m","u","r","d","a","r"," ","d","e"," ","u","l","e","i",","," ","s","c","u","r","t","c","i","r","c","u","i","t"," ","l","a"," ","m","a","s","ă",","," ","s","i","g","u","r","a","n","ț","ă"," ","a","r","s","ă","."]
    symptoms: ["L","i","p","s","ă"," ","d","e"," ","p","u","t","e","r","e"," ","l","a"," ","a","c","c","e","l","e","r","a","r","e",","," ","e","z","i","t","ă","r","i",","," ","m","a","r","t","o","r"," ","m","o","t","o","r"," ","a","p","r","i","n","s","."]
    action: "Curăță senzorul cu spray special MAF și verifică alimentarea de 12V/5V."
  },
  {
    code: "P0113",
    brand: "TOATE",
    subsystem: "Admisie / Temperatură",
    severity: "Pornire grea / Consum",
    desc: "Senzor temperatură aer admisie (IAT) — semnal prea mare",
    explanation: "ECU citește o temperatură nerealistă (de ex. -40°C) pe admisie.",
    causes: ["S","e","n","z","o","r"," ","I","A","T"," ","d","e","f","e","c","t"," ","(","a","d","e","s","e","a"," ","i","n","t","e","g","r","a","t"," ","î","n"," ","M","A","F"," ","s","a","u"," ","M","A","P",")",","," ","f","i","r"," ","r","u","p","t","."]
    symptoms: ["A","m","e","s","t","e","c"," ","p","r","e","a"," ","b","o","g","a","t",","," ","p","o","r","n","i","r","e"," ","g","r","e","a",","," ","c","o","n","s","u","m"," ","c","r","e","s","c","u","t"," ","d","e"," ","c","o","m","b","u","s","t","i","b","i","l","."]
    action: "Citește temperatura aerului pe tester cu motorul rece și compară cu temperatura de afară."
  },
  {
    code: "P0118",
    brand: "TOATE",
    subsystem: "Răcire / Temperatură",
    severity: "Ventilator pornit / Pornire grea",
    desc: "Senzor temperatură lichid răcire (ECT) — semnal prea mare",
    explanation: "Calculatorul nu mai știe temperatura reală a antigelului (vede -40°C).",
    causes: ["S","e","n","z","o","r"," ","t","e","m","p","e","r","a","t","u","r","ă"," ","a","p","ă"," ","d","e","f","e","c","t",","," ","m","u","f","ă"," ","s","c","o","a","s","ă"," ","s","a","u"," ","f","i","r"," ","î","n","t","r","e","u","p","t","."]
    symptoms: ["V","e","n","t","i","l","a","t","o","r","u","l"," ","r","a","d","i","a","t","o","r","u","l","u","i"," ","m","e","r","g","e"," ","c","o","n","t","i","n","u","u",","," ","p","o","r","n","i","r","e"," ","g","r","e","a"," ","l","a"," ","c","a","l","d",","," ","a","c","u","l"," ","d","e"," ","t","e","m","p","e","r","a","t","u","r","ă"," ","n","u"," ","u","r","c","ă","."]
    action: "Verifică mufa senzorului de pe chiulasă/termostat și rezistența senzorului."
  },
  {
    code: "P0121",
    brand: "TOATE",
    subsystem: "Accelerație / Clapetă",
    severity: "Limp Mode / Nu accelerează",
    desc: "Senzor poziție clapetă accelerație (TPS) — plajă incorectă",
    explanation: "Semnalul clapetei de accelerație nu corespunde cu poziția pedalei.",
    causes: ["C","l","a","p","e","t","ă"," ","a","c","c","e","l","e","r","a","ț","i","e"," ","m","u","r","d","a","r","ă","/","b","l","o","c","a","t","ă",","," ","p","i","s","t","e"," ","u","z","a","t","e"," ","î","n"," ","s","e","n","z","o","r",","," ","c","a","b","l","a","j","."]
    symptoms: ["M","a","ș","i","n","a"," ","n","u"," ","m","a","i"," ","a","c","c","e","l","e","r","e","a","z","ă"," ","n","o","r","m","a","l",","," ","r","e","l","a","n","t","i"," ","m","a","r","e"," ","s","a","u"," ","o","s","c","i","l","a","n","t",","," ","m","a","r","t","o","r"," ","E","P","C","/","C","h","e","c","k"," ","E","n","g","i","n","e","."]
    action: "Curăță clapeta de accelerație și fă readaptarea ei din tester."
  },
  {
    code: "P0130",
    brand: "TOATE",
    subsystem: "Evacuare / Sondă Lambda",
    severity: "Consum crescut / Martor aprins",
    desc: "Sondă Lambda (Banc 1, Senzor 1) — defecțiune circuit",
    explanation: "Sonda de oxigen dinaintea catalizatorului nu mai reglează amestecul.",
    causes: ["S","o","n","d","ă"," ","l","a","m","b","d","a"," ","u","z","a","t","ă",","," ","f","i","r","e"," ","t","o","p","i","t","e"," ","p","e"," ","e","v","a","c","u","a","r","e",","," ","m","u","f","ă"," ","o","x","i","d","a","t","ă","."]
    symptoms: ["C","o","n","s","u","m"," ","v","i","z","i","b","i","l"," ","m","a","i"," ","m","a","r","e",","," ","m","i","r","o","s"," ","d","e"," ","c","o","m","b","u","s","t","i","b","i","l"," ","n","e","a","r","s"," ","p","e"," ","e","v","a","c","u","a","r","e","."]
    action: "Verifică pe tester dacă tensiunea sondei oscilează între 0.1V și 0.9V."
  },
  {
    code: "P0135",
    brand: "TOATE",
    subsystem: "Evacuare / Sondă Lambda",
    severity: "Martor Check Engine aprins",
    desc: "Circuit încălzire Sondă Lambda (Banc 1, Senzor 1)",
    explanation: "Rezistența internă care încălzește sonda la pornire este întreruptă.",
    causes: ["E","l","e","m","e","n","t"," ","î","n","c","ă","l","z","i","r","e"," ","a","r","s"," ","î","n"," ","s","o","n","d","ă",","," ","s","i","g","u","r","a","n","ț","ă"," ","a","r","s","ă",","," ","f","i","r"," ","î","n","t","r","e","u","p","t","."]
    symptoms: ["M","a","r","t","o","r"," ","C","h","e","c","k"," ","E","n","g","i","n","e"," ","a","p","r","i","n","s"," ","i","m","e","d","i","a","t"," ","d","u","p","ă"," ","p","o","r","n","i","r","e","a"," ","l","a"," ","r","e","c","e","."]
    action: "Măsoară rezistența pe firele albe ale sondei (trebuie să fie între 4 și 15 Ohmi)."
  },
  {
    code: "P0171",
    brand: "TOATE",
    subsystem: "Amestec Aer / Combustibil",
    severity: "Relanti instabil / Consum",
    desc: "Amestec prea sărac (Banc 1)",
    explanation: "Intră aer nemăsurat în motor sau presiunea de combustibil este prea mică.",
    causes: ["F","u","r","t","u","n"," ","v","a","c","u","u","m"," ","f","i","s","u","r","a","t",","," ","g","a","r","n","i","t","u","r","ă"," ","a","d","m","i","s","i","e",","," ","d","e","b","i","t","m","e","t","r","u"," ","m","u","r","d","a","r",","," ","p","o","m","p","ă"," ","s","l","a","b","ă","."]
    symptoms: ["R","e","l","a","n","t","i"," ","o","s","c","i","l","a","n","t",","," ","e","z","i","t","ă","r","i"," ","l","a"," ","p","l","e","c","a","r","e","a"," ","d","e"," ","p","e"," ","l","o","c",","," ","m","a","r","t","o","r"," ","m","o","t","o","r"," ","a","p","r","i","n","s","."]
    action: "Verifică toate furtunurile de vacuum și valorile Fuel Trim pe tester."
  },
  {
    code: "P0172",
    brand: "TOATE",
    subsystem: "Amestec Aer / Combustibil",
    severity: "Consum crescut / Fum negru",
    desc: "Amestec prea bogat (Banc 1)",
    explanation: "Calculatorul injectează prea mult combustibil în raport cu aerul.",
    causes: ["I","n","j","e","c","t","o","r"," ","c","a","r","e"," ","p","i","c","u","r","ă",","," ","s","e","n","z","o","r"," ","t","e","m","p","e","r","a","t","u","r","ă"," ","a","p","ă"," ","d","e","f","e","c","t",","," ","f","i","l","t","r","u"," ","a","e","r"," ","b","l","o","c","a","t","."]
    symptoms: ["C","o","n","s","u","m"," ","m","a","r","e",","," ","b","u","j","i","i"," ","a","f","u","m","a","t","e",","," ","f","u","m"," ","n","e","g","r","u"," ","l","a"," ","a","c","c","e","l","e","r","a","r","e","."]
    action: "Verifică corecțiile de combustibil și senzorii MAP/MAF/ECT."
  },
  {
    code: "P0190",
    brand: "TOATE",
    subsystem: "Injecție / Rampă",
    severity: "Pornire grea / Risc oprire",
    desc: "Senzor presiune rampă combustibil (FRP) — defecțiune circuit",
    explanation: "Semnal lipsă sau eronat de la senzorul de presiune de pe rampă.",
    causes: ["S","e","n","z","o","r"," ","p","r","e","s","i","u","n","e"," ","r","a","m","p","ă"," ","d","e","f","e","c","t",","," ","m","u","f","ă"," ","c","u"," ","c","o","n","t","a","c","t"," ","i","m","p","e","r","f","e","c","t",","," ","f","i","r","e"," ","r","u","p","t","e","."]
    symptoms: ["M","o","t","o","r","u","l"," ","p","o","r","n","e","ș","t","e"," ","f","o","a","r","t","e"," ","g","r","e","u"," ","s","a","u"," ","s","e"," ","o","p","r","e","ș","t","e"," ","b","r","u","s","c"," ","î","n"," ","m","e","r","s","."]
    action: "Inspectează mufa de pe capătul rampei Common Rail și citește presiunea la automat."
  },
];