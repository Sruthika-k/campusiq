import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    let includeSaved = false;
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({ 
        where: { email: session.user.email } 
      });
      if (user) {
        includeSaved = true;
      }
    }

    const college = await prisma.college.findUnique({
      where: { id: params.id },
      include: includeSaved ? {
        savedBy: {
          where: { userId: session?.user?.id || '' }
        }
      } : undefined
    });

    if (!college) {
      return NextResponse.json(
        { error: "College not found" },
        { status: 404 }
      );
    }

    const response = {
      ...college,
      isSaved: includeSaved && (college as any).savedBy?.length > 0
    };

    if (includeSaved) {
      delete (response as any).savedBy;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching college:", error);
    return NextResponse.json(
      { error: "Failed to fetch college" },
      { status: 500 }
    );
  }
}
