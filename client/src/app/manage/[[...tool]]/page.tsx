'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

/* can't use edge, total size of the studio on deployment is ~2.39MB
 only 1MB is allowed on free tier */
export const runtime = 'nodejs'

export default function StudioPage() {
  return (
    <div className="h-screen w-full">
      <NextStudio config={config} />
    </div>
  )
}
