const asyncHandler=require('express-async-handler');

//@desc-> Get all Contacts
//@route-> GET/api/contacts
//@ access-> public
const getContacts =asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get all contacts" });
});

//@desc -> Create new Contact
//@route -> POST/api/contacts
//@ access ->  public
const createContact =asyncHandler(async (req, res) => {
  console.log("The response body :",req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    // console.log("All fields are manadatory");
    throw new Error("All fields are manadatory.");
  }
  res.status(201).json({ message: "Create Contact" });
});

//@desc -> Get  Contact for particular id
//@route -> GET/api/contacts/:id
//@ access ->  public
const getContact =asyncHandler(async (req, res) => {
  res.status(201).json({ message: `Get contact for ${req.params.id}` });
});

//@desc -> Update  Contact
//@route -> POST/api/contacts/:id
//@ access ->  public
const updateContact =asyncHandler(async (req, res) => {
  res.status(201).json({ message: `Update contact for ${req.params.id}` });
});

//@desc -> Delete  Contact
//@route -> POST/api/contacts/:id
//@ access ->  public
const deleteContact =asyncHandler(async (req, res) => {
  res.status(201).json({ message: `Delete contact for ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};

// jx7BGskvb04o6VAj