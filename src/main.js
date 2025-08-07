// Comprehensive conversion system using Square Feet as base unit
class LandConverter {
    constructor() {
        // All conversions based on Square Feet
        this.conversionFactors = {
            // Traditional Bangladeshi Units
            'katha': 720,           // 1 Katha = 720 sq ft
            'bigha': 14400,         // 1 Bigha = 20 Katha = 14,400 sq ft
            'decimal': 435.6,       // 1 Decimal = 435.6 sq ft
            'shotok': 435.6,        // 1 Shotok = 1 Decimal = 435.6 sq ft
            'paki': 14400,          // 1 Paki = 1 Bigha = 14,400 sq ft
            'kattah': 720,          // 1 Kattah = 1 Katha = 720 sq ft
            'kani': 17280,          // 1 Kani = 20 Gonda = 17,280 sq ft
            'gonda': 864,           // 1 Gonda = 4 Kora = 864 sq ft
            'kora': 216,            // 1 Kora = 3 Kranti = 216 sq ft
            'kranti': 72,           // 1 Kranti = 20 Til = 72 sq ft
            'til': 3.6,             // 1 Til = 3.6 sq ft
            'ojutangsho': 4.356,    // 1 Ojutangsho = 1/100 Shotok = 4.356 sq ft

            // International Units
            'acre': 43560,          // 1 Acre = 43,560 sq ft
            'hectare': 107639,      // 1 Hectare = 107,639 sq ft
            'sqft': 1,              // Base unit
            'sqmeter': 10.764,      // 1 sq meter = 10.764 sq ft
            'sqyard': 9,            // 1 sq yard = 9 sq ft
            'sqinch': 0.006944,     // 1 sq inch = 0.006944 sq ft
            'sqlink': 0.04356,      // 1 sq link = 0.04356 sq ft
            'sqhat': 0.2269,        // 1 sq hat ≈ 0.2269 sq ft
        };

        // Unit display names
        this.unitNames = {
            'katha': 'Katha',
            'bigha': 'Bigha',
            'decimal': 'Decimal',
            'shotok': 'Shotok',
            'paki': 'Paki',
            'kattah': 'Kattah',
            'kani': 'Kani',
            'gonda': 'Gonda',
            'kora': 'Kora',
            'kranti': 'Kranti',
            'til': 'Til',
            'ojutangsho': 'Ojutangsho',
            'acre': 'Acre',
            'hectare': 'Hectare',
            'sqft': 'Square Feet',
            'sqmeter': 'Square Meter',
            'sqyard': 'Square Yard',
            'sqinch': 'Square Inch',
            'sqlink': 'Square Link',
            'sqhat': 'Square Hat'
        };
    }

    // Convert from any unit to Square Feet
    toSquareFeet(value, fromUnit) {
        return value * this.conversionFactors[fromUnit];
    }

    // Convert from Square Feet to any unit
    fromSquareFeet(sqftValue, toUnit) {
        return sqftValue / this.conversionFactors[toUnit];
    }

    // Main conversion function
    convert(value, fromUnit) {
        const sqftValue = this.toSquareFeet(value, fromUnit);
        const results = {};

        for (let unit in this.conversionFactors) {
            results[unit] = this.fromSquareFeet(sqftValue, unit);
        }

        return results;
    }

    // Get unit display name
    getUnitName(unit) {
        return this.unitNames[unit] || unit;
    }
}

// Initialize converter
const converter = new LandConverter();

// Theme management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.updateToggleText();
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateToggleText() {
        this.themeToggle.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
    }
}

function convert() {
    const inputValue = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('fromUnit').value;

    if (isNaN(inputValue)) {
        alert('Please enter a valid number');
        return;
    }

    try {
        const results = converter.convert(inputValue, fromUnit);
        displayResults(results, inputValue, fromUnit);
    } catch (error) {
        console.error('Conversion error:', error);
        alert('Error in conversion. Please try again.');
    }
}

function displayResults(results, inputValue, fromUnit) {
    const resultsDiv = document.getElementById('results');
    const resultList = document.getElementById('resultList');

    // Sort units by category for better display
    const categories = {
        'Traditional Bangladeshi': ['bigha', 'katha', 'kattah', 'paki', 'decimal', 'shotok', 'kani', 'gonda', 'kora', 'kranti', 'til', 'ojutangsho'],
        'International': ['acre', 'hectare', 'sqft', 'sqmeter', 'sqyard', 'sqinch', 'sqlink', 'sqhat']
    };

    let html = '';

    for (let category in categories) {
        html += `<div class="category-header">${category}</div>`;
        categories[category].forEach(unit => {
            if (unit !== fromUnit) { // Don't show the input unit
                html += `
                    <div class="result-item">
                        <span class="unit-name">${converter.getUnitName(unit)}:</span>
                        <span class="unit-value">${formatNumber(results[unit])}</span>
                    </div>
                `;
            }
        });
    }

    resultList.innerHTML = html;
    resultsDiv.style.display = 'block';
}

function formatNumber(num) {
    // Format large numbers with commas and appropriate decimal places
    if (Math.abs(num) >= 1000000) {
        return parseFloat(num.toFixed(2)).toLocaleString();
    } else if (Math.abs(num) >= 1000) {
        return parseFloat(num.toFixed(3)).toLocaleString();
    } else if (Math.abs(num) >= 1) {
        return parseFloat(num.toFixed(4)).toString();
    } else {
        return parseFloat(num.toFixed(6)).toString();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    new ThemeManager();

    // Initial conversion
    convert();

    // Add real-time conversion when user types
    document.getElementById('value').addEventListener('input', convert);
    document.getElementById('fromUnit').addEventListener('change', convert);
});
