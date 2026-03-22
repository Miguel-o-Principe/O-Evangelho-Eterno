-- Migration: Add tags column to chapters, chapter_sections and posts
-- Run this in the Supabase SQL Editor

ALTER TABLE chapters
    ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

ALTER TABLE chapter_sections
    ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
