'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Force this route to use Node.js runtime instead of Edge
export const runtime = 'nodejs'

export default function StudioPage() {
  return <NextStudio config={config} />
}
