import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/* export function getRatingIndicator(rating: number) {
  if (rating >= 4.5) {
    return { label: "Excellent", bgColor: "bg-emerald-100", textColor: "text-emerald-700", dotColor: "bg-emerald-500" }
  } else if (rating >= 4) {
    return { label: "Very Good", bgColor: "bg-blue-100", textColor: "text-blue-700", dotColor: "bg-blue-500" }
  } else if (rating >= 3.5) {
    return { label: "Good", bgColor: "bg-amber-100", textColor: "text-amber-700", dotColor: "bg-amber-500" }
  } else if (rating >= 3) {
    return { label: "Satisfactory", bgColor: "bg-orange-100", textColor: "text-orange-700", dotColor: "bg-orange-500" }
  } else {
    return { label: "Fair", bgColor: "bg-red-100", textColor: "text-red-700", dotColor: "bg-red-500" }
  }
} */

export function getRatingIndicator(rating: number) {
  if (rating >= 4.5) {
    return "Excellent";
  } else if (rating >= 4) {
    return "Very Good";
  } else if (rating >= 3.5) {
    return "Good";
  } else if (rating >= 3) {
    return "Satisfactory";
  } else {
    return "Fair";
  }
}

TimeAgo.addDefaultLocale(en)

export function getTimeAgo(date: string) {
  const timeAgo = new TimeAgo('en-US')
  return timeAgo.format(new Date(date))
}