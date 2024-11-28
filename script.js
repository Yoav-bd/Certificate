// Translations Object
const translations = {
    en: {
        documentTitle: 'Certificate of Authenticity',
        certificateTitle: 'Certificate of Authenticity',
        artistNameLabel: 'Artist Name*',
        artworkTitleLabel: 'Artwork Title*',
        editionLabel: 'Edition*',
        artisticProofExplanation: '** Artist\'s Proofs are the copies of the original that the artist is keeping for personal use. (Not a mandatory field)',
        mediaLabel: 'Media*',
        mediaFineArtOption: 'Archival Pigment Print On Fine Art Paper',
        mediaCustomLabel: 'Custom Text',
        dimensionsLabel: 'Dimensions (cm)*',
        includingWhiteBorders: 'includes white border',
        yearCreatedLabel: 'Year Created*',
        yearPrintedLabel: 'Year Printed',
        theArtworkLabel: 'The Artwork*',
        fileUploadLabel: 'File Upload',
        smallVersionNote: 'Small version of the artwork. Up to 1 Mb. Jpg files only',
        digitalSignatureLabel: 'Digital Signature',
        addDigitalSignature: 'Add a digital signature',
        upTo1MbNote: 'Up to 1 Mb. Jpg files only',
        saveAs: 'Save as PDF',
        mandatoryFieldsNote: 'All fields with * are mandatory. Fields that are not filled in will not appear in the certificate',
        orText: 'or',
        drawSignatureTitle: 'Draw Your Signature',
        clearButton: 'Clear',
        saveButton: 'Save',
        closeButton: 'Close',
        widthPlaceholder: 'Width',
        heightPlaceholder: 'Height',
        warning: 'Please fill out all mandatory fields',
        editionPlaceHolder1: 'Edition No.',
        editionPlaceHolder2: 'Edition Of',
        editionPlaceHolder3: 'Total AP**',
    },
    he: {
        description1: 'ניתן להוסיף להדפסה תעודת מקוריות על מסמך מעוצב שלנו, עליכם למלא את הפרטים, להוסיף תמונה מוקטנת של העבודה, ולשמור כקובץ PDF אותו אתם יכולים להוריד לשימושכם.',
        description2: 'במידה ותרצו שנדפיס את התעודה, ניתן לבחור בין שתי אופציות של ניירות בגודל A4, נייר פיין ארט מט 200 גרם בעלות של 35 ש"ח, או על נייר ייעודי של חברת HAHNEMUHLE שמגיע עם זוג מדבקות הולגרמה תואמות לתעודה ולעבודה, בעלות של 70 ש"ח.',
        documentTitle: 'תעודה מקורית',
        certificateTitle: 'תעודת מקוריות',
        artistNameLabel: 'שם האמן (אנגלית)*',
        artworkTitleLabel: 'שם היצירה (אנגלית)*',
        editionLabel: 'מהדורה*',
        artisticProofExplanation: '** Artist\'s Proofs - מהדורה נוספת של עותקים שהאמן שומר לשימושו האישי (שדה לא חובה)',
        mediaLabel: 'טכניקה וחומרים*',
        mediaCustomLabel: 'טקסט חופשי (אנגלית)',
        dimensionsLabel: 'מידות היצירה (ס״מ)*',
        includingWhiteBorders: 'כולל שוליים לבנים',
        yearCreatedLabel: 'שנת היצירה*',
        yearPrintedLabel: 'שנת הדפסה',
        theArtworkLabel: 'היצירה*',
        fileUploadLabel: 'העלאת קובץ',
        smallVersionNote: 'גרסה מוקטנת של היצירה. עד 1 מ״ב, פורמט JPG בלבד.',
        digitalSignatureLabel: 'חתימה דיגיטלית',
        addDigitalSignature: 'הוסף חתימה דיגיטלית',
        upTo1MbNote: 'עד 1 מ״ב, פורמט JPG בלבד.',
        saveAs: 'שמור כ-PDF',
        mandatoryFieldsNote: 'כל השדות המסומנים בכוכבית (*) הן חובה. שדות שלא ימולאו לא יופיעו בתעודה.',
        orText: 'או',
        drawSignatureTitle: 'צייר את החתימה שלך',
        clearButton: 'נקה',
        saveButton: 'שמור',
        closeButton: 'סגור',
        widthPlaceholder: 'רוחב',
        heightPlaceholder: 'גובה',
        warning: 'נא למלא את כל שדות החובה',
        editionPlaceHolder1: 'מספר עותק',
        editionPlaceHolder2: 'סה״כ עותקים',
        editionPlaceHolder3: 'סה"כ AP** ',
    }
};

