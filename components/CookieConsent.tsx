"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/Button2";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  const close = () => setVisible(false);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60  z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Modal */}
          <motion.div
            className="fixed  bottom-5 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <div className="bg-[#0B0F1A]/40 backdrop-blur-sm rounded-2xl border-2 border-t border-[#355339]   p-6 pt-3 shadow-xl">
              <div className="flex justify-end mb-3">
                <button
                  onClick={close}
                  className="cursor-pointer text-white text-xl font-bold hover:opacity-80"
                >
                  &times;
                </button>
              </div>
              <div className="bg-[#121623]/10 backdrop-blur-sm p-6 rounded-xl text-center border border-[#355339]">
                <div className="flex justify-center mb-4">
                  <Image
                    src="/images/cookie.png"
                    alt="Cookie Icon"
                    width={60}
                    height={60}
                  />
                </div>

                <h2 className="text-lg font-semibold mb-2 text-white">
                  Cookie Consent
                </h2>
                <p className="text-gray-400 text-sm">
                  We use necessary cookies to make our site work. We’d like to
                  set additional cookies to understand site usage, make site
                  improvements and to remember your settings. We also use
                  cookies set by other sites to help deliver content from their
                  services.
                </p>
              </div>
              <div className="flex gap-4 justify-center mt-6">
                <Button
                  onClick={close}
                  className="!w-[48%] border border-green-500 text-green-500 bg-transparent font-semibold hover:!from-[#0c1117] hover:!to-[#0c1117]  transition"
                >
                  Reject
                </Button>

                <Button onClick={close} className="!flex-1 font-semibold">
                  Allow
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
