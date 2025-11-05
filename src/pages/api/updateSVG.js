import pb from "../../utils/pb";
import { Collections } from "../../utils/pocketbase-types";

export async function POST({ request }) {
  try {
    const data = await request.json();
    const { id, code_svg, chat_history } = data;
    if (!id) {
      return new Response(JSON.stringify({ success: false, error: 'Missing id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const updateData = {};
    if (code_svg !== undefined) updateData.code_svg = code_svg;
    if (chat_history !== undefined) updateData.chat_history = chat_history;

    const record = await pb.collection(Collections.Svg).update(id, updateData);
    return new Response(JSON.stringify({ success: true, id: record.id }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('updateSVG error', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
