// Import the required modules
const express = require("express")
const router = express.Router()

const { capturePayment, verifySignature,sendPaymentSuccessEmail } = require("../controllers/payment")
const { auth, isStudent} = require("../middlewares/auth")
router.post("/capturePayment", auth, isStudent,capturePayment)
router.post("/verifySignature", verifySignature)
router.post("/sendPaymentSuccessEmail",sendPaymentSuccessEmail)
module.exports = router