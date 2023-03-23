const express=require("express")

const router=express.Router();
const {getContacts,createContact,getContact, updateContact, deleteContact}=require("../Controllers/contactController")

// get
router.route("/").get(getContacts);

// post
router.route("/").post(createContact);

// as above two routes are same so we can also write it as
// router.route("/").get(getContacts).post(createContact);

// get contact of particular id
router.route("/:id").get(getContact);

// put (update contact)
router.route("/:id").put(updateContact);

// delete contact
router.route("/:id").delete(deleteContact);


module.exports=router;