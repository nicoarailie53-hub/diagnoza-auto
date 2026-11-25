// Garaj / Diagnoza Auto Pro - Cozi OBD2 & OEM
// 30 real codes: 5 per category (TOATE, MB, RENAULT, VW, PIECE, ELEC)
const CODURI = [

  // === TOATE (OBD2) ===
  {
    cod: "P0300",
    marca: "TOATE",
    sistem: "Motor / Aprindere",
    sev: "Ridicată",
    titlu: "Rateuri de aprindere (multi-cilindru)",
    exp: "Eczema de arder incomplete detectate aleatoriu pe mai multi cilindri.",
    cauze: ["Bujii uzate", "Bobine defecte", "Inz. murdari", "Structura motorului defecta"],
    simptome: "Motor trepida, pierdere de putere, consum crescut, martor aprins",
    verif: "Verifica bujii, bobinele si presiunea in raza de combustibil."
  },

  {
    cod: "P0420",
    marca: "TOATE",
    sistem: "Evacuare / Catalizator",
    sev: "Medie",
    titlu: "Eficiență catalizator sub pragul admis (Banc 1)",
    exp: "Sonda lambda de dupa catalizator arata ca aceasta nu mai filtreaza corect.",
    cauze: ["Catalizator uzat", "Sondă lambda 2 defecta", "Scapari pe evacuare inaintea sondei"],
    simptome: "Emisii rosii, consum crescut, motor puternic",
    verif: "Compară valorile sondelor lambda 1 și 2 pe tester la reptile la calt."
  },

  {
    cod: "P0440",
    marca: "TOATE",
    sistem: "Evapuare / EVAP",
    sev: "Medie",
    titlu: "Sistem EVAP - erori multiple",
    exp: "ECU deteaza erori in circuitul gazelor de evaporație.",
    cauze: ["Canister EVAP blocat", "Valvă EVAP moartă", "Conduși EVAP răniți"],
    simptome: "Motor pornește grele, bateria se descărcă, eroare EVAP aprinsă",
    verif: "Verifică canisterul EVAP și circuitul de evacuare a golirii."
  },

  {
    cod: "P0171",
    marca: "TOATE",
    sistem: "Admisie / Mixare",
    sev: "Ridicată",
    titlu: "Sistem prea închis (too lean) - Banc 1",
    exp: "Masa aerului este prea mare comparativ cu combustibilul.",
    cauze: ["Filtru motorină înfundat", "Inz. cu retur mare", "Aer pe circuit"],
    simptome: "Pornire grea, consum crescut, putere redusă",
    verif: "Verifică filtru motorină, retur inz. și dacă sunt bule pe circuitul de motorină."
  },

  {
    cod: "P0128",
    marca: "TOATE",
    sistem: "Motor / Răcire",
    sev: "Ridicată",
    titlu: "Temperatură răcire sub prag (termostat)",
    exp: "Motorul nu ajunge la temperatura de operare normală.",
    cauze: ["Termostat blocat închis", "Senzor temperatură defect", "Răcire cu prea mult aer"],
    simptome: "Pornire grea la rece, consum crescut, emisii neregulate",
    verif: "Verifică funcționarea termostatului și senzorul de temperatură."
  },

  // === MB / Mercedes-Benz ===
  {
    cod: "P0299",
    marca: "MB",
    sistem: "Turbine / Supraalimentare",
    sev: "Ridicată",
    titlu: "Presiune subreglarea supraalimentării (underboost)",
    exp: "Turbinele nu produc suficientă supraalimentare pentru regimul cerut.",
    cauze: ["Furtun vacuum slăbit", "Actuator VGT moart", "Senzor presiune blocat"],
    simptombe: "Putere redusă, consum crescur, intră în Limp Mode",
    verif: "Verifică furtunul vacuum și activitatea actuatorului VGT."
  },

  {
    cod: "P0455",
    marca: "MB",
    sistem: "Evapuare / EVAP",
    sev: "Medie",
    titlu: "Golire majoră sistem EVAP",
    exp: "Liberarea excesivă de gaze din rezervorul de combustibil spre evacuare.",
    cauze: ["Canister EVAP blocat", "Valvă EVAP moartă", "Conduși EVAP răniți"],
    simptombe: "Motor pornește grele, bateria se descărcă, eroare EVAP aprinsă",
    verif: "Verifică canisterul EVAP și circuitul de evacuare a golirii."
  },

  {
    cod: "P0456",
    marca: "MB",
    sistem: "Evapuare / EVAP",
    sev: "Normală",
    titlu: "Golire mică sistem EVAP",
    exp: "Pickă de gaze din rezervor recunoscută de către ECU.",
    cauze: ["Fugere mici în circuit EVAP", "Conexiune EVAP ușor defectă", "Freză obosită la conexiune EVAP"],
    simptombe: "Eroare EVAP aprinsă, consum crescut",
    verif: "Inspecționează toate conexiunile EVAP pentru fugere mici."
  },

  {
    cod: "P0411",
    marca: "MB",
    sistem: "EGR",
    sev: "Medie",
    titlu: "Supapă EGR rece — debit prea scăzut (P0411)",
    exp: "Supapă EGR rece nu trăde la temperatura de referință, afectând reducerea poluăriilor.",
    cauze: ["Supapă EGR arsă sau cuplu defect", "Furră în canal EGR", "Senzor de temperatură EGR defect"],
    simptombe: "Putere redusă, consum crescur, emisii neregulate",
    verif: "Verifică temperatura EGR cu senzor și spală circuitul."
  },

  {
    cod: "P0380",
    marca: "MB",
    sistem: "Preîncălzire",
    sev: "Medie",
    titlu: "Circuit bujii incandescente / releu preîncălzire",
    exp: "Una sau mai multe bujii arse sau releul nu comandă.",
    cauze: ["Bujii incandescente arși", "Releu preîncălzire defect", "Cablaj oxidat"],
    simptombe: "Pornire grea la rece, buji neumplute",
    verif: "Măsoară rezistența fiecărei bujii cu multimetrul (trebuie să fie sub 1-2 Ohmi)."
  },

  // === RENAULT ===
  {
    cod: "DF053",
    marca: "RENOULT",
    sistem: "Injecție 1.5 dCi",
    sev: "Ridicată",
    titlu: "Funcție reglare presiune rampă injecție",
    exp: "Presiunea în rampa Common Rail este peste sau sub limita cerută.",
    cauze: ["Regulator presiune pompă (IMV) blocat", "Aer pe circuitul de motorină", "Inontoare cu retur mare"],
    simptombe: "Pornire grea, consum crescut, marcaj neregulat",
    verif: "Verifică dacă sunt bule de aer pe conducta transparentă de motorină și fă testul de retur."
  },

  {
    cod: "DF025",
    marca: "RENOULT",
    sistem: "Preîncălzire",
    sev: "Medie",
    titlu: "Circuit releu / bujii incandescente",
    exp: "Una sau mai multe bujii arse sau releul nu comandă.",
    cauze: ["Bujii incandescente arși", "Releu preîncălzire defect", "Cablaj oxidat"],
    simptombe: "Pornire grea la rece, buji neumplute",
    verif: "Măsoară rezistența fiecărei bujii cu multimetrul (trebuie să fie sub 1-2 Ohmi)."
  },

  {
    cod: "DF1012",
    marca: "RENOULT",
    sistem: "Preîncălzire",
    sev: "Medie",
    titlu: "Eroare circuit bujii incandescente / releu preîncălzire",
    exp: "Circuitul bujilor incandescente este defect, afectând pornirea motorului.",
    cauze: ["Bujii incandescente arși", "Releu preîncălzire defect", "Cablaj de alimentare ROS defectiv"],
    simptombe: "Pornire grea, buji neumplute",
    verif: "Verifică cablajele ROS și măsoară rezistența fiecărei bujii."
  },

  {
    cod: "DF1011",
    marca: "RENOULT",
    sistem: "EGR",
    sev: "Medie",
    titlu: "Preluare EGR excesivă",
    exp: "Supapa EGR preia prea multe gaze, reducând puterea și creștind consumul.",
    cauze: ["Valvă EGR moartă (se deschide prea mult)", "Furră în canal EGR", "Circuit EGR colmatat"],
    simptombe: "Putere redusă, consum crescur, emisii neregulate",
    verif: "Spăla circuit EGR, verifică valvă și canalurile."
  },

  {
    cod: "DF800",
    marca: "RENOULT",
    sistem: "Turbine",
    sev: "Medie",
    titlu: "Control geometrie variabilă turbină (VGT)",
    exp: "Sistemul de control al geometriei turbinelor nu funcționează corect.",
    cauze: ["Actuator VGT moart", "Senzor de presiune cameră de admisie", "Circuit de comutare VGT defect"],
    simptombe: "Putere redusă, turbine intră în Limp Mode",
    verif: "Verifică cu diagnotigatorul semnalele actuatorului VGT și presiunea camerii de admisie."
  },

  // === VW / VAG ===
  {
    cod: "17965",
    marca: "VW",
    sistem: "Turbine",
    sev: "Ridicată",
    titlu: "Presiune supraalimentare depășită (Overboost)",
    exp: "Supraalimentarea depășește limita de siguranță, adesea cauzată de blocare mecanică.",
    cauze: ["Electrovalvă N75 moartă", "Galerie admisie blocată", "Senzor de presiune de supraalimentare defect"],
    simptombe: "Intră în Limp Mode până la repornire",
    verif: "Verifică electrovalvă N75 și semnalele senzorului de presiune de supraalimentare."
  },

  {
    cod: "17941",
    marca: "VW",
    sistem: "EGR",
    sev: "Medie",
    titlu: "Supapă EGR — debit prea mare / EGR inactivat",
    exp: "Supapa EGR trăde prea multe gaze sau nu este controlat corect.",
    cauze: ["Valvă EGR moartă (se deschide prea mult)", "Senzor de presiune EGR defect", "Circuit de comutare EGR defect"],
    simptombe: "Putere redusă, consum crescur, emisii neregulate",
    verif: "Verifică valvă EGR și circuitul de comutare."
  },

  {
    cod: "P0300",
    marca: "VW",
    sistem: "Motor / Aprindere",
    sev: "Ridicată",
    titlu: "Rateuri de aprindere (multi-cilindru) - VAG",
    exp: "Arderi incomplete detectate aleatoriu pe mai mulți cilindri.",
    cauze: ["Bujii uzate", "Bobine defecte", "Inz. murdari"],
    simptombe: "Motor trepida, pierde putere, martor aprins",
    verif: "Verifică bujii, bobinele și presiunea în raza de combustibil."
  },

  {
    cod: "P0440",
    marca: "VW",
    sistem: "Evapuare / EVAP",
    sev: "Medie",
    titlu: "Sistem EVAP - erori multiple",
    exp: "ECU deteaza erori in circuitul gazelor de evaporație.",
    cauze: ["Canister EVAP blocat", "Valvă EVAP moartă", "Conduși EVAP răniți"],
    simptombe: "Motor pornește grele, bateria se descărcă, eroare EVAP aprinsă",
    verif: "Verifică canisterul EVAP și circuitul de evacuare a golirii."
  },

  {
    cod: "P0420",
    marca: "VW",
    sistem: "Evacuare / Catalizator",
    sev: "Medie",
    titlu: "Eficiență catalizator sub pragul admis (Banc 1)",
    exp: "Sonda lambda de dupa catalizator arata ca aceasta nu mai filtreaza corect.",
    cauze: ["Catalizator uzat", "Sondă lambda 2 defectă", "Scapari pe evacuare inaintea sondei"],
    simptombe: "Emisii rosii, consum crescut, motor puternic",
    verif: "Compară valorile sondelor lambda 1 și 2 pe tester la reptile la calt."
  },

  // === PIECE / Piese Origine OEM ===
  {
    cod: "P2015",
    marca: "PIECE",
    sistem: "Admisie / Piese",
    sev: "Medie",
    titlu: "Senzor poziție clapete galerie admisie (swirl flaps)",
    exp: "Servomotorul sau tija clapetelor din galeria de admisie nu ajunge la poziția comandată.",
    cauze: ["Depuneri de ulei și funingine pe clapete", "Tijă ruptă", "Motoraș M55 defect"],
    simptombe: "Pornire grea, consum crescut, motor trepida",
    verif: "Inspectează vizual tija de sub galeria de admisie la punerea contactului."
  },

  {
    cod: "P0380",
    marca: "PIECE",
    sistem: "Preîncălzire",
    sev: "Medie",
    titlu: "Circuit bujii incandescente / releu preîncălzire",
    exp: "Una sau mai multe bujii arse sau releul nu comandă.",
    cauze: ["Bujii incandescente arși", "Releu preîncălzire defect", "Cablaj oxidat"],
    simptombe: "Pornire grea la rece, buji neumplute",
    verif: "Măsoară rezistența fiecărei bujii cu multimetrul (trebuie să fie sub 1-2 Ohmi)."
  },

  {
    cod: "DF1012",
    marca: "PIECE",
    sistem: "Preîncălzire",
    sev: "Medie",
    titlu: "Eroare circuit bujii incandescente / releu preîncălzire",
    exp: "Circuitul bujilor incandescente este defect, afectând pornirea motorului.",
    cauze: ["Bujii incandescente arși", "Releu preîncălzire defect", "Cablaj de alimentare ROS defectiv"],
    simptombe: "Pornire grea, buji neumplute",
    verif: "Verifică cablajele ROS și măsoară rezistența fiecărei bujii."
  },

  {
    cod: "17941",
    marca: "PIECE",
    sistem: "EGR",
    sev: "Medie",
    titlu: "Supapă EGR — debit prea mare / EGR inactivat",
    exp: "Supapa EGR trăde prea multe gaze sau nu este controlat corect.",
    cauze: ["Valvă EGR moartă (se deschide prea mult)", "Senzor de presiune EGR defect", "Circuit de comutare EGR defect"],
    simptombe: "Putere redusă, consum crescur, emisii neregulate",
    verif: "Verifică valvă EGR și circuitul de comutare."
  },

  {
    cod: "P0100",
    marca: "PIECE",
    sistem: "Admisie / MAF",
    sev: "Ridicată",
    titlu: "Circuit senzor masă aer (MAF) — întrerupt",
    exp: "Circuitul electric al senzorului de masă de aer este întrerupt.",
    cauze: ["Cablaj MAF întrerupt", "Senzor MAF moart", "Conexiune MAF oxidată"],
    simptombe: "Pornire grea, motor trage greu, consum crescut",
    verif: "Verifică cablajele și conexiunea senzorului MAF."
  },

  // === ELEC / Electrică & Lumini ===
  {
    cod: "P0605",
    marca: "ELEC",
    sistem: "Computer / ECU",
    sev: "Riscul oprirea motorului",
    titlu: "Eroare circuit ECU — defecțiune",
    exp: "Circuitul electric al ECU este întrerupt sau are scurtcircuit.",
    cauze: ["Muftă ECU defectă", "Cablaje scurtcircuit", "Alimentare instabilă"],
    simptombe: "Motor se oprește brusc, ECU nu pornește",
    verif: "Verifică cablajele de alimentare la ECU și dacă sunt scurtcircuite."
  },

  {
    cod: "P0645",
    marca: "ELEC",
    sistem: "Computer / ECU",
    sev: "Medie",
    titlu: "Sistem de alimentare ECU — tensiune prea mare",
    exp: "Tensiunea pe linia de alimentare ECU depășește pragul maxim.",
    cauze: ["Furtun de masă defect", "Cofă neizolată", "Cablaj greșit"],
    simptombe: "ECU renunță să execute, motor se oprește",
    verif: "Verifică tensiunea la alimentarea ECU cu multimetru."
  },

  {
    cod: "P0562",
    marca: "ELEC",
    sistem: "Motor / Surse de energie",
    sev: "Normală",
    titlu: "Controlul sursei de energie – tensiune scăzută",
    exp: "Tensiunea la sursa de energie este scăzută, afectând performanța și emisiile.",
    cauze: ["Tensiune slabă la baterie", "Baterie slăbă sau învechită", "Cablaj greșit la sursă", "Alternator defect"],
    simptombe: "Pornire grea, consum crescut, semnalele ECU sunt instabile",
    verif: "Verifică bateria și alternatorul, cablajele și tensiunea la sursa de energie."
  },

  {
    cod: "P0560",
    marca: "ELEC",
    sistem: "Motor / Surse de energie",
    sev: "Normală",
    titlu: "Senzor tensiune sursă — defecțiune",
    exp: "Senzorul de tensiune de sursă trimite date incorecte.",
    cauze: ["Senzor tensiune moart", "Cablaj senzor oxidat", "Conexiune defectă"],
    simptombe: "Semnalele ECU sunt incorecte, motor pornește greu",
    verif: "Verifică semnalele senzorului de tensiune cu diagnotigatorul."
  },

  {
    cod: "P0100",
    marca: "ELEC",
    sistem: "Admisie / MAF",
    sev: "Ridicată",
    titlu: "Circuit senzor masă aer (MAF) — întrerupt",
    exp: "Circuitul electric al senzorului de masă de aer este întrerupt.",
    cauze: ["Cablaj MAF întrerupt", "Senzor MAF moart", "Conexiune MAF oxidată"],
    simptombe: "Pornire grea, motor trage greu, consum crescut",
    verif: "Verifică cablajele și conexiunea senzorului MAF."
  },

];

