// ====== Land Calculator Engine ======
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

  getUnits(system = 'dhaka') {
    const kaniInDecimal = this.systems[system].kaniInDecimal;
    const gondaInDecimal = kaniInDecimal / 20;
    const koraInDecimal = gondaInDecimal / 4;

    return [
      { id: 'ojutangsho', name: { en: 'Ojutangsho', bn: 'ওজুতাংশ' }, factor: this.base.ojutangsho },
      { id: 'decimal', name: { en: 'Decimal / Shotangsho', bn: 'ডেসিমাল / শতাংশ' }, factor: this.base.decimal },
      { id: 'katha', name: { en: 'Katha', bn: 'কাঠা' }, factor: 165 },
      { id: 'bigha', name: { en: 'Bigha / Paki', bn: 'বিঘা / পাকি' }, factor: 3300 },
      { id: 'acre', name: { en: 'Acre', bn: 'একর' }, factor: 10000 },
      { id: 'kani', name: { en: 'Kani', bn: 'কানি' }, factor: kaniInDecimal * 100 },
      { id: 'gonda', name: { en: 'Gonda', bn: 'গন্ডা' }, factor: gondaInDecimal * 100 },
      { id: 'kora', name: { en: 'Kora', bn: 'কড়া' }, factor: koraInDecimal * 100 },
      { id: 'chotak', name: { en: 'Chotak', bn: 'ছটাক' }, factor: 20 },
      { id: 'square_feet', name: { en: 'Square Feet', bn: 'বর্গফুট' }, factor: this.base.square_feet },
      { id: 'square_meter', name: { en: 'Square Meter', bn: 'বর্গমিটার' }, factor: this.base.square_meter },
      { id: 'square_yard', name: { en: 'Square Yard', bn: 'বর্গগজ' }, factor: 0.484 },
      { id: 'hectare', name: { en: 'Hectare', bn: 'হেক্টর' }, factor: 24710.5381467165 },
      { id: 'ayor', name: { en: 'Ayor', bn: 'এয়র' }, factor: 247.105381467165 }
    ];
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
const langToggle = document.getElementById('lang-toggle');
const app = document.getElementById('app');

// Populate Units
function populateUnits() {
  const system = systemSelect.value;
  const units = LandCalculator.getUnits(system);
  unitSelect.innerHTML = '';
  units.forEach(u => {
    const option = document.createElement('option');
    option.value = u.id;
    option.textContent = getUnitName(u);
    unitSelect.appendChild(option);
  });
  renderResults(); // Re-render after change
}

// Get name based on language
function getUnitName(unit) {
  return document.body.classList.contains('bn') ? unit.name.bn : unit.name.en;
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
      <p class="en" style="display:none;">Enter a value to see all conversions</p>
      <p class="bn">সব রূপান্তর দেখতে মান লিখুন</p>
    `;
    resultsDiv.appendChild(placeholder);
    return;
  }

  const results = LandCalculator.getAllConversions(value, unitId, system);

  results.forEach(r => {
    const card = document.createElement('div');
    card.className = 'result-card pulse';
    setTimeout(() => card.classList.remove('pulse'), 300);

    const name = document.body.classList.contains('bn') ? r.name.bn : r.name.en;
    card.innerHTML = `<h3>${name}</h3><p>${r.value}</p>`;
    resultsDiv.appendChild(card);
  });
}

// Toggle Language
langToggle.addEventListener('click', () => {
  const isBangla = document.body.classList.contains('bn');

  // Switch to English
  if (isBangla) {
    document.body.classList.remove('bn');
    document.body.classList.add('en');
    document.documentElement.lang = 'en';
  }
  // Switch to Bangla
  else {
    document.body.classList.remove('en');
    document.body.classList.add('bn');
    document.documentElement.lang = 'bn';
  }

  // Toggle flag icons
  document.querySelectorAll('.flag-icon').forEach(el => {
    el.style.display = el.classList.contains('bn') ? 'inline' : 'none';
  });

  // Update all text
  document.querySelectorAll('.en, .bn').forEach(el => {
    el.style.display = el.classList.contains('bn') === document.body.classList.contains('bn') ? 'inline' : 'none';
  });

  populateUnits();
});

// Toggle Theme
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = themeToggle.querySelector('i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// System Change
systemSelect.addEventListener('change', populateUnits);
unitSelect.addEventListener('change', renderResults);
valueInput.addEventListener('input', renderResults);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Default to Bangla
  if (!document.body.classList.contains('en')) {
    document.body.classList.add('bn');
  }
  populateUnits();
  valueInput.focus();
});

document.addEventListener('DOMContentLoaded', () => {
  populateUnits();
  unitSelect.value = 'decimal';   // ← This line makes Decimal default
  valueInput.value = '1';         // Optional: auto-fill 1
  renderResults();                // Show instant results
  valueInput.focus();
});
