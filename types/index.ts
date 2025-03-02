export interface Habit {
  id: string;
  name: string;
  description: string;
  streak: number;
  completedToday: boolean;
  completionRate: number;
  color?: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'all-day';
}

export interface Resource {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
  imageUrl: string;
}