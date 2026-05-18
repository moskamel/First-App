'use client'

import React, { useState } from 'react'
import { useInView } from '@/hooks/useInView'
import {
  Apple,
  MobileProgramming,
  Star1,
  TickCircle,
  ShieldTick,
  DiscountCircle,
  SearchNormal1,
  ScanBarcode,
  Verify,
  MedalStar,
  EmptyWallet,
} from 'iconsax-react'

interface CTAProps {
  appStoreUrl?: string
  playStoreUrl?: string
}

const features = [
  { icon: SearchNormal1,  label: 'بحث ذكي فوري' },
  { icon: ScanBarcode,    label: 'مسح بالكاميرا' },
  { icon: DiscountCircle, label: 'مقارنة الأسعار' },
  { icon: EmptyWallet,    label: 'توفير حقيقي' },
  { icon: MedalStar,      label: 'نقاط ومكافآت' },
  { icon: Verify,         label: 'تقييمات موثوقة' },
]

const trustBadges = [
  { icon: TickCircle,        label: 'مجاني تماماً',  color: '#4ade80' },
  { icon: ShieldTick,        label: 'آمن ومحمي',     color: '#60a5fa' },
  { icon: Star1,             label: '4.8 تقييم',     color: '#fbbf24' },
  { icon: MobileProgramming, label: 'iOS & Android', color: '#c084fc' },
]

