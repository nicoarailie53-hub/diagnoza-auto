// Atelier Auto - Coduri OBD - Application logic
let currentData = { categories: [], codes: [] };
let currentBrandFilter = 'all';
let searchQuery = '';
let journalEntries = [];

// Load codes from JSON
async function loadCodes() {
  try {
    const response = await fetch('data/codes.json');
    if (!response.ok) throw new Error('Failed to load codes');
    currentData = await response.json();
    renderResults();
    updateJournalCount();
  } catch (error) {
    console.error('Error loading codes:', error);
    document.getElementById('results-list').innerHTML = '<div class="error">Eroare la incarcare. Verifica conexiunea.</div>';
  }
}

// Get filtered and searched codes
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

// Render results
function renderResults() {
  const codes = getFilteredCodes();
  const list = document.getElementById('results-list');
  const title = document.getElementById('results-title');
  const count = document.getElementById('total-count');
  
  count.textContent = codes.length;
  
  if (codes.length === 0) {
    list.innerHTML = '<div class="empty">Niciun cod gasit. Schimba filtrele sau cautarea.</div>';
    title.textContent = '0 rezultate';
    return;
  }
  
  title.textContent = codes.length + ' rezultate';
  list.innerHTML = codes.map(c => {
    const severityClass = c.severity ? 'severity-' + c.severity.toLowerCase() : 'severity-normal';
    return `
      <div class="code-card" data-code="${c.code}" data-brand="${c.brand}">
        <div class="code-header">
          <span class="code-badge ${severityClass}">${c.code}</span>
          <span class="brand-tag">${c.brand}</span>
          <span class="subsystem-label">${c.subsystem}</span>
        </div>
        <p class="code-desc">${c.desc}</p>
        <p class="code-severity">${c.severity}</p>
        <button class="view-btn" data-code="${c.code}">Vezi detalii completa</button>
      </div>
    `;
  }).join('');
  
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = btn.dataset.code;
      openDetailModal(code);
    });
  });
  
  document.querySelectorAll('.code-card').forEach(card => {
    card.addEventListener('click', () => {
      const code = card.dataset.code;
      openDetailModal(code);
    });
  });
}

// Open detail modal
function openDetailModal(code) {
  const item = currentData.codes.find(c => c.code === code);
  if (!item) return;
  
  document.getElementById('detail-code').textContent = item.code;
  document.getElementById('detail-badge').textContent = item.code;
  document.getElementById('detail-badge').className = `detail-code-badge severity-${item.severity.toLowerCase()}`;
  document.getElementById('detail-brand').textContent = item.brand;
  document.getElementById('detail-desc').textContent = item.desc;
  document.getElementById('detail-explanation').textContent = item.explanation;
  
  const causesList = document.getElementById('detail-causes');
  causesList.innerHTML = item.causes ? item.causes.map(c => `<li>${c}</li>`).join('') : '';
  
  const symptomsList = document.getElementById('detail-symptoms');
  symptomsList.innerHTML = item.symptoms ? item.symptoms.map(s => `<li>${s}</li>`).join('') : '';
  
  document.getElementById('detail-action').textContent = item.action || '';
  
  document.getElementById('detail-modal').style.display = 'flex';
  
  document.getElementById('detail-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeDetailModal();
    }
  });
}

// Close detail modal
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
    renderResults();
  });
});

// Search input
document.getElementById('search-input').addEventListener('input', (e) => {
  searchQuery = e.target.value;
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
  
  alert('Codul a fost adaugat in jurnal!');
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
    list.innerHTML = '<div class="empty-journal">Niciun cod adaugat inca. Adauga unul mai jos!</div>';
    return;
  }
  
  list.innerHTML = journalEntries.map((entry, index) => `
    <div class="journal-item">
      <div class="journal-item-header">
        <span class="journal-code">${entry.code}</span>
        <span class="journal-brand">${entry.brand}</span>
        <span class="journal-date">${new Date(entry.timestamp).toLocaleString('ro-RO')}</span>
        <button class="delete-btn" data-index="${index}">&#10005;</button>
      </div>
      <p class="journal-note">${entry.note || ''}</p>
    </div>
  `).join('');
  
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
    document.getElementById('detail-modal').style.display = 'none';
    document.getElementById('journal-modal').style.display = 'none';
  }
});

loadCodes();
