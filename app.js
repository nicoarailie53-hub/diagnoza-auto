// Atelier Auto - Coduri OBD - Application logic
// Datele sunt încărcate direct din CODURI_OBD (definit în codes.js, înainte de acest fișier)

let currentData = { categories: [], codes: [] };
let currentBrandFilter = 'all';
let searchQuery = '';
let journalEntries = [];
let expandedCode = null;

// Încarcă datele din CODURI_OBD (definit în codes.js, sincron)
function loadCodes() {
  if (typeof CODURI_OBD !== 'undefined' && CODURI_OBD.codes) {
    currentData = CODURI_OBD;
    renderResults();
    updateJournalCount();
  } else {
    document.getElementById('results-list').innerHTML = '<div class="error">Eroare la încărcare. Repornește pagina.</div>';
  }
}

// Filtrează și caută coduri
function getFilteredCodes() {
  let codes = currentData.codes.filter(c => {
    if (currentBrandFilter !== 'all' && c.brand !== currentBrandFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (c.code.toLowerCase().includes(q)) return true;
      if (c.desc && c.desc.toLowerCase().includes(q)) return true;
      if (c.explanation && c.explanation.toLowerCase().includes(q)) return true;
      if (c.subsystem && c.subsystem.toLowerCase().includes(q)) return true;
      if (c.severity && c.severity.toLowerCase().includes(q)) return true;
    }
    return true;
  });
  return codes;
}

