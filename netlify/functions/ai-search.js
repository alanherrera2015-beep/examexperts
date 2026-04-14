// Netlify function: AI Deep Search
// Proxies requests to the OpenRouter API so the API key stays server-side.
// Required environment variable: OPENROUTER_API_KEY

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 503,
      body: JSON.stringify({ error: 'AI search is not configured. Please contact the site administrator.' })
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body.' }) };
  }

  const { query, model, category } = body;

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return { statusCode: 400, body: JSON.stringify({ error: 'A non-empty query is required.' }) };
  }

  const allowedModels = ['google/gemini-3-flash-preview'];
  const selectedModel = allowedModels.includes(model) ? model : allowedModels[0];

  const systemPrompt = category
    ? `You are a helpful tutoring assistant specializing in ${category}. Answer questions clearly and concisely for students.`
    : 'You are a helpful tutoring assistant. Answer questions clearly and concisely for students.';

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://examexperts.org',
        'X-Title': 'Exam Experts AI Deep Search'
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query.trim() }
        ],
        max_tokens: 800
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('OpenRouter API error:', response.status, errText);
      return {
        statusCode: 502,
        body: JSON.stringify({ error: 'The AI service returned an error. Please try again.' })
      };
    }

    const data = await response.json();
    const answer = data?.choices?.[0]?.message?.content ?? '';

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answer, model: selectedModel })
    };
  } catch (err) {
    console.error('AI search fetch error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An unexpected error occurred. Please try again.' })
    };
  }
};
