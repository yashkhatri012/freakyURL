import mongoose from "mongoose";

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    phraseSlug: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    longUrl: {
      type: String,
      required: true
    },
   
  },
  { timestamps: true }
);

const UrlModel =mongoose.model.Url || mongoose.model("Url", urlSchema);

export default UrlModel;