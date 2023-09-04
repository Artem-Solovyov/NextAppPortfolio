import Comment from "@/models/Comment";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    await Comment.findByIdAndDelete(id);

    return new NextResponse("Comment has been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
};
