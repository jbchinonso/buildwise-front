export type ActivityType = 'payment' | 'onboarding' | 'message' | 'alert';

export interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  date: string;
  time: string;
  icon?: string;
}
