import json
data = json.load(open('data.json', encoding='utf-8'))
lines = ["// Garaj / Diagnoza Auto - Cozi OBD2 & piese - incarca direct (fara fetch)", "const CODURI_OBD = ["]
for cod, marca, sistem, sev, titlu, exp, cauze_str, simptome_str, verif in data:
    causes = cauze_str.strip("[]").split(", ") if cauze_str.startswith("[") else []
    symptoms = simptome_str.strip("[]").split(", ") if simptome_str.startswith("[") else []
    lines.append("  {")
    lines.append("    code: "+'"'+cod+'"'+",")
    lines.append("    brand: "+'"'+marca+'"'+",")
    lines.append("    subsystem: "+'"'+sistem+'"'+",")
    lines.append("    severity: "+'"'+sev+'"'+",")
    lines.append("    desc: "+'"'+titlu+'"'+",")
    lines.append("    explanation: "+'"'+exp+'"'+",")
    lines.append("    causes: ["+",".join('"'+c+'"' for c in causes)+"],")
    lines.append("    symptoms: ["+",".join('"'+s+'"' for s in symptoms)+"],")
    lines.append("    action: "+'"'+verif+'"')
    lines.append("  },")
lines.append("];")
open('codes.js','w',encoding='utf-8').write("\n".join(lines))
print("Wrote", len(data), "codes to codes.js")
