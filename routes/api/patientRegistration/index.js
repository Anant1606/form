const router = require("express").Router();
const { PDFDocument } = require("pdf-lib");
const { readFile, writeFile } = require("fs/promises");

// The `/api/registration` endpoint
router.post("/", async (req, res) => {
  async function createPDF(input, userInput, output) {
    try {
      // Get the PDF and Form
      const pdfDoc = await PDFDocument.load(await readFile(input));
      const form = pdfDoc.getForm();

      // Update the Form Fields for main details
      form.getTextField("To").setText(userInput.to);
      form.getTextField("From").setText(userInput.from);
      form.getTextField("Date").setText(userInput.date);
      form.getTextField("Status").setText(userInput.status);

      // Update the Form Fields for each product
      userInput.products.forEach((product, index) => {
        form.getTextField(`SR NO ${index + 1}`).setText(product.srNo);
        form.getTextField(`Item ${index + 1}`).setText(product.item);
        form.getTextField(`Make ${index + 1}`).setText(product.make);
        form.getTextField(`Quantity ${index + 1}`).setText(product.quantity);
        form.getTextField(`UOM ${index + 1}`).setText(product.uom);
        form.getTextField(`Price ${index + 1}`).setText(product.price);
        form.getTextField(`Discount ${index + 1}`).setText(product.discount);
      });

      // Save the Updated PDF
      form.flatten();
      const newPDF = await pdfDoc.save();
      await writeFile(output, newPDF);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  const pdfCreated = await createPDF(
    "routes/api/patientRegistration/Anant.pdf",
    req.body,
    "output/results.pdf"
  );

  if (pdfCreated) {
    res.status(200).json({ message: "PDF created successfully!" });
  } else {
    res.status(500).json({ message: "Failed to create PDF." });
  }
});

module.exports = router;
