const asyncHandler = require("express-async-handler");
const Contact = require("../models/ContactModels");

//@desc-> Get all Contacts
//@route-> GET/api/contacts
//@ access-> public
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts });
});

//@desc -> Create new Contact
//@route -> POST/api/contacts
//@ access ->  public
const createContact = asyncHandler(async (req, res) => {
  console.log("The response body :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    // console.log("All fields are manadatory");
    throw new Error("All fields are manadatory.");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(200).json(contact);
});

//@desc -> Get  Contact for particular id
//@route -> GET/api/contacts/:id
//@ access ->  public
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  res.status(200).json(contact);
});

//@desc -> Update  Contact
//@route -> POST/api/contacts/:id
//@ access ->  public
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found!");
  }
  // for validation
  if (contact.user_id.toString() != req.user.id) {
    res.status(404);
    throw new Error("user does not have permission to update other contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
  console.log("Contact updated sucessfully");
});

//@desc -> Delete  Contact
//@route -> POST/api/contacts/:id
//@ access ->  public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact does not exist that you want to delete");
  }
  if (contact.user_id.toString() != req.user.id) {
    res.status(404);
    throw new Error("User does not have permission to delete other contact");
  }
  const deletedContact = await Contact.findOneAndDelete(req.params.id);
  res.status(200).json(deletedContact);
  console.log("contact deleted successfully....");
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};


