import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export async function POST({ request }) {
  const data = await request.json();
  console.log("Received data to save:", data);
  try {
x
    const payload = { ...data };
    if (!payload.name && payload.nom) {
      payload.name = payload.nom;
      delete payload.nom;
    }

    if (!payload.name) {
      return new Response(JSON.stringify({ success: false, error: 'Missing field: name' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (!payload.code_svg) {
      return new Response(JSON.stringify({ success: false, error: 'Missing field: code_svg' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const record = await pb
      .collection(Collections.Svg)
      .create(payload);
    console.log("SVG saved with ID:", record.id);

    return new Response(JSON.stringify({ success: true, id: record.id }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error saving SVG:", error);
    // Try to extract more detailed info if PocketBase SDK returns structured error
    let errMsg = 'Something went wrong.';
    try {
      if (error instanceof Error && error.message) errMsg = error.message;
      // PocketBase may attach a 'data' or 'response' field with more details
      if (error && typeof error === 'object') {
        if (error.data) errMsg = JSON.stringify(error.data);
        else if (error.response) errMsg = JSON.stringify(error.response);
      }
    } catch (ex) {
      console.error('Failed to extract detailed error info', ex);
    }

    return new Response(JSON.stringify({ success: false, error: errMsg }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}