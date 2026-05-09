import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ 
      where: { email: session.user.email } 
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const savedColleges = await prisma.savedCollege.findMany({
      where: { userId: user.id },
      include: { college: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(savedColleges.map((sc) => sc.college));
  } catch (error) {
    console.error("Error fetching saved colleges:", error);
    return NextResponse.json({ error: "Failed to fetch saved colleges" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ 
      where: { email: session.user.email } 
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { collegeId } = await request.json();
    if (!collegeId) {
      return NextResponse.json({ error: "College ID required" }, { status: 400 });
    }

    const existing = await prisma.savedCollege.findFirst({
      where: { userId: user.id, collegeId },
    });

    if (existing) {
      await prisma.savedCollege.delete({ where: { id: existing.id } });
      return NextResponse.json({ saved: false });
    } else {
      await prisma.savedCollege.create({ data: { userId: user.id, collegeId } });
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    console.error("Error toggling saved college:", error);
    return NextResponse.json({ error: "Failed to toggle saved college" }, { status: 500 });
  }
}