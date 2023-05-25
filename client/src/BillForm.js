import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Divider,
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
    const element = document.createElement("div");
    element.innerHTML = `<div style="margin-bottom: 20px;"> <h2 style="text-align: center;">Invoice</h2> <div style="display: flex; justify-content: space-between;"> <div> <p><strong>Invoice Number:</strong> ${invoiceNumber}</p> <p><strong>Due Date:</strong> ${dueDate}</p> </div> <div> <p><strong>Bill To:</strong></p> <p>${billToName}</p> <p>${billToEmail}</p> <p>${billToAddress}</p> </div> </div> <div style="display: flex; justify-content: space-between;"> <div> <p><strong>Bill From:</strong></p> <p>${billFromName}</p> <p>${billFromEmail}</p> <p>${billFromAddress}</p> </div> <div> <p><strong>Items:</strong></p> <ul> ${items
      .map(
        (item, index) => `<li>
<p><strong>Item ${index + 1}</strong></p>
<p><strong>Name:</strong> ${item.name}</p>
<p><strong>Description:</strong> ${item.description}</p>
<p><strong>Quantity:</strong> ${item.quantity}</p>
<p><strong>Price:</strong> ${item.price}</p>
<p><strong>Subtotal:</strong> ${(
          parseFloat(item.quantity) * parseFloat(item.price)
        ).toFixed(2)}</p>
<button onclick="handleDeleteItem(${index})">Delete</button>
</li>`
      )
      .join(
        ""
      )} </ul> </div> </div> <div style="text-align: right;"> <p><strong>Subtotal:</strong> ${calculateSubtotal()}</p> <p><strong>Tax:</strong> ${(
      (calculateSubtotal() * taxRate) /
      100
    ).toFixed(2)}</p> <p><strong>Discount:</strong> ${(
      (calculateSubtotal() * discountRate) /
      100
    ).toFixed(
      2
    )}</p> <p><strong>Total:</strong> ${calculateTotal()}</p> </div> <div> <p><strong>Notes:</strong></p> <p>[Notes]</p> </div> </div> `;
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "50px" }}>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", marginBottom: "30px" }}
      >
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
              onChange={(e) =>
                setItem({ ...item, description: e.target.value })
              }
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreateBill}
              sx={{ marginTop: "20px" }}
            >
              Create Bill
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default BillForm;