export default function CTA({ appStoreUrl, playStoreUrl }: CTAProps) {
  const { ref, inView } = useInView(0.08)
  const [hoveredBtn, setHoveredBtn] = useState<'ios' | 'android' | null>(null)

  return (
    <section
      id="cta"
      className="relative overflow-hidden"
      dir="rtl"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <style>{`
        @keyframes ctaPulse {
          0%,100% { transform:scale(1); opacity:.3; }
          50%      { transform:scale(1.08); opacity:.6; }
        }
        @keyframes ctaSpin {
          from { transform:translate(-50%,-50%) rotate(0deg); }
          to   { transform:translate(-50%,-50%) rotate(360deg); }
        }
        @keyframes ctaFloat {
          0%,100% { transform:translateY(0px) rotate(-2deg); }
          50%     { transform:translateY(-12px) rotate(-2deg); }
        }
        @keyframes ctaFloat2 {
          0%,100% { transform:translateY(0px) rotate(2deg); }
          50%     { transform:translateY(-10px) rotate(2deg); }
        }
        @keyframes shimmerFlow {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes dotPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%     { opacity:.5; transform:scale(1.3); }
        }
      `}</style>

      {/* Deep gradient background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0d0520 0%, #2a1050 25%, #432467 50%, #8b2f7a 75%, #C95FA0 100%)' }} />

      {/* Ambient blobs + rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{ position:'absolute', top:'-10%', right:'-5%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(245,135,98,0.18) 0%, transparent 70%)', animation:'ctaPulse 6s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'-10%', left:'-5%', width:'450px', height:'450px', borderRadius:'50%', background:'radial-gradient(circle, rgba(67,36,103,0.4) 0%, transparent 70%)', animation:'ctaPulse 8s ease-in-out infinite 2s' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'900px', height:'900px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.05)', animation:'ctaSpin 40s linear infinite' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'650px', height:'650px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.07)', animation:'ctaSpin 28s linear infinite reverse' }} />
        <div style={{ position:'absolute', top:'50%', left:'50%', width:'380px', height:'380px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.1)', animation:'ctaSpin 18s linear infinite' }} />
        {/* Star dots */}
        {[{t:'15%',r:'8%',s:'6px',c:'rgba(255,255,255,0.6)'},{t:'30%',r:'15%',s:'4px',c:'rgba(245,135,98,0.8)'},{t:'60%',r:'5%',s:'5px',c:'rgba(201,95,160,0.7)'},{t:'20%',l:'10%',s:'4px',c:'rgba(255,255,255,0.5)'},{t:'75%',l:'20%',s:'6px',c:'rgba(245,135,98,0.6)'},{t:'45%',l:'8%',s:'3px',c:'rgba(201,95,160,0.5)'}].map((d,i)=>(
          <div key={i} style={{ position:'absolute', top:d.t, right:d.r, left:d.l, width:d.s, height:d.s, borderRadius:'50%', background:d.c }} />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: dual phone screens ── */}
          <div
            className="relative flex justify-center items-center"
            style={{
              minHeight: '480px',
              transition: 'all 1s cubic-bezier(0.16,1,0.3,1)',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-40px)',
            }}
          >
            {/* Back phone */}
            <div style={{ position:'absolute', width:'190px', height:'380px', left:'calc(50% - 170px)', top:'50px', animation:'ctaFloat2 4.5s ease-in-out infinite 0.6s' }}>
              <div style={{ width:'100%', height:'100%', borderRadius:'2.2rem', border:'2.5px solid rgba(255,255,255,0.2)', background:'linear-gradient(170deg,rgba(67,36,103,0.85),rgba(201,95,160,0.75))', boxShadow:'0 25px 50px rgba(0,0,0,0.35)', overflow:'hidden', backdropFilter:'blur(6px)' }}>
                <div style={{ padding:'14px 12px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:'rgba(255,255,255,0.2)' }} />
                  <span style={{ color:'white', fontWeight:900, fontSize:'13px', fontFamily:'Zain,sans-serif' }}>مقارنة الأسعار</span>
                  <div style={{ width:'18px', height:'18px', borderRadius:'50%', background:'rgba(255,255,255,0.2)' }} />
                </div>
                <div style={{ padding:'12px' }}>
                  {[{ store:'Amazon', price:'2,999', best:true },{ store:'Noon', price:'3,199', best:false },{ store:'Jarir', price:'3,449', best:false }].map((r,i)=>(
                    <div key={i} style={{ background: r.best ? 'rgba(245,135,98,0.2)' : 'rgba(255,255,255,0.08)', borderRadius:'10px', padding:'8px 10px', marginBottom:'6px', display:'flex', justifyContent:'space-between', alignItems:'center', border: r.best ? '1px solid rgba(245,135,98,0.5)' : '1px solid transparent' }}>
                      <div style={{ fontSize:'9px', color: r.best ? '#F58762' : 'rgba(255,255,255,0.4)', fontWeight:700 }}>{r.best ? '✓ الأفضل' : ''}</div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontSize:'11px', color:'white', fontWeight:900, fontFamily:'Zain,sans-serif' }}>{r.price} ر.س</div>
                        <div style={{ fontSize:'9px', color:'rgba(255,255,255,0.5)' }}>{r.store}</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop:'10px', background:'rgba(245,135,98,0.9)', borderRadius:'10px', padding:'8px', textAlign:'center' }}>
                    <span style={{ fontSize:'10px', fontWeight:900, color:'white', fontFamily:'Zain,sans-serif' }}>اشترِ بأفضل سعر ←</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Front phone */}
            <div style={{ position:'relative', width:'215px', height:'430px', zIndex:10, animation:'ctaFloat 4s ease-in-out infinite' }}>
              <div style={{ width:'100%', height:'100%', borderRadius:'2.8rem', border:'3px solid rgba(255,255,255,0.35)', background:'linear-gradient(170deg,#FCDDD0 0%,#fff 50%,#E5D4F2 100%)', boxShadow:'0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)', overflow:'hidden' }}>
                {/* Header */}
                <div style={{ background:'linear-gradient(135deg,#F58762,#C95FA0,#432467)', padding:'13px 12px 9px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:'rgba(255,255,255,0.25)' }} />
                  <span style={{ color:'white', fontWeight:900, fontSize:'14px', fontFamily:'Zain,sans-serif' }}>ريفيوز</span>
                  <div style={{ width:'20px', height:'20px', borderRadius:'50%', background:'rgba(255,255,255,0.25)' }} />
                </div>
                {/* Search */}
                <div style={{ padding:'9px 10px 5px' }}>
                  <div style={{ background:'#FDF8FF', borderRadius:'999px', padding:'6px 10px', display:'flex', alignItems:'center', gap:'5px', border:'1px solid #e8daf4' }}>
                    <span style={{ fontSize:'10px', color:'#8b7aaa' }}>🔍</span>
                    <span style={{ fontSize:'9px', color:'#8b7aaa', fontFamily:'Zain,sans-serif' }}>ابحث عن أي منتج...</span>
                  </div>
                </div>
                <div style={{ padding:'0 10px 5px', textAlign:'right' }}>
                  <span style={{ fontSize:'8px', fontWeight:900, color:'#8b7aaa', fontFamily:'Zain,sans-serif' }}>الأكثر توفيراً اليوم</span>
                </div>
                <div style={{ padding:'0 10px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5px' }}>
                  {[{n:'آيفون 15',p:'2,999',i:'📱',d:'-15%',c:'#F58762'},{n:'سماعات',p:'599',i:'🎧',d:'-22%',c:'#C95FA0'},{n:'لابتوب',p:'3,499',i:'💻',d:'-10%',c:'#432467'},{n:'ساعة آبل',p:'1,499',i:'⌚',d:'-8%',c:'#F58762'}].map((p,i)=>(
                    <div key={i} style={{ background:'white', borderRadius:'10px', padding:'7px 6px', border:'1px solid #e8daf4', boxShadow:'0 2px 6px rgba(67,36,103,0.06)' }}>
                      <div style={{ fontSize:'16px', textAlign:'center', marginBottom:'3px' }}>{p.i}</div>
                      <div style={{ fontSize:'8px', fontWeight:800, color:'#1a0a2e', textAlign:'right', fontFamily:'Zain,sans-serif' }}>{p.n}</div>
                      <div style={{ fontSize:'8px', fontWeight:900, color:p.c, textAlign:'right', fontFamily:'Zain,sans-serif' }}>{p.p} ر.س</div>
                      <div style={{ display:'flex', justifyContent:'flex-end', marginTop:'2px' }}>
                        <span style={{ fontSize:'7px', fontWeight:900, color:'#16a34a', background:'#f0fdf4', borderRadius:'999px', padding:'1px 4px' }}>{p.d}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Bottom nav */}
                <div style={{ position:'absolute', bottom:0, left:0, right:0, display:'flex', justifyContent:'space-around', padding:'7px 0', borderTop:'1px solid #e8daf4', background:'rgba(255,255,255,0.96)' }}>
                  {['🏠','🔍','🛒','👤'].map((ic,i)=>(
                    <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'2px' }}>
                      <span style={{ fontSize:'13px' }}>{ic}</span>
                      {i===0 && <div style={{ width:'4px', height:'4px', borderRadius:'50%', background:'#F58762' }} />}
                    </div>
                  ))}
                </div>
                {/* Notch */}
                <div style={{ position:'absolute', top:'9px', left:'50%', transform:'translateX(-50%)', width:'46px', height:'11px', background:'#1a0a2e', borderRadius:'999px' }} />
              </div>
              {/* Badge pills */}
              <div style={{ position:'absolute', top:'-16px', left:'-22px', background:'white', borderRadius:'999px', padding:'6px 11px', display:'flex', alignItems:'center', gap:'5px', boxShadow:'0 8px 24px rgba(67,36,103,0.22)', fontSize:'11px', fontWeight:800, color:'#1a0a2e', fontFamily:'Zain,sans-serif', whiteSpace:'nowrap' }}>
                <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#4ade80', display:'inline-block', flexShrink:0, animation:'dotPulse 2s ease-in-out infinite' }} />
                وفّرت 340 ر.س!
              </div>
              <div style={{ position:'absolute', bottom:'-14px', right:'-22px', background:'white', borderRadius:'999px', padding:'6px 11px', display:'flex', alignItems:'center', gap:'5px', boxShadow:'0 8px 24px rgba(67,36,103,0.22)', fontSize:'11px', fontWeight:800, color:'#1a0a2e', fontFamily:'Zain,sans-serif', whiteSpace:'nowrap' }}>
                <span style={{ fontSize:'13px' }}>⭐</span>
                4.8 تقييم
              </div>
            </div>
          </div>

          {/* ── RIGHT: Text + CTAs ── */}
          <div
            className="text-right"
            style={{
              transition: 'all 1s cubic-bezier(0.16,1,0.3,1) 0.15s',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(40px)',
            }}
          >
            {/* Badge */}
            <div className="flex justify-end mb-5">
              <span style={{ display:'inline-flex', alignItems:'center', gap:'8px', background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.2)', backdropFilter:'blur(8px)', borderRadius:'999px', padding:'6px 16px', fontSize:'13px', fontWeight:700, color:'rgba(255,255,255,0.9)', fontFamily:'Zain,sans-serif' }}>
                <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'#4ade80', display:'inline-block', animation:'dotPulse 2s ease-in-out infinite' }} />
                متاح الآن مجاناً
              </span>
            </div>

            {/* Headline with shimmer */}
            <h2
              className="font-black font-arabic mb-3"
              style={{
                fontSize: 'clamp(2.2rem,4.5vw,3.8rem)',
                lineHeight: 1.1,
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #ffddd0 35%, #f0c4e8 65%, #ffffff 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'shimmerFlow 4s linear infinite',
              }}
            >
              حمّل ريفيوز الآن
            </h2>

            <p className="font-arabic mb-3" style={{ fontSize:'1.2rem', fontWeight:700, color:'rgba(255,255,255,0.65)', lineHeight:1.75 }}>
              اكتشف. قارن. اشترِ بذكاء.
            </p>

            <p className="font-arabic mb-7" style={{ fontSize:'0.95rem', color:'rgba(255,255,255,0.45)', lineHeight:1.9 }}>
              انضم إلى أكثر من 50,000 متسوّق ذكي في العالم العربي يوفّرون المال ويجدون أفضل الصفقات مع ريفيوز.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap justify-end gap-2 mb-7">
              {features.map(({ icon: Icon, label }, i) => (
                <span key={i} style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.14)', borderRadius:'999px', padding:'5px 12px', fontSize:'12px', fontWeight:700, color:'rgba(255,255,255,0.82)', fontFamily:'Zain,sans-serif', backdropFilter:'blur(6px)' }}>
                  <Icon size={13} color="rgba(245,135,98,0.9)" variant="Bold" />
                  {label}
                </span>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex flex-wrap justify-end gap-4 mb-7">
              <a
                href={appStoreUrl ?? '#'}
                onMouseEnter={() => setHoveredBtn('ios')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{ display:'flex', alignItems:'center', gap:'12px', background:hoveredBtn==='ios'?'white':'rgba(255,255,255,0.95)', borderRadius:'16px', padding:'12px 22px', minWidth:'175px', justifyContent:'center', color:'#1a0a2e', textDecoration:'none', transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)', boxShadow:hoveredBtn==='ios'?'0 20px 50px rgba(0,0,0,0.35),0 0 0 2px rgba(245,135,98,0.5)':'0 8px 24px rgba(0,0,0,0.25)', transform:hoveredBtn==='ios'?'translateY(-4px) scale(1.02)':'translateY(0) scale(1)' }}
              >
                <Apple size={26} color="#1a0a2e" variant="Bold" />
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:'10px', color:'#8b7aaa', lineHeight:1 }}>تحميل من</div>
                  <div style={{ fontSize:'14px', fontWeight:900, fontFamily:'Zain,sans-serif', lineHeight:1.4 }}>App Store</div>
                </div>
              </a>
              <a
                href={playStoreUrl ?? '#'}
                onMouseEnter={() => setHoveredBtn('android')}
                onMouseLeave={() => setHoveredBtn(null)}
                style={{ display:'flex', alignItems:'center', gap:'12px', background:hoveredBtn==='android'?'rgba(255,255,255,0.18)':'rgba(255,255,255,0.1)', border:`1.5px solid ${hoveredBtn==='android'?'rgba(255,255,255,0.5)':'rgba(255,255,255,0.25)'}`, borderRadius:'16px', padding:'12px 22px', minWidth:'175px', justifyContent:'center', color:'white', textDecoration:'none', backdropFilter:'blur(12px)', transition:'all 0.3s cubic-bezier(0.16,1,0.3,1)', boxShadow:hoveredBtn==='android'?'0 20px 50px rgba(0,0,0,0.3)':'0 8px 24px rgba(0,0,0,0.15)', transform:hoveredBtn==='android'?'translateY(-4px) scale(1.02)':'translateY(0) scale(1)' }}
              >
                <MobileProgramming size={26} color="white" variant="Bold" />
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:'10px', color:'rgba(255,255,255,0.6)', lineHeight:1 }}>تحميل من</div>
                  <div style={{ fontSize:'14px', fontWeight:900, fontFamily:'Zain,sans-serif', lineHeight:1.4 }}>Google Play</div>
                </div>
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-end gap-5">
              {trustBadges.map(({ icon: Icon, label, color }, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:'6px', color:'rgba(255,255,255,0.5)', fontSize:'13px', fontFamily:'Zain,sans-serif', fontWeight:600 }}>
                  <Icon size={15} color={color} variant="Bold" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
