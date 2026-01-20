import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    console.log("[HEALTH] Checking system health...");
    
    // Check environment variables
    const hasJwtSecret = !!process.env.JWT_SECRET;
    const hasDatabaseUrl = !!process.env.DATABASE_URL;
    const jwtSecretValue = process.env.JWT_SECRET;
    
    console.log("[HEALTH] JWT_SECRET exists:", hasJwtSecret, "Value:", jwtSecretValue);
    console.log("[HEALTH] DATABASE_URL exists:", hasDatabaseUrl);
    console.log("[HEALTH] NODE_ENV:", process.env.NODE_ENV);

    // Try to connect to database
    let dbConnectionOk = false;
    let dbError = null;
    
    try {
      const result = await prisma.admin.count();
      dbConnectionOk = true;
      console.log("[HEALTH] Database connection OK. Admin count:", result);
    } catch (err) {
      dbError = err instanceof Error ? err.message : "Unknown error";
      console.error("[HEALTH] Database connection FAILED:", dbError);
    }

    return NextResponse.json({
      status: dbConnectionOk ? "healthy" : "unhealthy",
      checks: {
        jwt_secret_set: hasJwtSecret,
        jwt_secret_value: jwtSecretValue,
        database_url_set: hasDatabaseUrl,
        database_connection: dbConnectionOk,
        database_error: dbError,
        environment: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    console.error("[HEALTH] Health check failed:", error);
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
