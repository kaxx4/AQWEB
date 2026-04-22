import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://nurtpdbqfizmqtztmiwk.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51cnRwZGJxZml6bXF0enRtaXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjE1NDQsImV4cCI6MjA5MTAzNzU0NH0.v-clxVi6B-tqQz8508ic4DwwQVPH0cUjhZJjtkdKwYA'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export interface WelfareProject {
  id: number
  slug: string
  is_draft: boolean
  header: string
  featured: boolean
  content: string | null
  location: string | null
  key_statistic: string | null
  workshop_date: string | null
  objective: string | null
  short_summary: string | null
  collab_logo: string | null
  collab_logo_alt: string | null
  collab_name: string | null
  long_writeup: string | null
  image_1: string | null
  image_1_alt: string | null
  label_1: string | null
  image_2: string | null
  image_2_alt: string | null
  label_2: string | null
  image_3: string | null
  image_3_alt: string | null
  label_3: string | null
  image_4: string | null
  image_4_alt: string | null
  label_4: string | null
  volunteers: number | null
  instagram_link: string | null
  main_image: string | null
  main_image_alt: string | null
  google_drive_link: string | null
  status: string | null
  created_at: string | null
}

export interface ContactSubmission {
  id?: number
  created_at?: string
  name: string
  email: string
  phone: string | null
  role: string | null
  message: string
}

export interface Blog {
  id: number
  slug: string
  headliner: string
  cover: string | null
  author_url: string | null
  minutes_of_read: number | null
  published_date: string | null
  author_instagram: string | null
  written_by: string | null
  featured_image: string | null
}

export const OBJECTIVES = [
  'All',
  'Workshop',
  'Feeding Dogs',
  'Plantation Drive',
  'Distribution Drive',
  'Sundarbans Relief',
  'Old Age Home Visit',
  'Fundraising Event',
  'Others',
] as const

export type ObjectiveFilter = (typeof OBJECTIVES)[number]
