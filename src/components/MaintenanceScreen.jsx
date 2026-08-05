import React from 'react';
import logoImg from '../assets/logo.png?url';

export default function MaintenanceScreen({ config }) {
  const maintenanceTitle = config?.title || 'Sistem Dalam Pemeliharaan';
  const maintenanceMessage = config?.message || 'Kami sedang melakukan peningkatan performa dan pemeliharaan sistem rutin untuk memberikan pengalaman terbaik kepada Anda. Silakan kembali beberapa saat lagi.';
  const estimatedTime = config?.estimatedTime || '1 - 2 Jam';
  const waNumber = config?.contactWhatsapp || '6281234567890';
  const emailAddr = config?.contactEmail || 'info@supramix.co.id';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Animated Glowing Spheres */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      {/* Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="SUPRAMIX Logo" className="h-10 w-auto object-contain drop-shadow-md" />
          <span className="text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
            SUPRAMIX OFF-LINE
          </span>
        </div>

        {/* Admin Secret Portal Link */}
        <a
          href="/admin"
          className="text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1.5 bg-slate-900/80 hover:bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg backdrop-blur-sm"
          title="Login Admin untuk Kelola Maintenance Mode"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Portal Admin
        </a>
      </header>

      {/* Main Content Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/60 text-center relative overflow-hidden">
          
          {/* Top Decorative Amber Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 via-emerald-500 to-amber-500"></div>

          {/* Status Indicator Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-6 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            Maintenance Mode Active
          </div>

          {/* Maintenance Icon Illustration */}
          <div className="mx-auto w-20 h-20 mb-6 rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center text-amber-400 shadow-inner">
            <svg className="w-10 h-10 animate-spin" style={{ animationDuration: '12s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {maintenanceTitle}
          </h1>

          {/* Message Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8 font-light">
            {maintenanceMessage}
          </p>

          {/* Estimated Time Box */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 mb-8 max-w-md mx-auto flex items-center justify-center gap-3">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-slate-400">
              Perkiraan Selesai: <strong className="text-emerald-400 font-semibold">{estimatedTime}</strong>
            </span>
          </div>

          {/* System Task Progress Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
            <div className="bg-slate-950/40 border border-slate-800/80 p-3 rounded-xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs text-slate-300 font-medium">Server Optimization</span>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 p-3 rounded-xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="text-xs text-slate-300 font-medium">Database Upgrade</span>
            </div>
            <div className="bg-slate-950/40 border border-slate-800/80 p-3 rounded-xl flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600"></span>
              <span className="text-xs text-slate-400 font-medium">Final Security Verification</span>
            </div>
          </div>

          {/* Action Contact Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {waNumber && (
              <a
                href={`https://wa.me/${waNumber.replace(/[^0-9]/g, '')}?text=Halo%20Tim%20SUPRAMIX,%20saya%20ingin%20bertanya%20mengenai%20layanan%20saat%20maintenance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                Hubungi via WhatsApp
              </a>
            )}

            {emailAddr && (
              <a
                href={`mailto:${emailAddr}?subject=Pertanyaan%20Saat%20Maintenance%20SUPRAMIX`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Kirim Email
              </a>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        <p>© {new Date().getFullYear()} PT SUPRAMIX Indonesia. Hak Cipta Dilindungi Undang-Undang.</p>
      </footer>
    </div>
  );
}
