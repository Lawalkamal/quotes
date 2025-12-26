import { supabase, Quote } from './supabase';

export async function getQuotes() {
  const { data, error } = await supabase
    .from('quotes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching quotes:', error);
    return [];
  }

  return data as Quote[];
}

export async function getDailyQuote() {
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*');

  if (error || !quotes || quotes.length === 0) {
    console.error('Error fetching daily quote:', error);
    return null;
  }

  // Simple daily rotation logic based on the day of the year
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  const index = dayOfYear % quotes.length;
  return quotes[index] as Quote;
}
