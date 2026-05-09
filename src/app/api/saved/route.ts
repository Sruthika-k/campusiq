import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: session.user.id },
      include: {
        college: true
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(savedColleges.map(sc => sc.college));
  } catch (error) {
    console.error("Error fetching saved colleges:", error);
    return NextResponse.json(
      { error: "Failed to fetch saved colleges" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { collegeId } = await request.json();

    if (!collegeId) {
      return NextResponse.json(
        { error: "College ID is required" },
        { status: 400 }
      );
    }

    // Check if already saved
    const existing = await prisma.savedCollege.findFirst({
      where: {
        userId: session.user.id,
        collegeId: collegeId
      }
    });

    if (existing) {
      // Unsave
      await prisma.savedCollege.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ saved: false });
    } else {
      // Save
      await prisma.savedCollege.create({
        data: {
          userId: session.user.id,
          collegeId: collegeId
        }
      });
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    console.error("Error toggling saved college:", error);
    return NextResponse.json(
      { error: "Failed to toggle saved college" },
      { status: 500 }
    );
  }
}
