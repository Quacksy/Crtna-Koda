// Predefined label dimensions
const labelWidth = 40; // mm
const labelHeight = 30; // mm

// Predefined text
const text1 = "Mobistekla servis";
const text2 = "www.mobistekla.si";

// Update the barcode dynamically
function updateBarcode() {
    const number = document.getElementById("number").value;

    // Generate the barcode with updated dimensions
    JsBarcode("#barcode", number, {
        format: "CODE128",
        height: 60, // Smaller barcode height
        displayValue: true,
        font: "Montserrat",
        fontSize: 24, // Larger number font size
        textMargin: 6,
    });

    // Update preview texts
    document.getElementById("text1-preview").textContent = text1;
    document.getElementById("text2-preview").textContent = text2;
}

// Print the label
function printLabel() {
    const barcodeSvg = document.getElementById("barcode").outerHTML;

    const printWindow = window.open("", "PRINT", "height=600,width=800");

    // Generate the print content
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Label</title>
                <style>
                    @page {
                        margin: 0;
                    }
                    body {
                        font-family: 'Montserrat', sans-serif;
                        margin: 0;
                        padding: 0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                    }
                    #label {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: ${labelWidth}mm;
                        height: ${labelHeight}mm;
                        box-sizing: border-box;
                        margin: auto;
                    }
                    svg {
                        width: 90%; /* Make barcode fill most of the width */
                        height: auto; /* Keep aspect ratio */
                    }
                    div {
                        white-space: nowrap;
                        font-size: 12px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                </style>
            </head>
            <body>
                <div id="label">
                    <div>${text1}</div>
                    ${barcodeSvg}
                    <div>${text2}</div>
                </div>
            </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}

function printNextNumber() {
    const numberField = document.getElementById("number");
    let currentNumber = parseInt(numberField.value, 10);

    if (isNaN(currentNumber)) {
        alert("Vnesite veljavno številko.");
        return;
    }

    const nextNumber = currentNumber + 1;
    numberField.value = nextNumber; // Update the input field
    updateBarcode(); // Update the barcode display with the new number
    printLabel(); // Print the label with the next number
}


// Initialize the label with default texts and dimensions
document.addEventListener("DOMContentLoaded", updateBarcode);
