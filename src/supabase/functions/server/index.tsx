import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// User Profile Management
app.post('/make-server-a1607484/profile', async (c) => {
  try {
    const body = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    // Store user profile
    await kv.set(`profile:${user.id}`, body);
    
    console.log(`Profile created for user ${user.id}`);
    return c.json({ success: true, userId: user.id });
  } catch (error) {
    console.log(`Error creating profile: ${error}`);
    return c.json({ error: 'Failed to create profile' }, 500);
  }
});

app.get('/make-server-a1607484/profile', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const profile = await kv.get(`profile:${user.id}`);
    return c.json({ profile });
  } catch (error) {
    console.log(`Error fetching profile: ${error}`);
    return c.json({ error: 'Failed to fetch profile' }, 500);
  }
});

// Chat History Management
app.post('/make-server-a1607484/chat', async (c) => {
  try {
    const body = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const { message, type } = body;
    const chatId = `chat:${user.id}:${Date.now()}`;
    
    const chatMessage = {
      id: chatId,
      userId: user.id,
      type, // 'user' or 'ai'
      content: message,
      timestamp: new Date().toISOString()
    };

    await kv.set(chatId, chatMessage);
    
    // Also store in user's chat history list
    const chatHistoryKey = `chat_history:${user.id}`;
    const existingHistory = await kv.get(chatHistoryKey) || [];
    existingHistory.push(chatId);
    await kv.set(chatHistoryKey, existingHistory);

    console.log(`Chat message saved for user ${user.id}`);
    return c.json({ success: true, messageId: chatId });
  } catch (error) {
    console.log(`Error saving chat message: ${error}`);
    return c.json({ error: 'Failed to save chat message' }, 500);
  }
});

app.get('/make-server-a1607484/chat/:userId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const chatHistoryKey = `chat_history:${user.id}`;
    const chatIds = await kv.get(chatHistoryKey) || [];
    
    const messages = [];
    for (const chatId of chatIds) {
      const message = await kv.get(chatId);
      if (message) {
        messages.push(message);
      }
    }

    return c.json({ messages: messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) });
  } catch (error) {
    console.log(`Error fetching chat history: ${error}`);
    return c.json({ error: 'Failed to fetch chat history' }, 500);
  }
});

// Skill Progress Tracking
app.post('/make-server-a1607484/skills', async (c) => {
  try {
    const body = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const { skill, currentLevel, targetLevel, category } = body;
    const skillKey = `skill:${user.id}:${skill}`;
    
    const skillData = {
      skill,
      currentLevel,
      targetLevel,
      category,
      lastUpdated: new Date().toISOString(),
      userId: user.id
    };

    await kv.set(skillKey, skillData);
    
    console.log(`Skill progress updated for user ${user.id}: ${skill}`);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error updating skill progress: ${error}`);
    return c.json({ error: 'Failed to update skill progress' }, 500);
  }
});

app.get('/make-server-a1607484/skills', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const skills = await kv.getByPrefix(`skill:${user.id}:`);
    return c.json({ skills });
  } catch (error) {
    console.log(`Error fetching skills: ${error}`);
    return c.json({ error: 'Failed to fetch skills' }, 500);
  }
});

// Career Goals and Milestones
app.post('/make-server-a1607484/goals', async (c) => {
  try {
    const body = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const goalKey = `goals:${user.id}`;
    const goalData = {
      ...body,
      userId: user.id,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    await kv.set(goalKey, goalData);
    
    console.log(`Goals updated for user ${user.id}`);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error updating goals: ${error}`);
    return c.json({ error: 'Failed to update goals' }, 500);
  }
});

app.get('/make-server-a1607484/goals', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const goals = await kv.get(`goals:${user.id}`);
    return c.json({ goals });
  } catch (error) {
    console.log(`Error fetching goals: ${error}`);
    return c.json({ error: 'Failed to fetch goals' }, 500);
  }
});