// Messages for Alerts
const messages = {
    en: {
        signatureSaved: 'Signature saved successfully!',
        provideSignature: 'Please provide a signature first.',
        signatureUploaded: 'Signature uploaded successfully!',
        artworkUploaded: 'Artwork uploaded successfully!',
        // Additional messages...
    },
    he: {
        signatureSaved: 'החתימה נשמרה בהצלחה!',
        provideSignature: 'אנא ספק חתימה תחילה.',
        signatureUploaded: 'החתימה הועלתה בהצלחה!',
        artworkUploaded: 'היצירה הועלתה בהצלחה!',
        // Additional messages...
    }
};

// Global Variables
let signaturePad;
let signatureImage; // Holds the signature image data
let artworkImage;   // Holds the artwork image data

// Get Language from URL
function getLanguageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    return lang || 'en'; // default to English if no lang parameter
}

// Set Text Direction Based on Language
function setLanguageDirection(lang) {
    if (lang === 'he') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'he');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
    }
}

// Translate Page Content
function translatePage(lang) {
    const elementsToTranslate = document.querySelectorAll('[data-translate]');

    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = translations[lang][key];

        if (translation) {
            if (element.tagName === 'INPUT') {
                // Update the placeholder for input fields
                element.placeholder = translation;
            } else if (element.tagName === 'BUTTON' || (element.tagName === 'INPUT' && element.type === 'submit')) {
                // Set text for buttons or submit inputs
                element.innerText = translation;
                element.value = translation;
            } else {
                // For other elements (e.g., <label>, <p>)
                element.textContent = translation;
            }
        }
    });
}


