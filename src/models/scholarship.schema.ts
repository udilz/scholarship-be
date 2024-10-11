// membuat schema
import { Schema, model } from "mongoose";

// schema
const scholarshipSchema = new Schema({
   name: String,
   university: String,
   description: String,
   country: String,
   city: String,
   email: String,
   url_web: String,
   degrees: String,
   major: String,
   funding_type: String,
   open_date: Date,
   close_date: Date,
});

// create collection
export const Scholarship = model("Scholarship", scholarshipSchema);