// Achievement Tracking
app.post('/make-server-a1607484/achievements', async (c) => {
  try {
    const body = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const { achievementId, title, description } = body;
    const achievementKey = `achievement:${user.id}:${achievementId}`;
    
    const achievementData = {
      id: achievementId,
      title,
      description,
      userId: user.id,
      completedAt: new Date().toISOString()
    };

    await kv.set(achievementKey, achievementData);
    
    console.log(`Achievement unlocked for user ${user.id}: ${title}`);
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error recording achievement: ${error}`);
    return c.json({ error: 'Failed to record achievement' }, 500);
  }
});

app.get('/make-server-a1607484/achievements', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const achievements = await kv.getByPrefix(`achievement:${user.id}:`);
    return c.json({ achievements });
  } catch (error) {
    console.log(`Error fetching achievements: ${error}`);
    return c.json({ error: 'Failed to fetch achievements' }, 500);
  }
});

// User Signup
app.post('/make-server-a1607484/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    console.log(`User created successfully: ${email}`);
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log(`Error during signup: ${error}`);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// AI Chat with Gemini API
app.post('/make-server-a1607484/ai-chat', async (c) => {
  try {
    const body = await c.req.json();
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'Authorization required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      return c.json({ error: 'Invalid authorization' }, 401);
    }

    const { message, userData } = body;
    
    if (!message) {
      return c.json({ error: 'Message is required' }, 400);
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      return c.json({ error: 'Gemini API key not configured' }, 500);
    }

    // Get user's chat history for context
    const chatHistoryKey = `chat_history:${user.id}`;
    const chatIds = await kv.get(chatHistoryKey) || [];
    
    const recentMessages = [];
    const recentChatIds = chatIds.slice(-10); // Last 10 messages for context
    
    for (const chatId of recentChatIds) {
      const msg = await kv.get(chatId);
      if (msg) {
        recentMessages.push(`${msg.type}: ${msg.content}`);
      }
    }

    // Create context-aware prompt
    const systemPrompt = `You are an AI Career Counsellor helping ${userData?.name || 'the user'} with their career development. 

User Profile:
- Current Role: ${userData?.currentRole || 'Not specified'}
- Experience Level: ${userData?.experience || 'Not specified'}
- Skills: ${userData?.skills?.join(', ') || 'Not specified'}
- Industries of Interest: ${userData?.industries?.join(', ') || 'Not specified'}
- Career Timeline: ${userData?.timeline || 'Not specified'}

Recent conversation context:
${recentMessages.join('\n')}

Provide personalized, actionable career advice. Be supportive, specific, and professional. Focus on practical next steps and skill development opportunities.`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nUser: ${message}`
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    console.log('Sending request to Gemini API');
    
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.log(`Gemini API error: ${geminiResponse.status} - ${errorText}`);
      return c.json({ error: 'Failed to generate AI response' }, 500);
    }

    const geminiData = await geminiResponse.json();
    
    if (!geminiData.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.log('Unexpected Gemini response format:', JSON.stringify(geminiData));
      return c.json({ error: 'Invalid response from AI service' }, 500);
    }

    const aiResponse = geminiData.candidates[0].content.parts[0].text;

    // Save both user message and AI response
    const userMessageId = `chat:${user.id}:${Date.now()}`;
    const aiMessageId = `chat:${user.id}:${Date.now() + 1}`;
    
    const userMessage = {
      id: userMessageId,
      userId: user.id,
      type: 'user',
      content: message,
      timestamp: new Date().toISOString()
    };

    const aiMessage = {
      id: aiMessageId,
      userId: user.id,
      type: 'ai',
      content: aiResponse,
      timestamp: new Date().toISOString()
    };

    await kv.set(userMessageId, userMessage);
    await kv.set(aiMessageId, aiMessage);
    
    // Update chat history
    const existingHistory = await kv.get(chatHistoryKey) || [];
    existingHistory.push(userMessageId, aiMessageId);
    await kv.set(chatHistoryKey, existingHistory);

    console.log(`AI chat response generated for user ${user.id}`);
    return c.json({ response: aiResponse, userMessageId, aiMessageId });
    
  } catch (error) {
    console.log(`Error in AI chat: ${error}`);
    return c.json({ error: 'Failed to process AI chat request' }, 500);
  }
});

// Health check
app.get('/make-server-a1607484/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

serve(app.fetch);