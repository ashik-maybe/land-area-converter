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
            'converterTitle': 'বাংলাদেশি জমি পরিমাপ কনভার্টার',
            'enterValue': 'মান লিখুন:',
            'fromUnit': 'একক থেকে:',
            'convertBtn': 'রূপান্তর করুন',
            'traditionalUnits': 'ঐতিহ্যবাহী একক',
            'internationalUnits': 'আন্তর্জাতিক একক',
            'commonConversions': 'সাধারণ রূপান্তর',
            'conversionResults': 'রূপান্তর ফলাফল:',
            'ultimateChart': 'চূড়ান্ত চার্ট',
            'close': 'বন্ধ করুন'
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

// Ultimate Chart Data
const ultimateChart = [
    {
        title: "Paki, Bigha and Decimal Formulas",
        items: [
            "1 Paki = 1 Bigha = 33 Decimal",
            "1 Decimal = 1 Shotangsho (Shotok) = 435.6 Sq Feet (approx)",
            "1 Kattah (or Cottah) = 1.65 Shotangsho (approx)",
            "1 Katha = 165 Ojutangsho (approx)",
            "1 Shotangsho = 100 Ojutangsho",
            "1 Katha = 720 Sq Feet (approx)",
            "20 Katha = 1 Bigha",
            "3 Bighas = 1 Acre approx. (1600 square yards)",
            "4 Kora = 1 Gonda",
            "20 Gonda = 1 Kani",
            "80 Kora = 1 Kani",
            "120 Decimal = 1 Kani"
        ]
    },
    {
        title: "Square Feet and Kani Formulas",
        items: [
            "17280 Square Feet = 1 Kani",
            "1619 Square Meter = 1 Kani",
            "40000 Square Links = 1 Kani",
            "7680 Square Hat = 1 Kani",
            "1936 Bargogoz = 1 Kani",
            "40 Acre = 1 Kani"
        ]
    },
    {
        title: "8 Hat Nol Formulas",
        items: [
            "12 Nol * 10 Nol = 120 Bargonol"
        ]
    },
    {
        title: "Kani and Gonda as Square Feet",
        items: [
            "17280 Square Feet = 1 Kani = 20 Gonda (Measurement of 8 Hat nol)",
            "864 Square Feet = 1 Gonda = 4 Kora",
            "216 Square Feet = 1 Kora = 3 Kransti/Kontho",
            "72 Square Feet = 1 Kransti = 20 Til",
            "3.6 Square Feet = 1 Til"
        ]
    },
    {
        title: "Square Feet and Acre Formulas",
        items: [
            "1 Chain = 66 Feet",
            "10 Square Chain = (66*660) or 1 Acre = 43560 Square Feet",
            "1 Acre or 100 Shotok = 43200 Square Feet"
        ]
    },
    {
        title: "Square Link, Acre and Shotok Formulas",
        items: [
            "1 Chain = 100 Link, So 1 Square Chain = 100*1000 = 100,000 Square Link = 1 Acre",
            "1 Acre Or 100 Shotok = 1,00,000 Square Link",
            "1 Shotok = 1,000 Square Link",
            "100 Link = 66 Feet"
        ]
    },
    {
        title: "Kani and Gonda as Square Link",
        items: [
            "1 Kani Or 20 Gonda = 40,000 Square Link",
            "1 Gonda Or 4 Kora = 2000 Square Link",
            "1 Kora Or 3 Kanti = 500 Square Link",
            "1 Kranti Or 20 Til = 160.66 Square Link",
            "1 Til = 8.33 Square Link"
        ]
    },
    {
        title: "8 Hat Nol as Square Hat",
        items: [
            "1 Kani Or 20 Gaz/Yard = 7680 Bargo Hat",
            "1 Gonda Ot 4 Kora = 384 Bargo Hat",
            "1 Kora Or 3 Kanti = 96 Bargo Hat",
            "1 Kranti Or 20 Til = 32 Bargo Hat",
            "1 Til = 1.6 Bargo Hat"
        ]
    },
    {
        title: "Kani and Gonda for 8 Hat Nol as Square Feet",
        items: [
            "1 Kani Or 20 Gonda = 17280 Square Feet",
            "1 Gonda Or 4 Kora = 864 Square Feet",
            "1 Kora Or 3 Kontho/Kranti = 216 Square Feet",
            "1 Kontho Or 6 Donto = 72 Square Feet",
            "1 Dondho Or 7 Dhul = 12 Square Feet",
            "1 Dhul Or 30 Renu = 1.71 Square Feet",
            "1 Renu = 0.057 Square Feet"
        ]
    },
    {
        title: "Kani and Gonda as Bargo Gaz/Yard",
        items: [
            "1 Kani Or 20 Gonda = 1936 Bargo Gaz (Square Yard)",
            "1 Gonda Or 4 Kora = 96.8 Bargo Gaz (Square Yard)",
            "1 Kora Or 3 Kranti = 24.2 Bargo Gaz (Square Yard)",
            "1 Kranti Or 20 Til = 8.06 Bargo Gaz (Square Yard)",
            "1 Til = 0.40 Bargo Gaz (Square Yard)"
        ]
    },
    {
        title: "Kani and Gonda as Square Meter",
        items: [
            "(40.47 * Meter * 39.67 = 1605 Square Meter)",
            "1 Kani Or 20 Gonda = 1605 Square Meter",
            "1 Gonda Or 4 Kora = 80.25 Square Meter",
            "1 Kora Or 3 Kranti = 20.06 Square Meter",
            "1 Kranti Or 20 Til = 6.68 Square Meter",
            "1 Til = .334 Square Meter"
        ]
    },
    {
        title: "Acre and Shotok Formulas",
        items: [
            "Length 10 Chain * Width 1 Chain = 10 Square Chain = 1 Acre",
            "1 Chain = 66 Feet = 44 Hat = 22 Gaz/Yard = 20.12 Meter = 792 Inchi = 100 Link",
            "1 Acre = 10 Square Chain",
            "1 Acre = 100 Shotok",
            "1 Acre = 43560 Square Feet",
            "1 Acre = 19360 Square Hat",
            "1 Acre = 4840 Borgo Gaz (Square Yard)",
            "1 Acre = 4047 Square Meter",
            "1 Acre = 1,00,000 Square Link",
            "1 Acre = 3 Bigha 8 Chotak",
            "1 Acre = 60.5 Kattah",
            "1 Acre = 2 Kani 10 Gonda (According to 40 Shotok Kani)",
            "1 Acre = 432.6 Square Feet",
            "1 Acre = 1 Gonda"
        ]
    },
    {
        title: "Acre and Shotok as Square Link",
        items: [
            "1 Chain = 100 Link",
            "1 Square Chain = 100 * 1000 = 1,00,000 Square Link = 1 Acre",
            "1 Acre Or 100 Shotok = 1,00,000 Square Link"
        ]
    },
    {
        title: "Acre and Shotok as Square Feet",
        items: [
            "1 Chain = 66 Feet",
            "10 Square Chain = 66 * 66",
            "Or 1 Acre Or 100 Shotok = 43569 Square Feet",
            "1 Shotok = 435.6 Square Feet"
        ]
    },
    {
        title: "Kani and Gonda as Acre and Shotok",
        items: [
            "1 Shotok = 435.6 Square Feet",
            "1 Kani Or 40 Shotok = 435.6 * 40 = 17424 Square Feet",
            "1 Kani Or 20 Gonda = 17424 Square Feet",
            "1 Gonda Or 4 Kora = 871.2 Square Feet",
            "1 Kora Or 3 Kranti = 217.8 Square Feet",
            "1 Kranti Or 20 Til = 72.6 Square Feet",
            "1 Til = 3.63 Square Feet"
        ]
    },
    {
        title: "Acre and Shotok as Borgo Hat",
        items: [
            "1 Chain = 88 Hat",
            "10 Square chain = 44 * 440 = 19360 Borgo Hat (1 Acre)",
            "1 Acre Or 100 Shotok = 19360 Borgo Hat",
            "1 Shotok = 193.6 Borgo Hat",
            "40 Shotok Or Kani = 193.6 * 40 = 7744 Square Hat"
        ]
    },
    {
        title: "Acre and Shotok as Borgo Gaz/Yard",
        items: [
            "1 Chain = 22 Gaz/Yard",
            "10 Square Chain Or 1 Acre = 220 * 22 = 4840 Borgo Gaz (Square Yard)",
            "1 Acre Or 100 Shotok = 4840 Square Gaz",
            "1 Shotok = 48.40 Barogo Gaz",
            "1 Kani Or 40 Borgo Gaz/ Square Yard = 48.40 * 40 = 1936 Bargo Gaz (Square Yard)"
        ]
    },
    {
        title: "Acre and Shotok as Square Meter",
        items: [
            "1 Chain = 2012 Meter",
            "10 Square Chain Or 1 Acre = 201.2 * 20.12 = 4047 Square Meter",
            "1 Acre Or 100 Shotok = 4047 Square Meter",
            "1 Shotok = 40.47 Square Meter"
        ]
    },
    {
        title: "Bigha and Kattah Formulas",
        items: [
            "1 Bigha = 80 Hat",
            "1 Bigha = 80 * 80 6400 Square Hat",
            "1 Bigha = 20 Kattah",
            "1 Bigha = 33 Shotok",
            "1 Bigha = 33000 Square Link",
            "1 Bigha = 6400 Square Hat",
            "1 Bigha = 1600 Borgo Gaz (Square Yard)",
            "1 Bigha = 14400 Square Feet",
            "1 Bigha = 1338 Square Meter",
            "1 Bigha = 16 Gonda 2 Kora 2 Kranti"
        ]
    },
    {
        title: "Bargohat and Bigha Formulas",
        items: [
            "1 Bigha or 20 Kattah = 6400 Bargohat (Square Hat)",
            "1 Kattah or 16 Chotak = 320 Bargohat (Square Hat)",
            "1 Chotak = 320 Bargohat (Square Hat)"
        ]
    },
    {
        title: "More Bigha and Kattah Formulas",
        items: [
            "4 Kak = 1 Kora",
            "4 Kora = 1 Gonda",
            "16 Chotak = 1 Kattah",
            "20 Kattah = 1 Bigha",
            "20 Gonda = 1 Chotak",
            "6 Bigha = 1 Gonda"
        ]
    },
    {
        title: "Bigha, Kattah and Hat Formulas",
        items: [
            "1 Bigha or 20 Kattah = 80 Hat",
            "1 Kattah or 16 Chotak = 4 Hat",
            "1 Chotak or 20 Gonda = .25 Hat",
            "1 Gonda or 4 Kora = .0125 Hat",
            "1 Kora or 4 Kak = .0031 Hat",
            "1 Kak = .0007 Hat"
        ]
    },
    {
        title: "Bargolink/Square link and Bigha",
        items: [
            "1 Bigha or 20 Kattah = 33000 Bargolink/Square link",
            "1 Kattah or 16 Chotak = 1650 Bargolink/Square link",
            "1 Chotak = 103.125 Bargolink/Square link"
        ]
    },
    {
        title: "Bargofut/Square Feet and Bigha",
        items: [
            "1 Bigha or 20 Kattah = 14,400 Bargofut/Square feet",
            "1 Kattah or 16 Chotak = 720 Bargofut/Square feet",
            "1 Chotak = 45 Bargofut/Square feet"
        ]
    },
    {
        title: "Bargogaz/Square Yard and Bigha",
        items: [
            "1 Bigha or 20 Kattah = 1600 Bargogaz/Square yard",
            "1 Kattah or 16 Chotak = 80 Bargogaz/Square yard",
            "1 Chotak = 5 Bargogaz/Square yard"
        ]
    },
    {
        title: "Bargometer/Square meter and Bigha",
        items: [
            "1 Bigha or 20 Kattah = 1338 Bargometer/Square meter",
            "1 Kattah or 16 Chotak = 66.9 Bargometer/Square meter",
            "1 Chotak = 4.18 Bargometer/Square meter"
        ]
    },
    {
        title: "Ayer/ayor and Hector Formulas",
        items: [
            "1 Hector = 10,000 Bargometer/Square meter",
            "1 Hector = 11960 Bargogaz/Square yard",
            "1 Hector = 2.47 Acre",
            "1 Hector = 100 Ayer",
            "1 Ayer = 28.9 Bigha (Approx)"
        ]
    },
    {
        title: "Bargometer/square meter, Ayer and Hector",
        items: [
            "1 Hector or 100 Ayer = 10,000 Bargometer/Square meter",
            "1 Ayer = 100 Bargometer/Square meter"
        ]
    },
    {
        title: "Shotok, Ayer and Hector Formulas",
        items: [
            "147.105 Shotok = 1 Hector or 100 Ayer",
            "247.105 Shotok = 1 Ayer"
        ]
    },
    {
        title: "Bargohat, Ayer and Hector Formulas",
        items: [
            "4789.528 Bargohat/Square Hat = 1 Hector",
            "478.39528 Borgohat = 1 Ayer"
        ]
    },
    {
        title: "Bargofut, Ayer and Hector Formulas",
        items: [
            "107639 Bargofut/Square feet = 1 Hector or 100 Ayer",
            "1076.39 Bargofut/Square feet = 1 Ayer"
        ]
    },
    {
        title: "Square Yard/ Bargogaz, Ayer and Hector",
        items: [
            "11959.882 Gaz/Yard = 1 Hector or 100 Ayer",
            "119.59882 Gaz/Yard = 1 Ayer"
        ]
    },
    {
        title: "Bigha, Kattah, Ayer and Hector",
        items: [
            "7.47494 Bigha = 1 Hector or 100 Ayer",
            "0.0747494 Bigha = 1 Ayer"
        ]
    },
    {
        title: "More Measurement Units",
        items: [
            "1 Kattah = 1.65 Shotangsho (approx)",
            "1 Kattah = 165 Ojutangsho (approx)",
            "1 Bigha = 33 Shotangsho"
        ]
    }
];

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
            document.querySelector('#openChartBtn span').textContent = '📊 ' + this.converter.bengaliLabels.ultimateChart;
            // Update unit names in dropdown
            this.updateDropdownText();
        } else {
            document.body.classList.remove('bengali-mode');
            // Reset to English
            document.querySelector('.header h1').textContent = '📐 Bangladeshi Land Measurement Converter';
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
            document.querySelector('#openChartBtn span').textContent = '📊 Ultimate Chart';
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

// Modal functionality
class ModalManager {
    constructor() {
        this.modal = document.getElementById('chartModal');
        this.openBtn = document.getElementById('openChartBtn');
        this.closeBtn = document.getElementById('closeModal');
        this.init();
    }

    init() {
        this.openBtn.addEventListener('click', () => this.openModal());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.classList.add('active');
        this.populateChart();
    }

    closeModal() {
        this.modal.classList.remove('active');
    }

    populateChart() {
        const chartContent = document.getElementById('chartContent');
        const isBengali = document.body.classList.contains('bengali-mode');
        const title = isBengali ? 'চূড়ান্ত রূপান্তর চার্ট' : 'Ultimate Conversion Chart';

        let html = `<h2 style="text-align: center; margin-bottom: 30px; color: var(--category-header);">${title}</h2>`;

        ultimateChart.forEach(section => {
            html += `<div class="chart-section">`;
            html += `<h3>${section.title}</h3>`;
            section.items.forEach(item => {
                html += `<div class="chart-item"><p>${item}</p></div>`;
            });
            html += `</div>`;
        });

        chartContent.innerHTML = html;
    }
}

// Random accent color generator - changes on every refresh
function setRandomAccent() {
    const accents = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const randomAccent = accents[Math.floor(Math.random() * accents.length)];
    document.documentElement.setAttribute('data-accent', randomAccent);
}

// Initialize converter
const converter = new LandConverter();

// Global managers
let languageManager;
let modalManager;

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
    // Set random accent color on every refresh
    setRandomAccent();

    // Initialize theme manager
    new ThemeManager();

    // Initialize language manager
    languageManager = new LanguageManager(converter);

    // Initialize modal manager
    modalManager = new ModalManager();

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
