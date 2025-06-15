// Currency codes and their corresponding country codes for flag images
const country_list = {
  "AED": "AE", "AFN": "AF", "ALL": "AL", "AMD": "AM", "ANG": "AN",
  "AOA": "AO", "ARS": "AR", "AUD": "AU", "AWG": "AW", "AZN": "AZ",
  "BAM": "BA", "BBD": "BB", "BDT": "BD", "BGN": "BG", "BHD": "BH",
  "BIF": "BI", "BMD": "BM", "BND": "BN", "BOB": "BO", "BRL": "BR",
  "BSD": "BS", "BTN": "BT", "BWP": "BW", "BYN": "BY", "BZD": "BZ",
  "CAD": "CA", "CDF": "CD", "CHF": "CH", "CLP": "CL", "CNY": "CN",
  "COP": "CO", "CRC": "CR", "CUP": "CU", "CVE": "CV", "CZK": "CZ",
  "DJF": "DJ", "DKK": "DK", "DOP": "DO", "DZD": "DZ", "EGP": "EG",
  "ERN": "ER", "ETB": "ET", "EUR": "EU", "FJD": "FJ", "FKP": "FK",
  "FOK": "FO", "GBP": "GB", "GEL": "GE", "GGP": "GG", "GHS": "GH",
  "GIP": "GI", "GMD": "GM", "GNF": "GN", "GTQ": "GT", "GYD": "GY",
  "HKD": "HK", "HNL": "HN", "HRK": "HR", "HTG": "HT", "HUF": "HU",
  "IDR": "ID", "ILS": "IL", "IMP": "IM", "INR": "IN", "IQD": "IQ",
  "IRR": "IR", "ISK": "IS", "JEP": "JE", "JMD": "JM", "JOD": "JO",
  "JPY": "JP", "KES": "KE", "KGS": "KG", "KHR": "KH", "KID": "KI",
  "KMF": "KM", "KRW": "KR", "KWD": "KW", "KYD": "KY", "KZT": "KZ",
  "LAK": "LA", "LBP": "LB", "LKR": "LK", "LRD": "LR", "LSL": "LS",
  "LYD": "LY", "MAD": "MA", "MDL": "MD", "MGA": "MG", "MKD": "MK",
  "MMK": "MM", "MNT": "MN",
  "MOP": "MO", "MRU": "MR", "MUR": "MU",
  "MVR": "MV", "MWK": "MW", "MXN": "MX", "MYR": "MY", "MZN": "MZ",
  "NAD": "NA", "NGN": "NG", "NIO": "NI", "NOK": "NO", "NPR": "NP",
  "NZD": "NZ", "OMR": "OM", "PAB": "PA", "PEN": "PE", "PGK": "PG",
  "PHP": "PH", "PKR": "PK", "PLN": "PL", "PYG": "PY", "QAR": "QA",
  "RON": "RO", "RSD": "RS", "RUB": "RU", "RWF": "RW", "SAR": "SA",
  "SBD": "SB", "SCR": "SC", "SDG": "SD", "SEK": "SE", "SGD": "SG",
  "SHP": "SH", "SLE": "SL", "SLL": "SL", "SOS": "SO", "SRD": "SR",
  "SSP": "SS", "STN": "ST", "SVC": "SV", "SYP": "SY", "SZL": "SZ",
  "THB": "TH", "TJS": "TJ", "TMT": "TM", "TND": "TN", "TOP": "TO",
  "TRY": "TR", "TTD": "TT", "TVD": "TV", "TWD": "TW", "TZS": "TZ",
  "UAH": "UA", "UGX": "UG", "USD": "US", "UYU": "UY", "UZS": "UZ",
  "VES": "VE", "VND": "VN", "VUV": "VU", "WST": "WS", "XAF": "XC",
  "XCD": "XE", "XDR": "XR", "XOF": "XO", "XPF": "XP", "YER": "YE",
  "ZAR": "ZA", "ZMW": "ZM",
  "ZWL": "ZW",
};

// API Key for CurrencyAPI.com
const API_KEY = "cur_live_7jg5bI7kkB6CNd87PKwFhBG7mLo5WLF9kWbFHjVS";

// Get references to HTML elements
const fromSelect = document.getElementById('fromSelect');
const toSelect = document.getElementById('toSelect');
const fromFlag = document.getElementById('fromFlag');
const toFlag = document.getElementById('toFlag');
const amountInput = document.getElementById('amountInput');
const msgDiv = document.querySelector('.message-display'); // Updated class selector
const getRateButton = document.querySelector('.conversion-button'); // Updated class selector
const swapIcon = document.getElementById('swapIcon');
const swapIconContainer = document.getElementById('swapIconContainer');
const popularConversionsContainer = document.getElementById('popular-conversions-container');

/**
 * Populates the select dropdowns with currency options based on the country_list.
 * Sets default values and updates flag images accordingly.
 */
function populateDropdowns() {
  // Populate "From" select
  for (let currency_code in country_list) {
    const option = document.createElement('option');
    option.value = currency_code;
    option.textContent = currency_code;
    fromSelect.appendChild(option);
  }
  fromSelect.value = "USD"; // Default "From" currency

  // Populate "To" select
  for (let currency_code in country_list) {
    const option = document.createElement('option');
    option.value = currency_code;
    option.textContent = currency_code;
    toSelect.appendChild(option);
  }
  toSelect.value = "INR"; // Default "To" currency

  updateFlag(fromSelect, fromFlag);
  updateFlag(toSelect, toFlag);
}