// Initialize Event Listeners
function addEventListeners(lang) {
    // Signature Elements
    const clearButton = document.getElementById('clearSignature');
    const saveButton = document.getElementById('saveSignature');
    const closeButton = document.getElementById('closePopup');
    const signatureFileInput = document.getElementById('signatureFileInput');
    const signatureUploadedInfo = document.getElementById('signatureUploadedInfo');
    const signatureUploadedFileName = document.getElementById('signatureUploadedFileName');
    const removeSignatureIcon = document.getElementById('removeSignatureIcon');

    // Artwork Elements
    const imageInput = document.getElementById('imageInput');
    const uploadedFileInfo = document.getElementById('uploadedFileInfo');
    const uploadedFileName = document.getElementById('uploadedFileName');
    const removeFileIcon = document.getElementById('removeFileIcon');

    // Open Signature Popup
    window.openSignaturePopup = function () {
        document.getElementById('signaturePopup').style.display = 'block';
        const canvas = document.getElementById('signatureCanvas');
        signaturePad = new SignaturePad(canvas);
    }

    // Clear Signature
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (signaturePad) {
                signaturePad.clear();
            }
        });
    }

    // Save Drawn Signature
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            if (signaturePad && !signaturePad.isEmpty()) {
                signatureImage = signaturePad.toDataURL();
                document.getElementById('signaturePopup').style.display = 'none';
                // Display "Digital Signature" in the info section
                signatureUploadedFileName.textContent = translations[lang]['digitalSignatureLabel'];
                signatureUploadedInfo.style.display = "flex";
                // Add the required classes
                signatureUploadedInfo.classList.add("uploaded-file", "w-100", "d-flex", "justify-content-between", "align-items-center");
            } else {
                alert(messages[lang].provideSignature);
            }
        });
    }

    // Close Signature Popup
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            document.getElementById('signaturePopup').style.display = 'none';
        });
    }

    // Signature File Upload
    signatureFileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = function () {
                signatureImage = fileReader.result; // Set the signatureImage to the uploaded file's data URL
                // Display the uploaded file name
                signatureUploadedFileName.textContent = file.name;
                signatureUploadedInfo.style.display = "flex";
                // Add the required classes
                signatureUploadedInfo.classList.add("uploaded-file", "w-100", "d-flex", "justify-content-between", "align-items-center");

            };
            fileReader.readAsDataURL(file); // Read the file as Data URL
        }
    });

    // Remove Signature
    removeSignatureIcon.addEventListener('click', () => {
        // Clear the signatureImage variable
        signatureImage = null;
        // Hide the signature info display
        signatureUploadedInfo.style.display = "none";
        // Remove the classes
        signatureUploadedInfo.classList.remove("uploaded-file", "w-100", "d-flex", "justify-content-between", "align-items-center");
        // Also clear the signature file input
        signatureFileInput.value = '';
        // If a drawn signature was made, clear the canvas
        if (signaturePad) {
            signaturePad.clear();
        }
    });

    // Artwork File Upload
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            // Display the uploaded file name
            uploadedFileName.textContent = file.name;
            uploadedFileInfo.style.display = "flex";
            // Add the required classes
            uploadedFileInfo.classList.add("uploaded-file", "w-100", "d-flex", "justify-content-between", "align-items-center");

            // Read the file as Data URL for later use in PDF generation
            const fileReader = new FileReader();
            fileReader.onloadend = function () {
                artworkImage = fileReader.result; // Store the artwork image data
            };
            fileReader.readAsDataURL(file); // Read the file as Data URL
        } else {
            // Hide file info
            uploadedFileInfo.style.display = "none";
            // Remove the classes
            uploadedFileInfo.classList.remove("uploaded-file", "w-100", "d-flex", "justify-content-between", "align-items-center");
        }
    });

    // Remove Artwork File
    removeFileIcon.addEventListener('click', () => {
        // Reset the file input
        imageInput.value = '';
        // Hide file info
        uploadedFileInfo.style.display = "none";
        // Remove the classes
        uploadedFileInfo.classList.remove("uploaded-file", "w-100", "d-flex", "justify-content-between", "align-items-center");
        // Clear the artwork image data
        artworkImage = null;
    });

    // Toggle Custom Media Input
    function toggleCustomMediaInput() {
        var customMediaRadio = document.getElementById("mediaCustom");
        var customMediaInput = document.getElementById("CustomMedia");

        if (customMediaRadio.checked) {
            customMediaInput.disabled = false;  // Enable input if the custom media radio is selected
        } else {
            customMediaInput.disabled = true;   // Disable input if the custom media radio is not selected
            customMediaInput.value = "";        // Optionally clear the input value when disabled
        }
    }

    // Add event listeners to the radio buttons
    document.getElementById("mediaFineArt").addEventListener("change", toggleCustomMediaInput);
    document.getElementById("mediaCustom").addEventListener("change", toggleCustomMediaInput);

    // Initialize the custom media input state
    toggleCustomMediaInput();
}


function validateForm() {
    // Hide the warning message initially
    document.getElementById("mandatoryWarning").style.display = "none";

    const requiredFields = [
        { id: "artistNameInput", label: "Artist Name" },
        { id: "artworkTitleInput", label: "Artwork Title" },
        { id: "editionNumberInput", label: "Edition Number" },
        { id: "editionTotalInput", label: "Edition Total" },
        { id: "dimensionsWidth", label: "Dimensions Width" },
        { id: "dimensionsHeight", label: "Dimensions Height" },
        { id: "yearCreatedInput", label: "Year Created" }
    ];

    for (const field of requiredFields) {
        const input = document.getElementById(field.id);
        if (!input.value.trim()) {
            document.getElementById("mandatoryWarning").style.display = "block";
            input.focus();  // Focus on the first empty field
            return false;
        }
    }

    // Check if artwork file is uploaded
    if (!artworkImage) {
        document.getElementById("mandatoryWarning").style.display = "block";
        document.getElementById("imageInput").focus();
        return false;
    }

    // Check if a media option is selected
    const mediaSelected = document.querySelector('input[name="media"]:checked');
    if (!mediaSelected) {
        document.getElementById("mandatoryWarning").style.display = "block";
        document.getElementById("mediaFineArt").focus();
        return false;
    }

    return true;
}


