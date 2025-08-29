// ====== Land Calculator Engine (Bangla Only) ======
const LandCalculator = {
  systems: {
    dhaka: { kaniInDecimal: 40 },
    rajshahi: { kaniInDecimal: 120 }
  },

  base: {
    ojutangsho: 1,
    decimal: 100,
    square_feet: 4.356,
    square_meter: 0.40468564224
  },

  // All units in Bangla only
  getUnits(system = 'dhaka') {
    const kaniInDecimal = this.systems[system].kaniInDecimal;
    const gondaInDecimal = kaniInDecimal / 20;
    const koraInDecimal = gondaInDecimal / 4;

    const units = [
      { id: 'ojutangsho', name: 'অজুতাংশ', factor: this.base.ojutangsho },
      { id: 'decimal', name: 'শতাংশ', factor: this.base.decimal },
      { id: 'katha', name: 'কাঠা', factor: 165 },
      { id: 'bigha', name: 'বিঘা', factor: 3300 },
      { id: 'acre', name: 'একর', factor: 10000 },
      { id: 'kani', name: 'কানি', factor: kaniInDecimal * 100 },
      { id: 'gonda', name: 'গন্ডা', factor: gondaInDecimal * 100 },
      { id: 'kora', name: 'কড়া', factor: koraInDecimal * 100 },
      { id: 'chotak', name: 'ছটাক', factor: 20 },
      { id: 'square_feet', name: 'বর্গফুট', factor: this.base.square_feet },
      { id: 'square_meter', name: 'বর্গমিটার', factor: this.base.square_meter },
      { id: 'square_yard', name: 'বর্গগজ', factor: 0.484 },
      { id: 'hectare', name: 'হেক্টর', factor: 24710.5381467165 },
      { id: 'ayor', name: 'এয়র', factor: 247.105381467165 }
    ];

    // Sort alphabetically by Bangla name
    return units.sort((a, b) => a.name.localeCompare(b.name, 'bn'));
  },

  toBase(value, fromUnitId, system) {
    const unit = this.getUnits(system).find(u => u.id === fromUnitId);
    return unit ? value * unit.factor : 0;
  },

  fromBase(baseValue, toUnitId, system) {
    const unit = this.getUnits(system).find(u => u.id === toUnitId);
    if (!unit) return '0';
    const raw = baseValue / unit.factor;
    return Number.isInteger(raw) ? raw.toString() : raw.toFixed(6).replace(/\.?0+$/, '');
  },

  getAllConversions(value, fromUnitId, system) {
    if (value <= 0 || isNaN(value)) return [];
    const base = this.toBase(value, fromUnitId, system);
    return this.getUnits(system)
      .filter(u => u.id !== fromUnitId)
      .map(u => ({
        name: u.name,
        value: this.fromBase(base, u.id, system)
      }));
  }
};

// DOM Elements
const systemSelect = document.getElementById('system-select');
const unitSelect = document.getElementById('unit-select');
const valueInput = document.getElementById('value-input');
const resultsDiv = document.getElementById('results');
const themeToggle = document.getElementById('theme-toggle');

// Populate Units (Sorted)
function populateUnits() {
  const system = systemSelect.value;
  const units = LandCalculator.getUnits(system);
  unitSelect.innerHTML = '';
  units.forEach(u => {
    const option = document.createElement('option');
    option.value = u.id;
    option.textContent = u.name;
    unitSelect.appendChild(option);
  });
  renderResults();
}

// Render Results
function renderResults() {
  const value = parseFloat(valueInput.value);
  const unitId = unitSelect.value;
  const system = systemSelect.value;

  resultsDiv.innerHTML = '';

  if (isNaN(value) || value <= 0) {
    const placeholder = document.createElement('div');
    placeholder.className = 'placeholder fadeIn';
    placeholder.innerHTML = `
      <i class="fas fa-balance-scale fa-2x opacity"></i>
      <p>সব রূপান্তর দেখতে মান লিখুন</p>
    `;
    resultsDiv.appendChild(placeholder);
    return;
  }

  const results = LandCalculator.getAllConversions(value, unitId, system);

  results.forEach(r => {
    const card = document.createElement('div');
    card.className = 'result-card pulse';
    setTimeout(() => card.classList.remove('pulse'), 300);
    card.innerHTML = `<h3>${r.name}</h3><p>${r.value}</p>`;
    resultsDiv.appendChild(card);
  });
}

// Event Listeners
systemSelect.addEventListener('change', populateUnits);
unitSelect.addEventListener('change', renderResults);
valueInput.addEventListener('input', renderResults);

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  populateUnits();
  unitSelect.value = 'decimal';   // Default to Decimal
  valueInput.value = '1';         // Pre-fill 1
  renderResults();                // Show instant results
  valueInput.focus();
});
