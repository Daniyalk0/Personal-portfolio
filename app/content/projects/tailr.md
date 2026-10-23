---
title: Tailr
description: AI-Powered Resume Customizer for Tailoring Resumes to Specific Job Descriptions
actions:
  - type: live
    label: Live Demo
    url: https://tailr-reumse-customizer.vercel.app/
  - type: github
    label: GitHub
    url: https://github.com/Daniyalk0/tailr
---

# Tailr

## Overview

Tailr is an AI-powered resume customizer built by Daniyal to help job seekers adapt an existing resume to a specific job description. It extracts text from a resume, lets the user review and edit it, and uses AI to produce a complete, role-focused version with suggested keywords for relevant qualifications that are missing or only partly supported. The goal is to make tailoring easier while keeping the candidate's claims grounded in their original experience.

> **Use this section when the user asks generally about Tailr or says "Tell me about Tailr".**

---

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Python
- FastAPI
- Pydantic
- Groq API (openai/gpt-oss-120b)
- Neon PostgreSQL
- SQLAlchemy & Alembic
- pypdf, python-docx, ReportLab
- SlowAPI

> **Use this section only when the user asks about the technologies or tech stack.**

---

## Features

- AI-powered resume customization using Groq's openai/gpt-oss-120b model
- PDF or DOCX resume upload (up to 10 MB) with editable extracted text
- Job description input (up to 20,000 characters) for targeted tailoring
- AI-generated resume with suggested keywords for missing or partly supported qualifications
- Diff view showing original vs. customized resume—removed lines in red strikethrough, added lines in green, with change highlighting
- Review and edit the generated resume before downloading as PDF or DOCX
- In-app feedback for upload, customization, and download errors
- One resume generation per guest per UTC day, with a visible "generations remaining" indicator
- Guest identity via UUID in localStorage—no account required
- Generate button rate-limited to 5 requests per minute per IP address
- Atomic per-guest daily quota enforcement in PostgreSQL
- No resumes, job descriptions, or user accounts stored—only a per-guest daily usage counter
- Responsive design optimized for desktop, tablet, and mobile devices

> **Use this section only when the user asks about features or functionality.**

---

## Engineering Challenges

- Enforcing a per-guest daily quota atomically in PostgreSQL—reserving a generation slot before contacting the AI provider, converting it to a successful generation on success, and releasing it on failure so failed attempts do not count against the limit.
- Keeping AI output grounded in the original resume, with a diff view so users can see exactly what changed.
- Validating both the AI response and uploaded files (size, type, extracted text limits) before any generation is attempted.
- Separating request rate limiting (SlowAPI, per IP) from the daily quota (PostgreSQL, per guest) as distinct concerns.
- Generating downloadable PDF and DOCX files from customized resume text with ReportLab and python-docx.
- Extracting text from PDF and DOCX files while handling formats that may not extract cleanly (scanned PDFs, DOCX tables).

> **Use this section only when the user asks about technical challenges, implementation details, or architecture.**

---

## What I Learned

- Building AI-powered applications with the Groq API
- Enforcing quotas and rate limits reliably in a serverless-style backend
- Designing atomic reservation flows in PostgreSQL with SQLAlchemy
- Handling document parsing and generation across PDF and DOCX formats
- Building privacy-friendly applications that avoid storing user content
- Creating intuitive review-and-edit workflows for AI-assisted tasks
- Structuring production-ready FastAPI and Next.js applications with maintainability in mind

> **Use this section only when the user asks what Daniyal learned or the key takeaways from the project.**

---

## Local Development

### Prerequisites

Make sure you have the following installed:

- Git
- Node.js
- npm
- Python 3.10 or later
- A Groq API key
- A PostgreSQL database (Neon's free tier is sufficient)

### Clone the Repository

```bash
git clone https://github.com/Daniyalk0/tailr
cd tailr