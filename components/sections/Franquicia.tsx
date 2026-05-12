"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Cuéntanos cómo te llamas."),
  email: z.string().email("Email no válido."),
  city: z.string().min(2, "¿En qué ciudad?"),
  message: z.string().min(10, "Cuéntanos un poco más (mín. 10 caracteres).").max(800),
});

type FormValues = z.infer<typeof schema>;

export function Franquicia() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = async (data: FormValues) => {
    // TODO: integrar con Formspree o API route en Vercel.
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmail: ${data.email}\nCiudad: ${data.city}\n\n${data.message}`
    );
    if (typeof window !== "undefined") {
      window.location.href = `mailto:hola@urbanfrenchtakos.com?subject=Franquicia%20UFT&body=${body}`;
    }
    await new Promise((r) => setTimeout(r, 400));
    setSubmitted(true);
    reset();
  };

  return (
    <section
      id="franquicia"
      className="relative overflow-hidden bg-[var(--ink)] py-[14vh] sm:py-[20vh]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_30%,rgba(168,85,247,0.18),transparent_55%)]"
      />

      <div className="mx-auto max-w-[1800px] px-5 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="block h-px w-10 bg-[var(--yellow)]" />
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                / 04 — Franquicia
              </span>
            </div>
            <h2
              className="mt-5 font-display font-bold tracking-[-0.04em] text-[var(--cream)]"
              style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)", lineHeight: 0.88 }}
            >
              ¿QUIERES TU PROPIO{" "}
              <span className="italic-editorial text-[var(--yellow)]">Urban?</span>
            </h2>
            <p className="mt-8 max-w-md text-[15px] leading-[1.55] text-[var(--cream)]/75 sm:text-[17px]">
              Aún no hemos abierto franquicia. Déjanos tu contacto y te avisamos
              en cuanto lo hagamos — serás de los primeros en montar tu Urban.
            </p>

            <div className="mt-14 grid max-w-md grid-cols-2 gap-x-6 gap-y-8">
              {[
                { k: "01", t: "Modelo probado", b: "Operativa en marcha en Valdepeñas." },
                { k: "02", t: "Marca propia", b: "Estética que no se confunde." },
                { k: "03", t: "Producto", b: "French tako, alma manchega." },
                { k: "04", t: "Apoyo", b: "Acompañamiento desde el día uno." },
              ].map((b) => (
                <div key={b.k} className="border-t border-[var(--yellow)]/30 pt-3">
                  <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                    {b.k}
                  </div>
                  <div className="mt-2 font-display text-lg font-semibold tracking-[-0.02em] text-[var(--cream)]">
                    {b.t}
                  </div>
                  <div className="mt-1 text-sm leading-tight text-[var(--cream)]/60">
                    {b.b}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-[var(--cream)]/15 bg-[var(--ink)]/40 p-7 backdrop-blur-md sm:p-12">
              <div
                aria-hidden
                className="absolute -top-3 left-7 rotate-[3deg] bg-[var(--yellow)] px-3 py-1 font-mono text-[10px] font-bold tracking-[0.3em] text-[var(--ink)] uppercase"
              >
                Plazas limitadas
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="grid min-h-[460px] place-items-center"
                  >
                    <div className="text-center">
                      <div className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]">
                        Recibido
                      </div>
                      <h3 className="mt-4 font-display text-3xl leading-tight font-bold text-[var(--cream)] sm:text-4xl">
                        Te escribiremos pronto.
                      </h3>
                      <p className="mt-3 max-w-xs text-sm text-[var(--cream)]/70">
                        Gracias por querer reventar Urban en tu ciudad.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-10 inline-flex items-center gap-2 border border-[var(--cream)]/40 px-5 py-3 font-mono text-[11px] tracking-[0.3em] uppercase text-[var(--cream)] transition-colors hover:border-[var(--yellow)] hover:text-[var(--yellow)]"
                      >
                        Enviar otro
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-7"
                    noValidate
                  >
                    <Field label="Nombre" id="name" error={errors.name?.message}>
                      <input
                        id="name"
                        {...register("name")}
                        autoComplete="name"
                        className="uft-input"
                        placeholder="Tu nombre"
                      />
                    </Field>
                    <Field label="Email" id="email" error={errors.email?.message}>
                      <input
                        id="email"
                        type="email"
                        {...register("email")}
                        autoComplete="email"
                        className="uft-input"
                        placeholder="tu@email.com"
                      />
                    </Field>
                    <Field label="Ciudad" id="city" error={errors.city?.message}>
                      <input
                        id="city"
                        {...register("city")}
                        autoComplete="address-level2"
                        className="uft-input"
                        placeholder="¿Dónde quieres abrir?"
                      />
                    </Field>
                    <Field label="Mensaje" id="message" error={errors.message?.message}>
                      <textarea
                        id="message"
                        {...register("message")}
                        rows={4}
                        className="uft-input resize-none"
                        placeholder="Cuéntanos un poco sobre ti y tu proyecto."
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-fill group inline-flex w-full items-center justify-center gap-2 border border-[var(--yellow)] bg-[var(--yellow)] px-6 py-4 font-mono text-[11px] tracking-[0.3em] text-[var(--ink)] uppercase disabled:opacity-60"
                      data-cursor="ENVIAR"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? "Enviando…" : "Enviar"}
                      </span>
                      <span className="relative z-10 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>

                    <p className="font-mono text-[10px] leading-[1.6] tracking-[0.1em] text-[var(--cream)]/45">
                      Al enviar aceptas nuestra Política de Privacidad.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .uft-input {
          width: 100%;
          background: transparent;
          border: 0;
          border-bottom: 1px solid rgba(255,248,231,0.22);
          padding: 0.85rem 0;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--cream);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .uft-input::placeholder { color: rgba(255,248,231,0.35); }
        .uft-input:focus { border-color: var(--yellow); }
      `}</style>
    </section>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[10px] tracking-[0.35em] uppercase text-[var(--yellow)]"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1 font-mono text-[11px] text-[var(--yellow-warm)]">{error}</p>
      ) : null}
    </div>
  );
}