// Afișează rezultatele cu accordeon detalii
function renderResults() {
  const codes = getFilteredCodes();
  const list = document.getElementById('results-list');
  const title = document.getElementById('results-title');
  const count = document.getElementById('total-count');
  
  count.textContent = codes.length;
  
  if (codes.length === 0) {
    list.innerHTML = '<div class="empty">Niciun cod găsit. Schimbă filtrele sau căutarea.</div>';
    title.textContent = '0 rezultate';
    return;
  }
  
  title.textContent = codes.length + ' rezultate';
  
  const severityClassMap = {
    'ridicată': 'alta',
    'medie': 'mare',
    'scăzută': 'normal'
  };
  
  list.innerHTML = codes.map(c => {
    const severityKey = (c.severity || '').toLowerCase();
    const severityClass = severityClassMap[severityKey] || 'normal';
    const brandColor = c.brand === 'MB' ? '#4A90D9' : (c.brand === 'RO' ? '#E8A33D' : (c.brand === 'VW' ? '#00B4D8' : '#2E8B57'));
    const isExpanded = expandedCode === c.code;
    const detailsHtml = buildDetailsHtml(c);
    const buttonText = isExpanded ? 'Ascunde detalii' : 'Vezi detalii complete';
    
    return \`
      <div class="code-card" data-code="\${c.code}" data-brand="\${c.brand}">
        <div class="code-header">
          <span class="code-badge severity-\${severityClass}">\${c.code}</span>
          <span class="brand-tag" style="background:\${brandColor};color:#fff">\${c.brand}</span>
          <span class="subsystem-label">\${c.subsystem}</span>
        </div>
        <p class="code-desc">\${c.desc}</p>
        <p class="code-severity"><span class="severity-\${severityClass}">\${c.severity}</span></p>
        <button class="view-btn" data-code="\${c.code}">\${buttonText}</button>
        <div class="code-details \${isExpanded ? 'expanded' : ''}" data-code="\${c.code}">
          \${detailsHtml}
        </div>
      </div>
    \`;
  }).join('');

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = btn.dataset.code;
      toggleDetail(code);
    });
  });
}

// Toggle detail section for a code
function toggleDetail(code) {
  if (expandedCode === code) {
    expandedCode = null;
  } else {
    expandedCode = code;
  }
  const details = document.querySelectorAll('.code-details');
  details.forEach(d => {
    const card = d.closest('.code-card');
    card.style.borderColor = (d.classList.contains('expanded') ? '#2E8B57' : '#3A3A5A');
    d.classList.toggle('expanded');
  });
  // Re-render results to update button text
  renderResults();
}

// Build details HTML for a code
function buildDetailsHtml(c) {
  return \`
    <div class="detail-field">
      <span class="field-label">Descriere:</span>
      <p class="detail-text">\${c.desc}</p>
    </div>
    <div class="detail-field">
      <span class="field-label">Explicație:</span>
      <p class="detail-text">\${c.explanation}</p>
    </div>
    <div class="detail-field">
      <span class="field-label">Cauze probabile:</span>
      <ul class="detail-list">
        \${c.causes ? c.causes.map(cauza => \`<li>\${cauza}</li>\`).join('') : ''}
      </ul>
    </div>
    <div class="detail-field">
      <span class="field-label">Simptome:</span>
      <ul class="detail-list">
        \${c.symptoms ? c.symptoms.map(s => \`<li>\${s}</li>\`).join('') : ''}
      </ul>
    </div>
    <div class="detail-field">
      <span class="field-label">Pași de verificare:</span>
      <p class="detail-text">\${c.action || ''}</p>
    </div>
  \`;
}

// Close detail modal (legacy)
function closeDetailModal() {
  document.getElementById('detail-modal').style.display = 'none';
}

// Brand filter buttons
document.querySelectorAll('.brand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.brand-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentBrandFilter = btn.dataset.brand;
    searchQuery = '';
    document.getElementById('search-input').value = '';
    expandedCode = null;
    renderResults();
  });
});

// Search input
document.getElementById('search-input').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  expandedCode = null;
  renderResults();
});

// Journal (localStorage)
document.getElementById('journal-btn').addEventListener('click', () => {
  document.getElementById('journal-modal').style.display = 'flex';
  loadJournal();
});

document.getElementById('journal-close').addEventListener('click', () => {
  document.getElementById('journal-modal').style.display = 'none';
});

document.getElementById('journal-save').addEventListener('click', () => {
  const code = document.getElementById('journal-code').value.trim();
  const brand = document.getElementById('journal-brand').value;
  const note = document.getElementById('journal-note').value.trim();
  
  if (!code) {
    alert('Te rog introdu un cod OBD.');
    return;
  }
  
  const entry = {
    code: code.toUpperCase(),
    brand: brand,
    note: note,
    timestamp: new Date().toISOString()
  };
  
  journalEntries.push(entry);
  localStorage.setItem('atelier_auto_journal', JSON.stringify(journalEntries));
  loadJournal();
  document.getElementById('journal-modal').style.display = 'none';
  document.getElementById('journal-code').value = '';
  document.getElementById('journal-note').value = '';
  
  alert('Codul a fost adăugat în jurnal!');
});

function loadJournal() {
  const list = document.getElementById('journal-list');
  const count = document.getElementById('journal-count');
  const saved = localStorage.getItem('atelier_auto_journal');
  
  if (saved) {
    journalEntries = JSON.parse(saved);
  }
  
  count.textContent = journalEntries.length;
  
  if (journalEntries.length === 0) {
    list.innerHTML = '<div class="empty-journal">Niciun cod adăugat încă. Adaugă unul mai jos!</div>';
    return;
  }
  
  list.innerHTML = journalEntries.map((entry, index) => \`
    <div class="journal-item">
      <div class="journal-item-header">
        <span class="journal-code">\${entry.code}</span>
        <span class="journal-brand">\${entry.brand}</span>
        <span class="journal-date">\${new Date(entry.timestamp).toLocaleString('ro-RO')}</span>
        <button class="delete-btn" data-index="\${index}">&#10005;</button>
      </div>
      <p class="journal-note">\${entry.note || ''}</p>
    </div>
  \`).join('');
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.dataset.index;
      journalEntries.splice(index, 1);
      localStorage.setItem('atelier_auto_journal', JSON.stringify(journalEntries));
      loadJournal();
    });
  });
}

function updateJournalCount() {
  const count = localStorage.getItem('atelier_auto_journal');
  const display = document.getElementById('journal-count');
  if (count) {
    display.textContent = JSON.parse(count).length;
  } else {
    display.textContent = '0';
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('journal-modal').style.display = 'none';
    if (expandedCode) {
      const code = expandedCode;
      expandedCode = null;
      const details = document.querySelector(`.code-details[data-code="\${code}"]`);
      if (details) {
        details.classList.remove('expanded');
        const card = details.closest('.code-card');
        card.style.borderColor = '#3A3A5A';
      }
    }
  }
});

loadCodes();
