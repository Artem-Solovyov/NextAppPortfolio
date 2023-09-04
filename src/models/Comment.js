import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    idPost: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export default mongoose.model("User", userScheme);
export default mongoose.models.Comment || mongoose.model("Comment", commentSchema);
