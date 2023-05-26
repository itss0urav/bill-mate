import React, { useState, useRef } from "react";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Box,
} from "@mui/material";
import { savePDF } from "@progress/kendo-react-pdf";

const BillForm = () => {
    const [invoiceNumber, setInvoiceNumber] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [billToName, setBillToName] = useState("");
    const [billToEmail, setBillToEmail] = useState("");
    const [billToAddress, setBillToAddress] = useState("");
    const [billFromName, setBillFromName] = useState("");
    const [billFromEmail, setBillFromEmail] = useState("");
    const [billFromAddress, setBillFromAddress] = useState("");
    const [item, setItem] = useState({
        name: "",
        description: "",
        quantity: "",
        price: "",
    });
    const [items, setItems] = useState([]);
    const [taxRate, setTaxRate] = useState(0);
    const [discountRate, setDiscountRate] = useState(0);
    const [notes, setNotes] = useState("");
    const containerRef = useRef(null);

    const handleAddItem = () => {
        setItems([...items, item]);
        setItem({ name: "", description: "", quantity: "", price: "" });
    };

    const handleDeleteItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);
        setItems(updatedItems);
    };

    const calculateSubtotal = () => {
        let subtotal = 0;
        items.forEach((item) => {
            subtotal += parseFloat(item.quantity) * parseFloat(item.price);
        });
        return subtotal.toFixed(2);
    };

    const calculateTotal = () => {
        const subtotal = parseFloat(calculateSubtotal());
        const tax = (subtotal * taxRate) / 100;
        const discount = (subtotal * discountRate) / 100;
        return (subtotal + tax - discount).toFixed(2);
    };

    const handleCreateBill = () => {
        const styles = `
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .invoice {
              margin: 20px auto;
              max-width: 800px;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #fff;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .bill-info {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            .bill-info > div {
              width: 50%;
            }
            .item-list {
              margin-bottom: 20px;
            }
            .item-list ul {
              list-style-type: none;
              padding: 0;
              margin: 0;
            }
            .item {
              margin-bottom: 10px;
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              background-color: #f9f9f9;
            }
            .item > p {
              margin: 0;
            }
            .item-delete {
              text-align: right;
            }
            .subtotal {
              text-align: right;
              margin-bottom: 10px;
            }
            .notes {
              margin-top: 20px;
            }
          </style>
        `;
      
        const content = `
          <div class="invoice">
            <div class="header">
              <h2>Invoice</h2>
            </div>
            <div class="bill-info">
              <div>
                <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
                <p><strong>Due Date:</strong> ${dueDate}</p>
              </div>
              <div>
                <p><strong>Bill To:</strong></p>
                <p>${billToName}</p>
                <p>${billToEmail}</p>
                <p>${billToAddress}</p>
              </div>
            </div>
            <div class="bill-info">
              <div>
                <p><strong>Bill From:</strong></p>
                <p>${billFromName}</p>
                <p>${billFromEmail}</p>
                <p>${billFromAddress}</p>
              </div>
              <div>
                <p><strong>Items:</strong></p>
                <div class="item-list">
                  <ul>
                    ${items
                      .map(
                        (item, index) => `
                        <li class="item">
                          <p><strong>Item ${index + 1}</strong></p>
                          <p><strong>Name:</strong> ${item.name}</p>
                          <p><strong>Description:</strong> ${item.description}</p>
                          <p><strong>Quantity:</strong> ${item.quantity}</p>
                          <p><strong>Price:</strong> ${item.price}</p>
                          <p><strong>Subtotal:</strong> ${
                            parseFloat(item.quantity) * parseFloat(item.price)
                          }</p>
                          <div class="item-delete">
                            <button onclick="handleDeleteItem(${index})">Delete</button>
                          </div>
                        </li>
                      `
                      )
                      .join("")}
                  </ul>
                </div>
              </div>
            </div>
            <div class="subtotal">
              <p><strong>Subtotal:</strong> ${calculateSubtotal()}</p>
              <p><strong>Tax:</strong> ${
                ((calculateSubtotal() * taxRate) / 100).toFixed(2)
              }</p>
              <p><strong>Discount:</strong> ${
                ((calculateSubtotal() * discountRate) / 100).toFixed(2)
              }</p>
              <p><strong>Total:</strong> ${calculateTotal()}</p>
            </div>
            <div class="notes">
              <p><strong>Notes:</strong></p>
              <p>${notes}</p>
            </div>
          </div>
        `;
      
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Invoice</title>
              ${styles}
            </head>
            <body>
              ${content}
            </body>
          </html>
        `;
      
        const container = document.createElement("div");
        container.innerHTML = htmlContent;
      
        // Attach the container to the document
        if (containerRef.current) {
          containerRef.current.appendChild(container);
        }
      
        // Save the PDF using the container element
        savePDF(container, { paperSize: "A4" });
      
        // Remove the container from the document
        if (containerRef.current) {
          containerRef.current.removeChild(container);
        }
      };
      

    return (
        <Container maxWidth="md" sx={{ marginTop: "50px" }}>
            <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "30px" }}>
                Bill Creation
            </Typography>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Invoice Number"
                            fullWidth
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Due Date"
                            type="date"
                            fullWidth
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Bill To:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={billToName}
                            onChange={(e) => setBillToName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={billToEmail}
                            onChange={(e) => setBillToEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Billing Address"
                            multiline
                            rows={4}
                            fullWidth
                            value={billToAddress}
                            onChange={(e) => setBillToAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Bill From:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Name"
                            fullWidth
                            value={billFromName}
                            onChange={(e) => setBillFromName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            fullWidth
                            value={billFromEmail}
                            onChange={(e) => setBillFromEmail(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Billing Address"
                            multiline
                            rows={4}
                            fullWidth
                            value={billFromAddress}
                            onChange={(e) => setBillFromAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Items:</Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Item Name"
                            fullWidth
                            value={item.name}
                            onChange={(e) => setItem({ ...item, name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Item Description"
                            fullWidth
                            value={item.description}
                            onChange={(e) => setItem({ ...item, description: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <TextField
                            label="Quantity"
                            fullWidth
                            type="number"
                            value={item.quantity}
                            onChange={(e) => setItem({ ...item, quantity: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={6} sm={2}>
                        <TextField
                            label="Price"
                            fullWidth
                            type="number"
                            value={item.price}
                            onChange={(e) => setItem({ ...item, price: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Button variant="outlined" fullWidth onClick={handleAddItem}>
                            Add Item
                        </Button>
                    </Grid>
                    {items.map((item, index) => (
                        <Grid item xs={12} key={index}>
                            <Box
                                sx={{
                                    padding: "10px",
                                    backgroundColor: "#f5f5f5",
                                    marginBottom: "10px",
                                }}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={4}>
                                        <Typography variant="subtitle1">
                                            <strong>Name:</strong> {item.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={4}>
                                        <Typography variant="subtitle1">
                                            <strong>Description:</strong> {item.description}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <Typography variant="subtitle1">
                                            <strong>Quantity:</strong> {item.quantity}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={2}>
                                        <Typography variant="subtitle1">
                                            <strong>Price:</strong> {item.price}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => handleDeleteItem(index)}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    ))}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Tax Rate (%)"
                            fullWidth
                            type="number"
                            value={taxRate}
                            onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Discount Rate (%)"
                            fullWidth
                            type="number"
                            value={discountRate}
                            onChange={(e) => setDiscountRate(parseFloat(e.target.value))}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Notes"
                            multiline
                            rows={4}
                            fullWidth
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: "center" }}>
                        <Button variant="contained" onClick={handleCreateBill}>
                            Generate Bill
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <div ref={containerRef}></div>
        </Container>
    );
};

export default BillForm;
