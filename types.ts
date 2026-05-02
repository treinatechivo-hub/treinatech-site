import React from 'react';

export interface CourseModule {
  title: string;
  items: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modalDescription: string;
  icon: React.ReactNode;
  topics: string[];
  fullSyllabus: CourseModule[];
  badge?: string;
  badgeColor?: 'green' | 'blue' | 'purple';
}

export interface NavItem {
  label: string;
  href: string;
}