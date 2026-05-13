// src/components/ui/YouTubeEmbed.jsx
// ============================================================
//  YouTubeEmbed — lightweight YouTube iframe wrapper.
//  Replaces the heavy react-player library (which ships 1.97MB
//  of DASH + HLS codecs we never use). This component extracts
//  the video ID from any YouTube URL format and renders a
//  standard <iframe> embed.
//
//  Props:
//    url       {string}  — any YouTube/youtu.be URL
//    playing   {bool}    — whether to autoplay
//    controls  {bool}    — show player controls (default true)
//    muted     {bool}    — mute audio (required for autoplay)
//    loop      {bool}    — loop playback
//    onReady   {fn}      — called when iframe loads
//    onError   {fn}      — called when iframe fails to load
//    style     {object}  — styles applied to the wrapper
//    className {string}
// ============================================================

import React, { useState } from 'react';

/**
 * Extract video ID from various YouTube URL formats:
 *  - https://www.youtube.com/watch?v=VIDEO_ID
 *  - https://youtu.be/VIDEO_ID
 *  - https://www.youtube.com/embed/VIDEO_ID
 *  - https://youtube.com/shorts/VIDEO_ID
 */
function extractVideoId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    // youtu.be/VIDEO_ID
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1);
    }
    // youtube.com/watch?v=VIDEO_ID
    if (u.searchParams.has('v')) {
      return u.searchParams.get('v');
    }
    // youtube.com/embed/VIDEO_ID or youtube.com/shorts/VIDEO_ID
    const match = u.pathname.match(/\/(embed|shorts|v)\/([^/?]+)/);
    if (match) return match[2];
    return null;
  } catch {
    return null;
  }
}

export default function YouTubeEmbed({
  url,
  playing = false,
  controls = true,
  muted = false,
  loop = false,
  onReady,
  onError,
  style = {},
  className = '',
}) {
  const [hasError, setHasError] = useState(false);
  const videoId = extractVideoId(url);

  if (!videoId) return null;

  // Build embed URL with parameters
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  if (playing) params.set('autoplay', '1');
  if (muted) params.set('mute', '1');
  if (!controls) params.set('controls', '0');
  if (loop) {
    params.set('loop', '1');
    params.set('playlist', videoId); // Required for loop to work
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;

  if (hasError) return null;

  return (
    <iframe
      className={className}
      src={embedUrl}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
      onLoad={onReady}
      onError={() => {
        setHasError(true);
        if (onError) onError();
      }}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        border: 'none',
        ...style,
      }}
    />
  );
}

export { extractVideoId };
