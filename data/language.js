let translations = {}; // Object to store translations
const enlang = document.getElementById("enlang");
const hulang = document.getElementById("hulang");
// Load JSON data
fetch('/data/languages.json')
.then(response => {
    if (!response.ok) {
        throw new Error(`Failed to load JSON: ${response.statusText}`);
    }
    return response.json();
})
.then(data => {
    translations = data;
    setDefaultLanguage();
})
.catch(error => console.error('Error loading language file:', error));
try {
    enlang.addEventListener("click", () => changeLanguage('en'));
    hulang.addEventListener("click", () => changeLanguage('hu'));
} catch(error){};

function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error('Language not found:', lang);
        return;
    }

    // Find all elements with `data-lang` and update their content
    document.querySelectorAll("[data-lang]").forEach(element => {
        const key = element.getAttribute("data-lang");
        if (translations[lang][key]) {
            const translation = translations[lang][key];
      element.innerHTML = Array.isArray(translation) 
        ? translation.join("<br>") // add line breaks
        : translation.replace(/\\n/g, "<br>");
        }
    });

    // Save language selection in localStorage
    localStorage.setItem('selectedLanguage', lang);
}

// Set default language based on browser preference or saved language
function setDefaultLanguage() {
    const savedLang = localStorage.getItem('selectedLanguage'); // Check if language was saved
    const userLang = navigator.language.slice(0,2); // Get browser language
    const defaultLang = savedLang || (translations[userLang] ? userLang : 'en'); // Use browser language if available
    changeLanguage(defaultLang);
}

