import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share, PlusSquare, ArrowUpRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export const InstallPromptModal: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  useEffect(() => {
    // 1. Check if running in standalone mode (already installed as PWA)
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
      return isStandaloneMode;
    };

    const alreadyInstalled = checkStandalone();

    // 2. Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isAppleDevice);

    // 3. Listen to beforeinstallprompt event (Android / Desktop Chrome / Edge)
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Auto open prompt if not installed and not dismissed this session
      const dismissed = sessionStorage.getItem('shapechef_install_dismissed');
      if (!alreadyInstalled && !dismissed) {
        setTimeout(() => {
          setIsOpen(true);
        }, 1200);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 4. Listen to appinstalled event
    const handleAppInstalled = () => {
      setIsStandalone(true);
      setIsOpen(false);
      setInstallSuccess(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // 5. If iOS and not installed, trigger prompt after short delay
    if (isAppleDevice && !alreadyInstalled) {
      const dismissed = sessionStorage.getItem('shapechef_install_dismissed');
      if (!dismissed) {
        setTimeout(() => {
          setIsOpen(true);
          setShowIOSGuide(true);
        }, 1500);
      }
    } else if (!alreadyInstalled) {
      // General prompt fallback for all other platforms
      const dismissed = sessionStorage.getItem('shapechef_install_dismissed');
      if (!dismissed) {
        setTimeout(() => {
          setIsOpen(true);
        }, 1500);
      }
    }

    // 6. Global event listener to allow manual triggering from anywhere
    const handleOpenInstallModal = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-shapechef-install', handleOpenInstallModal);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('open-shapechef-install', handleOpenInstallModal);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          setInstallSuccess(true);
          setIsOpen(false);
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
          });
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Erro ao executar prompt de instalação:', err);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('shapechef_install_dismissed', 'true');
  };

  if (isStandalone || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        id="pwa-install-modal"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-6 duration-300"
      >
        {/* Top Header with App Icon */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-5 text-white relative">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 bg-slate-900 rounded-2xl p-1 shadow-lg flex items-center justify-center shrink-0 border border-emerald-400/30 overflow-hidden">
              <img
                src="/favicon.png"
                alt="ShapeChef"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-xl font-black tracking-tight text-white">
                  Shape<span className="text-emerald-300">Chef</span>
                </h3>
                <span className="text-[10px] uppercase font-bold bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  App Oficial
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                Instala y añade el acceso directo a tu Pantalla de Inicio
              </p>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {!showIOSGuide && (
            <>
              {/* Feature Highlights */}
              <div className="space-y-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <span>Acceso directo en la pantalla de inicio sin abrir el navegador</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <span>Experiencia en pantalla completa súper rápida y fluida</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>143 recetas hiperproteicas, planificador y calculadora de macros</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  id="btn-install-pwa-now"
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <Download className="w-4 h-4" />
                  <span>Añadir a la Pantalla de Inicio</span>
                </button>
                <button
                  onClick={handleDismiss}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  Continuar en el navegador
                </button>
              </div>
            </>
          )}

          {showIOSGuide && (
            <div className="space-y-4 animate-in fade-in">
              <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-2xl space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span>📱</span> Cómo añadir en tu móvil:
                </h4>

                <div className="space-y-2.5 text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                      1
                    </span>
                    <p className="leading-tight">
                      Toca el botón <strong>Compartir</strong>{' '}
                      <span className="inline-flex items-center px-1.5 py-0.5 bg-white rounded border border-slate-200 text-slate-800">
                        <Share className="w-3 h-3 mr-1 text-emerald-600 inline" /> Compartir
                      </span>{' '}
                      en la barra del navegador.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                      2
                    </span>
                    <p className="leading-tight">
                      Desplaza el menú hacia abajo y toca{' '}
                      <span className="inline-flex items-center px-1.5 py-0.5 bg-white rounded border border-slate-200 text-slate-800 font-bold">
                        <PlusSquare className="w-3 h-3 mr-1 text-emerald-600 inline" /> Añadir a Pantalla de Inicio
                      </span>
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">
                      3
                    </span>
                    <p className="leading-tight">
                      Confirma tocando <strong>Añadir</strong> en la esquina superior derecha.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDismiss}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                ¡Entendido, voy a añadir!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
