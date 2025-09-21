import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Bot, User, Send } from 'lucide-react';
import { apiClient } from '../utils/api';
import { useAuth } from './AuthProvider';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface AICareerCounsellorProps {
  userData: any;
}

export function AICareerCounsellor({ userData }: AICareerCounsellorProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (user && !initialized) {
      loadChatHistory();
      setInitialized(true);
    }
  }, [user, initialized]);

  const loadChatHistory = async () => {
    try {
      const { messages: chatHistory } = await apiClient.getChatHistory();
      if (chatHistory && chatHistory.length > 0) {
        const formattedMessages = chatHistory.map((msg: any) => ({
          id: msg.id,
          type: msg.type,
          content: msg.content,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(formattedMessages);
      } else {
        // Add initial welcome message
        const welcomeMessage = {
          id: '1',
          type: 'ai' as const,
          content: `Hi ${userData.name}! I'm your AI Career Counsellor. I've reviewed your profile and I'm excited to help you achieve your career goals. Based on your background in ${userData.currentRole} and your interest in ${userData.industries?.join(', ') || 'your chosen fields'}, I have some personalized insights for you. What would you like to discuss first?`,
          timestamp: new Date()
        };
        setMessages([welcomeMessage]);
        // Save welcome message to backend
        await apiClient.saveChatMessage(welcomeMessage.content, 'ai');
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
      // Fallback to local welcome message
      const welcomeMessage = {
        id: '1',
        type: 'ai' as const,
        content: `Hi ${userData.name}! I'm your AI Career Counsellor. I've reviewed your profile and I'm excited to help you achieve your career goals. Based on your background in ${userData.currentRole} and your interest in ${userData.industries?.join(', ') || 'your chosen fields'}, I have some personalized insights for you. What would you like to discuss first?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await apiClient.sendAIChatMessage(userMessage, userData);
      return response.response;
    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      // Fallback to basic responses if API fails
      const fallbackResponses = [
        `Based on your background in ${userData.currentRole} and your skills in ${userData.skills.slice(0, 3).join(', ')}, I'd recommend focusing on developing expertise in emerging technologies. What specific area interests you most?`,
        
        `Given your goal to work in ${userData.industries[0] || 'technology'}, you're well-positioned with your current experience. However, I notice some key skills that could accelerate your growth. Would you like me to identify specific skill gaps?`,
        
        `Your timeline of ${userData.timeline} is realistic for achieving significant career growth. Let me suggest a structured learning path that aligns with current market demands in your field.`,
        
        `I see great potential in your profile! With your ${userData.experience} of experience, you could transition into roles like Senior Developer, Team Lead, or Product Manager. Which direction appeals to you more?`
      ];

      // Simple keyword-based response generation for fallback
      if (userMessage.toLowerCase().includes('skill')) {
        return `Great question about skills! Looking at your current skills (${userData.skills.slice(0, 3).join(', ')}), I'd recommend adding cloud computing, data analysis, and project management to make you more competitive. These are highly sought after in ${userData.industries[0] || 'technology'}.`;
      }
      
      if (userMessage.toLowerCase().includes('job') || userMessage.toLowerCase().includes('role')) {
        return `For someone with your background, I'd suggest looking at roles like Senior ${userData.currentRole}, Technical Lead, or Product Manager. These typically require 2-3 additional skills beyond what you currently have. Would you like me to create a detailed job matching report?`;
      }
      
      if (userMessage.toLowerCase().includes('salary') || userMessage.toLowerCase().includes('pay')) {
        return `Salary expectations vary by location and company size, but professionals with your profile typically earn 15-25% more when they add in-demand skills. I can help you identify which skills have the highest ROI for salary growth.`;
      }

      return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Generate AI response using Gemini API
      const aiResponseContent = await generateAIResponse(currentInput);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

    } catch (error) {
      console.error('Failed to process chat message:', error);
      setIsTyping(false);
      
      // Add error message
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I'm having trouble processing your message right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          AI Career Counsellor
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'ai' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground ml-12'
                      : 'bg-muted mr-12'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.type === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 mr-12">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="flex gap-2 mt-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me about your career path, skills, or job opportunities..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}