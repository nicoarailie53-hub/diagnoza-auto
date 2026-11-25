import json

# 12 codes: 2 per tab (TOATE, MB, RENAULT, VW, PIECE, ELEC)
# fields: cod, marca, sistem, sev, titlu, exp, cauze, verif
D = [
 ("P0100","TOATE","Admisie / MAF","Ridicată","Debitmetru masă aer (MAF) — defecțiune circuit","Nu primește semnal corect de la senzorul de aer.","[Debitmetru MAF defect, Muftă oxidată, Fir întreupt]","[Motorul trage greu, Consum crescut, Martor Check Engine aprins]"),
 ("P0300","TOATE","Motor / Aprindere","Ridicată","Rateuri de aprindere (multi-cilindru)","Arderi incomplete detectate aleatoriu pe mai mulți cilindri.","[Buji uzate, Bobine defecte, Inz. murdari]","[Motor trepidează, Pierde putere, Martor aprins]"),
 ("P0087","MB","Injecție / Common Rail","Ridicată","Presiune prea mică în rampă comună","Presiunea mult sub cea cerută de ECU.","[Filtru motorină înfundat, Regulator defect, Pompă uzată]","[Pornire grea, Putere redusă, Motor trage greu]"),
 ("P0088","MB","Injecție / Common Rail","Ridicată","Presiune prea mare în rampă","Presiunea depășește limita maximă a rampei.","[Regulator IMV defect, Pompă cu bule, Fisure amplasament]","[Rulează neted, Consum crescut, Emisii de negru]"),
 ("DF053","RENAULT","Injecție 1.5 dCi","Ridicată","Funcție reglare presiune rampă","Presiunea în rampă Common Rail este peste/supra limita cerută.","[Regulator IMV blocat, Aer pe circuit, Inz. cu retur mare]","[Pornire grea, Consum crescut, Marcaj neregulat]"),
 ("DF025","RENAULT","Preîncălzire","Medie","Circuit releu / buji incandescente","Una sau mai multe bujii arse sau releul nu comandă.","[Bujii arși, Releu defect, Cablaj oxidat]","[Pornire grea la rece, Buji neumplute]"),
 ("17965","VW","Turbină / Supraalimentare","Ridicată","Presiune supraalimentare depășită (Overboost)","Presiunea de supraalimentare depășește limita de siguranță.","[Electrovalvă N75 moartă, Galerie ADM blocată, Senzor N75 defect]","[Intră în Limp Mode până la repornire]"),
 ("17941","VW","EGR / EGR inactivat","Medie","EGRu — debit prea mare / inactivat","EGRu trăde prea multe gaze sau nu este controlat corect.","[Valvă EGR moartă, Senzor presiune EGR defect]","[Putere redusă, Consum crescur, Emisii neregulate]"),
 ("P2015","PIECE","Mercedes-Benz Admisie","Medie","Senzor poziție clapete gallerie admisie","Servomotorul sau tija clapetelor din galeria de admisie nu ajunge la poziția comandată.","[Depuneri de ulei și funingine pe clapete, Tijă ruptă, Motoraș M55 defect]","[Fără detalii specifice]"),
 ("P0380","PIECE","Mercedes-Benz Preîncălzire","Medie","Circuit buji incandescente / releu preîncălzire","Una sau mai multe bujii arse sau releul nu comandă.","[Buji incandescente arse, Releu preîncălzire defect, Cablaj oxidat]"),
 ("P0605","ELEC","Computer / ECU","Riscul oprirea motorului","Eroare circuit ECU — defecțiune","Circuitul electric al ECU este întrerupt sau are scurtcircuit.","[Muftă ECU defectă, Cablaje scurtcircuit, Alimentare instabilă]","[Pornește dificil sau se oprește brusc]"),
 ("P0645","ELEC","Sistem de alimentare ECU","Medie","Prea multă curentă pe linia ECU","Tensiunea pe linia de alimentare ECU depășește pragul maxim.","[Furtun de masa defect, Cofă neizolată, Cablaj greșit]","[CE aprins la pornire, ECU renunță să execute]"),
]

js_lines = ["// Garaj / Diagnoza Auto - Cozi OBD2 - incarca direct (fara fetch)", "const CODURI = ["]
for cod, marca, sistem, sev, titlu, exp, cauze_str, verif in D:
    js_lines.append("{")
    js_lines.append("  cod: \"{}\",".format(cod))
    js_lines.append("  marca: \"{}\",".format(marca))
    js_lines.append("  sistem: \"{}\",".format(sistem))
    js_lines.append("  sev: \"{}\",".format(sev))
    js_lines.append("  titlu: \"{}\",".format(titlu))
    js_lines.append("  exp: \"{}\",".format(exp))
    js_lines.append("  cauze: [{}]".format(",".join('"%s"' % c for c in cauze_str.strip("[]").split(", "))))
    js_lines.append("  verif: \"{}\"".format(verif))
    js_lines.append("},")
js_lines.append("];")
js_content = "\n".join(js_lines)

with open('codes.js', 'w', encoding='utf-8') as f:
    f.write(js_content)
print("Wrote", len(D), "codes to codes.js")
