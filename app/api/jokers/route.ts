import { jokers } from "@/app/data/jokers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Get joker data from the jokers.ts file
        const jokerData = jokers.map((joker) => ({
            id: joker.id,
            filename: joker.filename,
            name: joker.name,
            effect: joker.effect,
        }));

        // Return the list of jokers with their data
        return NextResponse.json({ jokers: jokerData });
    } catch (error) {
        console.error("Error retrieving joker data:", error);
        return NextResponse.json({ error: "Failed to load jokers" }, { status: 500 });
    }
}
