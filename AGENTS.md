# Agent Guidelines – Personal Universe Website

## 🧠 Project Overview

This project is a cinematic, interactive personal website built with Next.js, Tailwind CSS, and Framer Motion.

The goal is to create an immersive “Personal Universe” where each section (Movies, Cars, Music) feels like a distinct experience, while maintaining a consistent design system.

---

## 🎨 Design Philosophy

* Dark, cinematic, and premium aesthetic
* Inspired by luxury product pages and film storytelling
* Minimal but expressive (avoid clutter)
* Every visual element must have intent

### Core Principles:

* Prioritize **experience over information density**
* Use **contrast and motion** to guide attention
* Maintain **visual hierarchy at all times**

---

## 🌈 Color System

* Background: #050510
* Primary: #7C5CFF (purple glow)
* Secondary: #00D4FF (cyan accent)
* Text: #EAEAF0
* Muted: #8A8AA3

### Rules:

* Avoid introducing new colors unless necessary
* Use gradients sparingly and intentionally

---

## 🎞️ Animation Guidelines (Framer Motion)

### Motion Philosophy:

* Animations should feel **smooth, cinematic, and intentional**
* Avoid overly bouncy or playful motion

### Standard Transition:

* Easing: [0.22, 1, 0.36, 1]
* Duration:

  * Micro interactions: 0.3s
  * Section transitions: 0.6–1s

### Patterns:

* Use **fade + translate + scale** combinations
* Prefer **opacity transitions over abrupt changes**
* Use **layout animations (layoutId)** for shared elements

---

## 🧩 Section Identity Rules

Each section must feel unique while staying within the same system:

### Movies:

* Slow, cinematic transitions
* Large typography
* Background-driven visuals

### Cars:

* Sharp, bold, and product-focused
* Emphasize performance stats
* Clean layout with strong hierarchy

### Music:

* Rhythmic and reactive
* Subtle looping animations (e.g., equalizers)
* More playful than other sections, but still controlled

---

## 🧱 Component Guidelines

* Components must be **reusable and modular**
* Avoid deeply nested structures
* Keep styling consistent with Tailwind utility patterns

### Preferred Patterns:

* Container → Section → Content blocks
* Separate animation logic from layout where possible

---

## ⚙️ Code Standards

* Use functional React components
* Use consistent naming conventions
* Keep files organized by feature (not by type)

Example:

* /components/sections/Movies
* /components/sections/Cars
* /components/sections/Music

---

## 🚫 What to Avoid

* Overusing animations
* Mixing too many visual styles
* Adding unnecessary UI elements
* Breaking consistency between sections

---

## 🎯 End Goal

Every interaction should feel:

* Intentional
* Smooth
* Visually cohesive