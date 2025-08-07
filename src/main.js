// Comprehensive conversion system using Square Feet as base unit
class LandConverter {
    constructor() {
        // All conversions based on Square Feet (keeping both katha and kattah for completeness)
        this.conversionFactors = {
            // Traditional Bangladeshi Units
            'katha': 720,           // 1 Katha = 720 sq ft
            'bigha': 14400,         // 1 Bigha = 20 Katha = 14,400 sq ft
            'decimal': 435.6,       // 1 Decimal = 435.6 sq ft
            'shotok': 435.6,        // 1 Shotok = 1 Decimal = 435.6 sq ft
            'paki': 14400,          // 1 Paki = 1 Bigha = 14,400 sq ft
            'kani': 17280,          // 1 Kani = 20 Gonda = 17,280 sq ft
            'gonda': 864,           // 1 Gonda = 4 Kora = 864 sq ft
            'kora': 216,            // 1 Kora = 3 Kranti = 216 sq ft
            'kranti': 72,           // 1 Kranti = 20 Til = 72 sq ft
            'til': 3.6,             // 1 Til = 3.6 sq ft
            'ojutangsho': 4.356,    // 1 Ojutangsho = 1/100 Shotok = 4.356 sq ft
            'kattah': 720,          // 1 Kattah = 1 Katha = 720 sq ft

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
            'kani': 'Kani',
            'gonda': 'Gonda',
            'kora': 'Kora',
            'kranti': 'Kranti',
            'til': 'Til',
            'ojutangsho': 'Ojutangsho',
            'kattah': 'Kattah',
            'acre': 'Acre',
            'hectare': 'Hectare',
            'sqft': 'Square Feet',
            'sqmeter': 'Square Meter',
            'sqyard': 'Square Yard',
            'sqinch': 'Square Inch',
            'sqlink': 'Square Link',
            'sqhat': 'Square Hat'
        };

        // Bengali unit names
        this.bengaliUnits = {
            'katha': 'কাঠা',
            'bigha': 'বিঘা',
            'decimal': 'ডেসিমেল',
            'shotok': 'শতক',
            'paki': 'পাকি',
            'kani': 'কানি',
            'gonda': 'গন্ডা',
            'kora': 'কোরা',
            'kranti': 'ক্রান্তি',
            'til': 'তিল',
            'ojutangsho': 'অজুতাংশ',
            'kattah': 'কাট্টা',
            'acre': 'একর',
            'hectare': 'হেক্টর',
            'sqft': 'বর্গফুট',
            'sqmeter': 'বর্গমিটার',
            'sqyard': 'বর্গগজ',
            'sqinch': 'বর্গইঞ্চি',
            'sqlink': 'বর্গলিংক',
            'sqhat': 'বর্গহাট'
        };

        // Bengali labels
        this.bengaliLabels = {
            'converterTitle': 'জমি পরিমাপ কনভার্টার',
            'enterValue': 'মান লিখুন:',
            'fromUnit': 'একক থেকে:',
            'convertBtn': 'রূপান্তর করুন',
            'traditionalUnits': 'ঐতিহ্যবাহী একক',
            'internationalUnits': 'আন্তর্জাতিক একক',
            'commonConversions': 'সাধারণ রূপান্তর',
            'conversionResults': 'রূপান্তর ফলাফল:',
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
    getUnitName(unit, language = 'en') {
        if (language === 'bn' && this.bengaliUnits[unit]) {
            return this.bengaliUnits[unit];
        }
        return this.unitNames[unit] || unit;
    }
}

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

// Language management
class LanguageManager {
    constructor(converter) {
        this.converter = converter;
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.languageToggle = document.getElementById('languageToggle');
        this.init();
    }

    init() {
        this.updateToggleText();
        this.languageToggle.addEventListener('click', () => this.toggleLanguage());
        this.applyLanguage();
    }

    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'bn' : 'en';
        localStorage.setItem('language', this.currentLanguage);
        this.updateToggleText();
        this.applyLanguage();
        // Re-run conversion to update display
        convert();
    }

    updateToggleText() {
        this.languageToggle.textContent = this.currentLanguage === 'en' ? '🇧🇩 বাংলা' : '🇺🇸 English';
    }

    applyLanguage() {
        if (this.currentLanguage === 'bn') {
            document.body.classList.add('bengali-mode');
            // Update static text
            document.querySelector('.header h1').textContent = this.converter.bengaliLabels.converterTitle;
            document.querySelector('label[for="value"]').textContent = this.converter.bengaliLabels.enterValue;
            document.querySelector('label[for="fromUnit"]').textContent = this.converter.bengaliLabels.fromUnit;
            document.querySelector('.convert-btn').textContent = this.converter.bengaliLabels.convertBtn;
            if (document.querySelector('.results-column:first-child h3')) {
                document.querySelector('.results-column:first-child h3').textContent = this.converter.bengaliLabels.traditionalUnits;
            }
            if (document.querySelector('.results-column:last-child h3')) {
                document.querySelector('.results-column:last-child h3').textContent = this.converter.bengaliLabels.internationalUnits;
            }
            document.querySelector('.popular-conversions h3').textContent = this.converter.bengaliLabels.commonConversions;
            // Update unit names in dropdown
            this.updateDropdownText();
        } else {
            document.body.classList.remove('bengali-mode');
            // Reset to English
            document.querySelector('.header h1').textContent = 'Land Measurement Converter';
            document.querySelector('label[for="value"]').textContent = 'Enter Value:';
            document.querySelector('label[for="fromUnit"]').textContent = 'From Unit:';
            document.querySelector('.convert-btn').textContent = 'Convert';
            if (document.querySelector('.results-column:first-child h3')) {
                document.querySelector('.results-column:first-child h3').textContent = 'Traditional Units';
            }
            if (document.querySelector('.results-column:last-child h3')) {
                document.querySelector('.results-column:last-child h3').textContent = 'International Units';
            }
            document.querySelector('.popular-conversions h3').textContent = '💡 Common Conversions';
            this.updateDropdownText();
        }
    }

    updateDropdownText() {
        const select = document.getElementById('fromUnit');
        const options = select.options;
        for (let i = 0; i < options.length; i++) {
            const unit = options[i].value;
            if (this.currentLanguage === 'bn' && this.converter.bengaliUnits[unit]) {
                options[i].textContent = this.converter.bengaliUnits[unit];
            } else {
                options[i].textContent = this.converter.getUnitName(unit, 'en');
            }
        }
    }

    getUnitName(unit) {
        return this.converter.getUnitName(unit, this.currentLanguage);
    }
}

// Initialize converter
const converter = new LandConverter();

// Global managers
let languageManager;

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
    const resultsContainer = document.getElementById('resultsContainer');
    const traditionalResults = document.getElementById('traditionalResults');
    const internationalResults = document.getElementById('internationalResults');

