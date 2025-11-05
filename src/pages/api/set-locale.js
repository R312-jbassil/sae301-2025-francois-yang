export async function POST({ request }) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let formData;
    if (contentType.includes('application/json')) {
      formData = await request.json();
    } else {
      const fd = await request.formData();
      formData = {};
      for (const [k, v] of fd.entries()) formData[k] = v;
    }

    const locale = formData.language || formData.locale || 'fr';
    const redirectTo = request.headers.get('referer') || '/';

   
    const maxAge = 60 * 60 * 24 * 365;
    const cookie = `locale=${encodeURIComponent(locale)}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;

    return new Response(null, {
      status: 303,
      headers: {
        'Set-Cookie': cookie,
        'Location': redirectTo,
      },
    });
  } catch (err) {
    return new Response('Error', { status: 500 });
  }
}
