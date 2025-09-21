import { projectId, publicAnonKey } from './supabase/info';
import { supabase } from './supabase/client';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-a1607484`;

export class ApiClient {
  private async getAuthHeaders() {
    const { data: { session } } = await supabase.auth.getSession();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token || publicAnonKey}`,
    };
  }

  async saveProfile(userData: any) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/profile`, {
      method: 'POST',
      headers,
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save profile');
    }
    
    return response.json();
  }

  async getProfile() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/profile`, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch profile');
    }
    
    return response.json();
  }

  async saveChatMessage(message: string, type: 'user' | 'ai') {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, type }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save chat message');
    }
    
    return response.json();
  }

  async getChatHistory() {
    const headers = await this.getAuthHeaders();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const response = await fetch(`${API_BASE}/chat/${user.id}`, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch chat history');
    }
    
    return response.json();
  }

  async updateSkillProgress(skill: string, currentLevel: number, targetLevel: number, category: string) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/skills`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ skill, currentLevel, targetLevel, category }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update skill progress');
    }
    
    return response.json();
  }

  async getSkillProgress() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/skills`, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch skill progress');
    }
    
    return response.json();
  }

  async updateGoals(goals: any) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/goals`, {
      method: 'POST',
      headers,
      body: JSON.stringify(goals),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update goals');
    }
    
    return response.json();
  }

  async getGoals() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/goals`, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch goals');
    }
    
    return response.json();
  }

  async recordAchievement(achievementId: string, title: string, description: string) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/achievements`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ achievementId, title, description }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to record achievement');
    }
    
    return response.json();
  }

  async getAchievements() {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/achievements`, {
      method: 'GET',
      headers,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch achievements');
    }
    
    return response.json();
  }

  async sendAIChatMessage(message: string, userData: any) {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${API_BASE}/ai-chat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, userData }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to send AI chat message');
    }
    
    return response.json();
  }
}

export const apiClient = new ApiClient();