import { useState, useEffect, useCallback } from 'react'
import { useI18n } from '../i18n/I18nContext'

import img1 from '../assets/images/carousel/1254a45449e5fee1b02a4ed3e6914b4e.jpg'
import img2 from '../assets/images/carousel/38d7ae4f87696c329b011f86ba18edc3.jpg'
import img3 from '../assets/images/carousel/4657cf44e19fa393e16685cdc44d5cd5.jpg'
import img4 from '../assets/images/carousel/4abcf8a887ac52bb6af2596e37fcd99d.jpg'
import img5 from '../assets/images/carousel/5db924b57bf05075f31a97bca6da1477.jpg'
import img6 from '../assets/images/carousel/da19006da3256cd69ea8e77e1c5342b4.jpg'
import img7 from '../assets/images/carousel/de78e91b0c38f23c99d0a5cff982948a.jpg'
import img8 from '../assets/images/carousel/f550d766b3bd2c68a57e76a94ebf9151.jpg'

const images = [img1, img2, img3, img4, img5, img6, img7, img8]

export default function Carousel() {
  const { lang } = useI18n()
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const count = images.length

  const goTo = useCallback((i: number) => {
    setFade(false)
    setTimeout(() => {
      setIndex(i)
      setFade(true)
    }, 300)
  }, [])

  const next = useCallback(() => goTo((index + 1) % count), [goTo, index, count])
  const prev = useCallback(() => goTo((index - 1 + count) % count), [goTo, index, count])

  // 每次 index 变化都重置定时器：用户点击后从 4 秒重新计时
  useEffect(() => {
    if (count <= 1) return
    const timer = setTimeout(() => {
      setFade(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % count)
        setFade(true)
      }, 300)
    }, 2500)
    return () => clearTimeout(timer)
  }, [index, count])

  if (count === 0) return null

  return (
    <div
      data-carousel=""
      className="bg-[color:var(--color-ink-900)]"
      style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden' }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <img
          src={images[index]}
          alt={`${lang === 'zh' ? '中盛贸易实景图' : 'Galerie ZS'} ${index + 1}`}
          loading="eager"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to top, rgba(15,26,45,0.8) 0%, rgba(15,26,45,0.15) 50%, rgba(15,26,45,0.3) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* 左右箭头 */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={lang === 'zh' ? '上一张' : 'Précédent'}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full glass-dark text-white flex items-center justify-center hover:bg-[color:var(--color-amber-500)] hover:text-[color:var(--color-ink-900)] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={lang === 'zh' ? '下一张' : 'Suivant'}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full glass-dark text-white flex items-center justify-center hover:bg-[color:var(--color-amber-500)] hover:text-[color:var(--color-ink-900)] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </>
        )}

        {/* 底部指示点 */}
        {count > 1 && (
          <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} className="flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${lang === 'zh' ? '跳转到第' : 'Aller à'} ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? 'w-7 sm:w-8 bg-[color:var(--color-amber-500)]'
                    : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        )}

        {/* 左下角标签 */}
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', zIndex: 10 }}>
          <div className="flex items-center gap-2 text-white/80 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-[color:var(--color-amber-500)] animate-pulse" />
            {lang === 'zh' ? '中盛实景' : 'Galerie ZS'}
          </div>
        </div>

        {/* 右上角计数 */}
        <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }} className="glass-dark px-3 py-1.5 rounded-full text-white text-xs font-mono font-bold tracking-wider">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </div>
      </div>

      {/* 响应式高度覆盖 */}
      <style>{`
        @media (min-width: 640px) { 
          [data-carousel] { height: 400px !important; }
        }
        @media (min-width: 768px) { 
          [data-carousel] { height: 500px !important; }
        }
        @media (min-width: 1024px) { 
          [data-carousel] { height: 560px !important; }
        }
      `}</style>
    </div>
  )
}
