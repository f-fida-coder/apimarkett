import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { isValidPhoneNumber } from "libphonenumber-js"
import clientPromise from "@/lib/mongodb"

const leadSchema = z.object({
  intent: z.string().min(1),
  context: z.string().optional().default(""),
  fullName: z.string().trim().min(2).max(80),
  email: z.string().email(),
  countryIso: z.string().length(2),
  country: z.string().min(2),
  dialingCode: z.string().regex(/^\+\d{1,4}$/),
  phoneNumber: z.string().regex(/^[0-9]{6,15}$/),
  company: z.string().trim().max(120).optional().default(""),
  role: z.string().trim().max(120).optional().default(""),
  monthlyBudget: z.string().optional().default(""),
  timeline: z.string().optional().default(""),
  projectUseCase: z.string().trim().min(10).max(1200),
  sourcePage: z.string().optional().default(""),
}).superRefine((value, ctx) => {
  const fullPhone = `${value.dialingCode}${value.phoneNumber}`
  if (!isValidPhoneNumber(fullPhone)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["phoneNumber"],
      message: "Invalid phone number for the selected country code.",
    })
  }
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const lead = leadSchema.parse(body)

    const client = await clientPromise
    const dbName = process.env.MONGODB_DB_NAME || "apiflow"
    const db = client.db(dbName)

    const doc = {
      ...lead,
      createdAt: new Date(),
      ip:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      status: "new",
      channel: "whatsapp",
    }

    const result = await db.collection("whatsapp_leads").insertOne(doc)

    return NextResponse.json({ ok: true, id: result.insertedId.toString() }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid form data", details: error.flatten() },
        { status: 400 }
      )
    }

    return NextResponse.json({ ok: false, error: "Failed to save lead" }, { status: 500 })
  }
}