// Generate and Download PDF
function generateAndDownloadPDF() {


    if (!validateForm()) {
        return;  // Stop if any required fields are missing
    }


    const lang = getLanguageFromURL();

    // Fetching input data from the form
    var artistName = document.getElementById("artistNameInput").value;
    var artworkTitle = document.getElementById("artworkTitleInput").value;

    // Edition values
    var editionNumber = document.getElementById("editionNumberInput").value;
    var editionTotal = document.getElementById("editionTotalInput").value;
    var editionAP = document.getElementById("editionAPInput").value;

    let edition = `${editionNumber}/${editionTotal}`;
    if (editionAP.trim() !== "") {
        edition += ` + ${editionAP} AP`;
    }

    // Dimensions
    var dimensionsWidth = document.getElementById("dimensionsWidth").value;
    var dimensionsHeight = document.getElementById("dimensionsHeight").value;
    var dimensions = ` ${dimensionsHeight}cm  x  ${dimensionsWidth}cm`;

    var includeWhiteBorders = document.getElementById("includeWhiteBorders").checked;
    if (includeWhiteBorders) {
        dimensions += " (includes white border)";
    }

    // Media selection
    var selectedMedia = document.querySelector('input[name="media"]:checked');
    var media = '';

    if (selectedMedia && selectedMedia.id === "mediaCustom") {
        // If the custom media is selected, use the custom text input value
        media = document.getElementById("CustomMedia").value;
    } else if (selectedMedia) {
        // Otherwise, use the predefined radio button value
        media = selectedMedia.value;
    }

    // Year values
    var yearCreated = document.getElementById("yearCreatedInput").value;
    var yearPrinted = document.getElementById("yearPrintedInput").value;

    // Use artworkImage instead of reading from the file input
    var imageUrl = artworkImage || '';

    // Define the content that matches your certificate design
    var certificateContent = `
        <div style="text-align: center; direction: ltr;">
    <div
        style="width: 199mm; height: 285mm; margin: 20px; text-align: center; font-family: Arial, sans-serif; border: 2px solid black; box-sizing: border-box; page-break-inside: avoid;">
        <!-- First inner black box -->
        <div
            style="width: 196mm; height: 282mm; margin: 1mm; border: 1px solid black; box-sizing: border-box; page-break-inside: avoid;">
            <!-- Second inner black box -->
            <div
                style="width: 194.5mm; height: 280.5mm; margin: 0.5mm; border: 1px solid black; box-sizing: border-box; page-break-inside: avoid;">

                <h1
                    style=" font-weight:400; font-family:'CaslonIonic'; font-size: 45px; margin: 10px; margin-top: 60px;  line-height: 1.2;">
                    <span style="display: block;">CERTIFICATE OF</span>
                    <span style="display: block;">AUTHENTICITY</span>
                </h1>
                <p
                    style="margin-top: 30px; margin-bottom:50px; font-weight:400; font-family:'CaslonIonic'; font-size: 18px;">
                    THIS DOCUMENT CERTIFIES THAT THIS ARTWORK IS <br> AN ORIGINAL WORK BY THE ARTIST
                </p>
                <div
                    style="width: 500px; height: 250px; margin: 20px auto; display: flex; justify-content: center; align-items: center;">
                    <img src="${imageUrl}" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
                <p style="margin-top: 70px; font-family:'CaslonIonic'; font-size: 16px;">${artistName}</p>
                <p style="margin-top: -18px; margin-bottom: 30px; font-family:'QuadrantMono';  font-size: 15px;">
                    ${artworkTitle}</p>
                <p
                    style="margin-top: 10px; margin-bottom: 15px; font-size: 18px; font-family:'QuadrantMono'; font-weight: 300; font-size: 15px;">
                    Edition: ${edition}</p>
                <p
                    style="margin-top: -15px; margin-bottom: 15px; font-size: 18px; font-family:'QuadrantMono'; font-weight: 300; font-size: 15px;">
                    Media: ${media}</p>
                <p
                    style="margin-top: -15px; margin-bottom: 15px; font-size: 18px; font-family:'QuadrantMono'; font-weight: 300; font-size: 15px;">
                    Dimensions: ${dimensions}</p>
                <p
                    style="margin-top: -15px; margin-bottom: 15px; font-size: 18px; font-family:'QuadrantMono'; font-weight: 300; font-size: 15px;">
                    Year Created: ${yearCreated}</p>
                ${yearPrinted
            ? `<p
                    style="margin-top: -15px; margin-bottom: 15px; font-size: 18px; font-family:'QuadrantMono'; font-weight: 300; font-size: 15px;">
                    Year Printed: ${yearPrinted}</p>`
            : `<div style="margin-bottom: 35px;"></div>`}
                <div
                    style="width: 230px; height: 80px; margin: 0px auto; display: flex; justify-content: center; align-items: center;">
                    <img src="${signatureImage}" alt="Signature"
                        style="max-width: 100%; max-height: 100%; object-fit: contain;">
                </div>
                <div style="width: 50%; border-top: 1px solid black; margin: 0 auto;"></div>
                <div style="font-family:'QuadrantMono'; font-weight: 300; font-size: 10px; margin-top: 2px;">${artistName}</div>


                <div style="margin-top: 70px; padding-top: 5px;">

                    <div style="width: 95%; border-top: 1px solid black; margin: 0 auto 10px auto;"></div>


                    <div
                        style="margin-top:-5px;display: flex; justify-content: space-between;  width: 100%; overflow: visible;">

                        <svg style="margin-top: 5px; flex-shrink: 0; " width="200" height="19" viewBox="0 0 93 13"
                            fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.0838 8.51002L13.0871 8.23003V2.87525H11.9322L11.3488 4.31019H10.7422V2.19861H16.9603V4.31019H16.3536L15.7353 2.87525H14.627V8.23003L15.5953 8.49835V9H12.0838V8.51002ZM17.311 8.52169L18.1626 8.25336V1.74363H17.2293V1.24199L18.8276 0.798672H19.5159V4.34519C20.0875 3.90188 20.7525 3.58689 21.5224 3.58689C22.4907 3.58689 23.0741 4.26353 23.0741 5.53514V8.25336L23.879 8.51002V9H20.8691V8.52169L21.7091 8.2417V5.8618C21.7091 4.95183 21.2891 4.57852 20.5658 4.57852C20.2042 4.57852 19.8075 4.70684 19.5159 4.83517V8.23003L20.3208 8.51002V9H17.311V8.52169ZM27.6806 8.19503C28.1123 8.19503 28.6956 8.07837 29.2089 7.83338L29.3839 8.09004C28.9989 8.58002 28.0189 9.09333 27.0506 9.09333C25.429 9.09333 24.4257 8.1717 24.4257 6.46844C24.4257 4.70684 25.6624 3.58689 27.1556 3.58689C28.6489 3.58689 29.4655 4.56685 29.4772 6.30511H25.8607C25.8957 7.56506 26.6773 8.19503 27.6806 8.19503ZM26.9923 4.2402C26.4673 4.2402 26.0007 4.64851 25.8957 5.69847L27.9839 5.62847C27.9373 4.80017 27.6456 4.2402 26.9923 4.2402ZM32.6706 8.51002L33.6622 8.23003V2.99191L32.6706 2.70026V2.19861H36.2637C37.7453 2.19861 38.772 2.86359 38.772 4.34519C38.772 5.58181 37.792 6.43344 35.7854 6.43344H35.2021V8.23003L36.1704 8.49835V9H32.6706V8.51002ZM35.2021 2.88692V5.7568H35.5638C36.5787 5.74513 37.127 5.37182 37.127 4.35686C37.127 3.42356 36.6137 2.91025 35.6338 2.88692H35.2021ZM38.9723 4.56685V4.0652L40.6056 3.58689H41.0023L41.1773 4.1702C41.6556 3.83188 42.2505 3.58689 42.7755 3.58689C42.9622 3.58689 43.1255 3.59856 43.3122 3.64522L43.0905 5.0335H42.8455L41.6789 4.49685H41.2589V8.19503L42.1806 8.51002V9H39.1123V8.52169L39.894 8.2767V4.56685H38.9723ZM45.2468 1.04366C45.7718 1.04366 46.1101 1.33532 46.1101 1.83696C46.1101 2.32694 45.7718 2.63026 45.2468 2.63026C44.7335 2.63026 44.3718 2.32694 44.3718 1.83696C44.3718 1.33532 44.7335 1.04366 45.2468 1.04366ZM43.6719 8.52169L44.5118 8.25336V4.56685H43.5902V4.0652L45.2935 3.58689H45.8768V8.21837L46.7401 8.51002V9H43.6719V8.52169ZM47.3897 8.52169L48.2297 8.2417V4.56685H47.308V4.0652L48.9413 3.58689H49.338L49.5713 4.36852C50.1313 3.90188 50.7846 3.58689 51.5545 3.58689C52.5228 3.58689 53.1411 4.21686 53.1411 5.53514V8.25336L53.9461 8.51002V9H50.9479V8.52169L51.7762 8.2417V5.8618C51.7762 4.95183 51.3562 4.56685 50.6329 4.56685C50.2712 4.56685 49.8746 4.70684 49.5946 4.83517V8.2417L50.3879 8.51002V9H47.3897V8.52169ZM58.2176 8.72001C57.751 8.95334 57.261 9.09333 56.6193 9.09333C55.6977 9.09333 54.8927 8.72001 54.9044 7.3784V4.48519H54.1344V3.97187L54.9511 3.69189L55.4061 2.28028H56.281V3.69189H58.031V4.48519H56.281V7.3434C56.2927 8.06671 56.7827 8.3117 57.366 8.3117C57.611 8.3117 57.8793 8.26503 58.1243 8.19503L58.2176 8.72001ZM65.6639 8.51002L66.6556 8.2417V5.85013H63.7973V8.23003L64.7656 8.49835V9H61.2891V8.51002L62.2807 8.23003V2.99191L61.2891 2.70026V2.19861H64.7656V2.68859L63.7973 2.95692V5.22016H66.6556V2.99191L65.6639 2.70026V2.19861H69.1405V2.68859L68.1605 2.95692V8.21837L69.1405 8.49835V9H65.6639V8.51002ZM72.5757 9.09333C71.1408 9.09333 69.9625 8.46336 69.9625 6.43344C69.9625 4.68351 71.3508 3.58689 72.6691 3.58689C74.2207 3.58689 75.294 4.36852 75.294 6.37511C75.294 8.07837 73.9407 9.09333 72.5757 9.09333ZM72.5524 4.2052C71.6074 4.2052 71.4441 5.17349 71.4441 6.21178C71.4441 7.43673 71.7474 8.42836 72.6807 8.42836C73.6024 8.42836 73.8007 7.53006 73.8007 6.5151C73.8007 5.46515 73.6024 4.2052 72.5524 4.2052ZM80.079 8.33503C79.3907 8.895 78.819 9.09333 78.1307 9.09333C77.1741 9.09333 76.6024 8.45169 76.6024 7.18008V4.56685H75.6692V4.0652L77.3841 3.58689H77.9674V6.66676C77.9674 7.70505 78.3757 8.09004 79.0407 8.09004C79.3557 8.09004 79.6823 8.00837 79.9973 7.86838V4.56685H79.0757V4.0652L80.7789 3.58689H81.3622V8.1717L82.1089 8.51002V9H80.2423L80.079 8.33503ZM82.6866 8.80167V7.2734H83.5266L83.8299 8.25336C84.1099 8.40502 84.4365 8.48669 84.7515 8.48669C85.2532 8.48669 85.6965 8.26503 85.6965 7.78672C85.6965 6.57343 82.7099 7.21507 82.7099 5.23182C82.7099 4.15853 83.7482 3.58689 84.9732 3.58689C85.6265 3.58689 86.2798 3.69189 86.8048 3.93688V5.25515H86.0231L85.7315 4.41519C85.4748 4.27519 85.1715 4.2052 84.8798 4.2052C84.4015 4.2052 83.9699 4.40352 83.9699 4.84684C83.9699 6.15345 86.9798 5.33682 86.9798 7.39007C86.9798 8.46336 85.9181 9.09333 84.6349 9.09333C84.0749 9.09333 83.3399 8.97667 82.6866 8.80167ZM90.8419 8.19503C91.2736 8.19503 91.8569 8.07837 92.3702 7.83338L92.5452 8.09004C92.1602 8.58002 91.1803 9.09333 90.212 9.09333C88.5904 9.09333 87.5871 8.1717 87.5871 6.46844C87.5871 4.70684 88.8237 3.58689 90.317 3.58689C91.8102 3.58689 92.6269 4.56685 92.6385 6.30511H89.022C89.057 7.56506 89.8387 8.19503 90.8419 8.19503ZM90.1536 4.2402C89.6287 4.2402 89.162 4.64851 89.057 5.69847L91.1453 5.62847C91.0986 4.80017 90.8069 4.2402 90.1536 4.2402Z"
                                fill="#222222" />
                            <path
                                d="M2.15888 2L0 4L0.719626 7.2L3.66355 9L6.28037 7.53333L7 5.8V4.33333L6.08411 2.46667L2.15888 2Z"
                                fill="#222222" />
                        </svg>

                        <p
                            style=" margin-top: 5px; font-family:'Caslon Ionic'; font-weight: bold; font-size:10px; margin-right: 30px; text-align: left; font-family: 'Arial', sans-serif;">
                            Hazerem 1 St. Tel Aviv, Israel <br> www.theprinthouse.co.il
                        </p>
                    </div>
                </div>


            </div> <!-- End second inner black box -->
        </div> <!-- End first inner black box -->
    </div> <!-- End outermost black box -->
</div>
        `;

    // Use html2pdf.js to generate the PDF
    var opt = {
        margin: [0.5, 0.5, 0.5, 0.5],  // Set margins to avoid cutting off the edges
        filename: 'Certificate_of_Authenticity.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },  // Increased scaling for better resolution
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }  // Using A4 paper size and orientation
    };

    // Generate the PDF from the certificateContent
    html2pdf().from(certificateContent).set(opt).save();
}



function makeRadioButtonsDeselectable() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');

    radioButtons.forEach(radio => {
        radio.addEventListener('click', function () {
            // Toggle the custom 'data-was-checked' attribute
            if (radio.hasAttribute('data-was-checked')) {
                radio.checked = false;
                radio.removeAttribute('data-was-checked');
            } else {
                radio.setAttribute('data-was-checked', true);
            }
        });

        // Ensure the 'data-was-checked' attribute is removed when clicking another radio in the same group
        radio.addEventListener('change', function () {
            radioButtons.forEach(otherRadio => {
                if (otherRadio !== radio) {
                    otherRadio.removeAttribute('data-was-checked');
                }
            });
        });
    });
}

// Initialize the App on Page Load
document.addEventListener('DOMContentLoaded', function () {
    const lang = getLanguageFromURL();
    setLanguageDirection(lang);
    translatePage(lang);
    addEventListeners(lang);
    makeRadioButtonsDeselectable();
});
