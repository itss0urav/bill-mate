import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const BillForm = () => {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleAddItem = () => {
    const newItem = {
      name: itemName,
      description: itemDescription,
      quantity: itemQuantity,
      price: itemPrice,
    };
    setItems([...items, newItem]);
    setItemName('');
    setItemDescription('');
    setItemQuantity('');
    setItemPrice('');
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const calculateSubtotal = () => {
    let subtotal = 0;
    items.forEach((item) => {
      subtotal += item.quantity * item.price;
    });
    return subtotal;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = 0; // Replace with your discount calculation logic
    return subtotal - discount;
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Bill Creation App
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Invoice Number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Bill To</Typography>
            <TextField label="Name" fullWidth />
            <TextField label="Email" fullWidth />
            <TextField label="Billing Address" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">Bill From</Typography>
            <TextField label="Name" fullWidth />
            <TextField label="Email" fullWidth />
            <TextField label="Billing Address" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Items</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Item Description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              label="Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
            >
              Add Item
            </Button>
          </Grid>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <Typography>{item.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>{item.description}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{item.quantity}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{item.price}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteItem(index)}
                >
                  Delete
                </Button>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={2}>
            <Typography>Subtotal:</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{calculateSubtotal()}</Typography>
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={2}>
            <Typography>Discount:</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>0</Typography>
          </Grid>
          <Grid item xs={8} />
          <Grid item xs={2}>
            <Typography>Total:</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{calculateTotal()}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Notes"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Create Bill
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default BillForm;
