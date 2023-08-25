import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user doesn't exist" },
        { status: 404 }
      );
    }
    //check password
    const validPAssword = await bcryptjs.compare(password, user.password);
    if (!validPAssword) {
      return NextResponse.json({ error: "wrong password" }, { status: 400 });
    }
    //Create a token data
    const tokenData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    //craete a token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    //send toekn to cookies
    const response = NextResponse.json({
      message: "Logn success",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