/**
 * Updates the flag image for a given select element.
 * @param {HTMLSelectElement} selectElement - The select element whose value determines the flag.
 * @param {HTMLImageElement} imgElement - The img element to update.
 */
function updateFlag(selectElement, imgElement) {
  const currencyCode = selectElement.value;
  const countryCode = country_list[currencyCode];
  if (countryCode) {
    const newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    imgElement.src = newSrc;
  } else {
    // Fallback if country code is not found, or API doesn't have the flag
    imgElement.src = 'https://placehold.co/64x64/cccccc/ffffff?text=Flag';
  }
}

/**
 * Fetches current exchange rates and performs the currency conversion using currencyapi.com.
 */
async function getExchangeRate() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    msgDiv.textContent = "Please enter a valid amount.";
    return;
  }

  const fromCurrency = fromSelect.value;
  const toCurrency = toSelect.value;

  // API Key validation
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      msgDiv.textContent = "Please ensure your API key is correctly set in the JavaScript code.";
      return;
  }

  const url = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`;
  msgDiv.textContent = "Getting exchange rate...";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}. Code: ${errorData.message || errorData.code}`);
    }
    const data = await response.json();

    if (data.data && data.data[toCurrency] && data.data[toCurrency].value) {
      const exchangeRate = data.data[toCurrency].value;
      const convertedAmount = (amount * exchangeRate).toFixed(2);
      msgDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } else {
      msgDiv.textContent = `Could not find exchange rate for ${toCurrency}.`;
      console.error("API response structure unexpected:", data);
    }
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    msgDiv.textContent = `Error: Failed to fetch current exchange rate. Please check your API key and internet connection.`;
  }
}

/**
 * Fetches and displays a list of popular currency conversions.
 */
async function displayPopularConversions() {
  popularConversionsContainer.innerHTML = '<h3 class="mb-4">Popular Conversions</h3><p class="text-center text-[#0f2a1d]/80">Loading popular conversions...</p>';

  const popularPairs = [
    { from: 'USD', to: 'EUR' },
    { from: 'USD', to: 'GBP' },
    { from: 'EUR', to: 'JPY' },
    { from: 'GBP', to: 'USD' },
    { from: 'AUD', to: 'USD' },
    { from: 'CAD', to: 'USD' },
    { from: 'CHF', to: 'USD' },
    { from: 'CNY', to: 'USD' },
    { from: 'INR', to: 'USD' },
  ];

  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      popularConversionsContainer.innerHTML = '<h3 class="mb-4">Popular Conversions</h3><p class="text-center text-[#e3eed4]/80">Popular conversions unavailable: API key not set.</p>';
      return;
  }

  try {
    const fetchPromises = popularPairs.map(async pair => {
      const url = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${pair.from}&currencies=${pair.to}`;
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! Status: ${response.status}. Code: ${errorData.message || errorData.code} for ${pair.from}/${pair.to}`);
      }
      const data = await response.json();
      return { pair, data };
    });

    const results = await Promise.allSettled(fetchPromises);

    // Clear previous loading message, but keep the heading
    popularConversionsContainer.innerHTML = '<h3 class="mb-4">Popular Conversions</h3>';

    let hasResults = false;
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        const { pair, data } = result.value;
        if (data.data && data.data[pair.to] && data.data[pair.to].value) {
          const rate = data.data[pair.to].value.toFixed(4);
          const conversionElement = document.createElement('div');
          // No Tailwind classes here, directly assign style properties or new custom classes
          conversionElement.className = 'popular-conversion-item';
          conversionElement.innerHTML = `
            <span>1 ${pair.from} =</span>
            <span>${rate} ${pair.to}</span>
          `;
          popularConversionsContainer.appendChild(conversionElement);
          hasResults = true;
        } else {
          console.warn(`Could not get data for ${pair.from} to ${pair.to}. API response unexpected.`);
        }
      } else {
        console.error("Failed to fetch popular conversion:", result.reason);
      }
    });

    if (!hasResults) {
        popularConversionsContainer.innerHTML += "<p class='text-center text-[#aec3b0]'>Failed to load popular conversions.</p>";
    }

  } catch (error) {
    console.error("Error displaying popular conversions:", error);
    popularConversionsContainer.innerHTML = `<h3 class="mb-4">Popular Conversions</h3><p class='text-center text-[#aec3b0]'>Error loading popular conversions: ${error.message}.</p>`;
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  populateDropdowns();
  getExchangeRate(); // Perform initial conversion
  displayPopularConversions(); // Load popular conversions
});

fromSelect.addEventListener('change', () => {
  updateFlag(fromSelect, fromFlag);
  getExchangeRate();
});

toSelect.addEventListener('change', () => {
  updateFlag(toSelect, toFlag);
  getExchangeRate();
});

getRateButton.addEventListener('click', (event) => {
  event.preventDefault();
  getExchangeRate();
});

amountInput.addEventListener('input', () => {
  if (amountInput.value === '' || parseFloat(amountInput.value) <= 0) {
      amountInput.value = '1';
  }
  getExchangeRate();
});

// Event listener for the swap icon container
swapIconContainer.addEventListener('click', () => {
  const tempFromValue = fromSelect.value;
  const tempToValue = toSelect.value;

  fromSelect.value = tempToValue;
  toSelect.value = tempFromValue;

  updateFlag(fromSelect, fromFlag);
  updateFlag(toSelect, toFlag);
  getExchangeRate();
});