    // Sort units by category
    const traditionalUnits = ['bigha', 'katha', 'kattah', 'paki', 'decimal', 'shotok', 'kani', 'gonda', 'kora', 'kranti', 'til', 'ojutangsho'];
    const internationalUnits = ['acre', 'hectare', 'sqft', 'sqmeter', 'sqyard', 'sqinch', 'sqlink', 'sqhat'];

    // Generate traditional units HTML
    let traditionalHtml = '';
    traditionalUnits.forEach(unit => {
        if (unit !== fromUnit) { // Don't show the input unit
            traditionalHtml += `
                <div class="result-item">
                    <span class="unit-name">${languageManager.getUnitName(unit)}:</span>
                    <span class="unit-value">${formatNumber(results[unit])}</span>
                </div>
            `;
        }
    });

    // Generate international units HTML
    let internationalHtml = '';
    internationalUnits.forEach(unit => {
        if (unit !== fromUnit) { // Don't show the input unit
            internationalHtml += `
                <div class="result-item">
                    <span class="unit-name">${languageManager.getUnitName(unit)}:</span>
                    <span class="unit-value">${formatNumber(results[unit])}</span>
                </div>
            `;
        }
    });

    traditionalResults.innerHTML = traditionalHtml;
    internationalResults.innerHTML = internationalHtml;
    resultsContainer.style.display = 'grid';
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

    // Initialize language manager
    languageManager = new LanguageManager(converter);

    // Initial conversion
    convert();

    // Add real-time conversion when user types
    document.getElementById('value').addEventListener('input', convert);
    document.getElementById('fromUnit').addEventListener('change', convert);

    // Add scroll event for floating controls
    window.addEventListener('scroll', function() {
        const floatingControls = document.querySelector('.floating-controls');
        if (window.scrollY > 100) {
            floatingControls.style.opacity = '0.9';
        } else {
            floatingControls.style.opacity = '1';
        }
    });
});
