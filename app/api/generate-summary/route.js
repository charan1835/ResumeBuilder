import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Make sure to set your GOOGLE_API_KEY in your .env.local file
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

function constructPrompt(data) {
  const { experience, skills, projects, title } = data;

  let prompt = `Based on the following professional details, write a compelling and concise resume summary (bio) for a "${title}". The summary should be 2-4 sentences long. Do not use first-person pronouns (like "I" or "my").\n\n`;

  if (experience?.length > 0) {
    prompt += 'Experience:\n';
    experience.forEach(exp => {
      prompt += `- Role: ${exp.role} at ${exp.company}. Description: ${exp.expDesc}\n`;
    });
    prompt += '\n';
  }

  if (skills?.length > 0) {
    const skillNames = skills.map(s => s.name).join(', ');
    prompt += `Skills: ${skillNames}\n\n`;
  }

  if (projects?.length > 0) {
    prompt += 'Projects:\n';
    projects.forEach(proj => {
      prompt += `- Project: ${proj.projectName}. Tech: ${proj.projectTech}. Description: ${proj.projectDesc}\n`;
    });
    prompt += '\n';
  }

  prompt += 'Now, write the resume summary:';
  return prompt;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = constructPrompt(body);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return NextResponse.json({ summary });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({ error: 'Failed to generate summary.' }, { status: 500 });
  }
}