import Comment from "@/models/Comment";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const url = new URL(request.url);
  const post = url.searchParams.get("post");

  try {
    await connect();
    const comments = await Comment.find(post && { idPost: post });

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new NextResponse("Error in response of DB", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();

  const newComment = new Comment(body);

  try {
    await connect();

    await newComment.save();

    return new NextResponse("Comment has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
