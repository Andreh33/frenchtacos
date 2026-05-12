"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/system/Reveal";

const schema = z.object({
  name: z.string().min(2, "Cuéntanos cómo te llamas."),
  email: z.string().email("Email no válido."),
  city: z.string().min(2, "¿En qué ciudad?"),
  message: z.string().min(10, "Cuéntanos un poco más (mín. 10 caracteres).").max(800),
});

type FormValues = z.infer<typeof schema>;

export function Franchise() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: "onTouched" });

  const onSubmit = async (data: FormValues) => {
    // Placeholder submission. Replace with Formspree / API route.
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmail: ${data.email}\nCiudad: ${data.city}\n\n${data.message}`
    );
    const mailto = `mailto:hola@urbanfrenchtakos.com?subject=Franquicia%20UFT&body=${body}`;
    if (typeof window !== "undefined") {
      window.location.href = mailto;
    }
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    reset();
  };

  return (
    <section
      id="franquicia"
      className="relative overflow-hidden bg-[var(--uft-purple-deep)] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -z-0 h-[100%] w-[100%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,214,10,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="font-mono text-[10px] tracking-[0.4em] text-[var(--uft-yellow)] uppercase">
                / 04 — Franquicia
              </span>
            </Reveal>
            <Reveal delay={120}>
              <h2
                className="mt-3 font-display font-extrabold tracking-tight text-[var(--uft-cream)]"
                style={{
                  fontSize: "clamp(2.5rem, 7.5vw, 7rem)",
                  lineHeight: 0.88,
                }}
              >
                ¿Quieres tu propio{" "}
                <span className="text-[var(--uft-yellow)]">URBAN?</span>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 max-w-md text-lg leading-[1.55] text-[var(--uft-cream)]/80">
                Muy pronto abriremos franquicia. Déjanos tu contacto y serás de los
                primeros en montar tu Urban French Takos.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-12 grid grid-cols-2 gap-4 sm:max-w-md sm:gap-6">
                {[
                  { k: "01", t: "Modelo probado", b: "Operativa en marcha en Valdepeñas." },
                  { k: "02", t: "Marca única", b: "Estética propia, sin clichés." },
                  { k: "03", t: "Producto", b: "French tako, alma manchega." },
                  { k: "04", t: "Apoyo", b: "Acompañamiento desde el día 1." },
                ].map((b) => (
                  <div key={b.k} className="border-t border-[var(--uft-yellow)]/40 pt-3">
                    <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--uft-yellow)]">
                      {b.k}
                    </div>
                    <div className="mt-1 font-display font-bold tracking-tight text-[var(--uft-cream)]">
                      {b.t}
                    </div>
                    <div className="mt-1 text-xs text-[var(--uft-cream)]/65">{b.b}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border-2 border-[var(--uft-yellow)] bg-[var(--uft-purple-deep)]/60 p-6 backdrop-blur-md sm:p-10">
              <div
                aria-hidden
                className="absolute -top-3 left-8 rotate-2 bg-[var(--uft-yellow)] px-3 py-1 font-mono text-[10px] font-bold tracking-[0.3em] text-[var(--uft-purple-deep)] uppercase"
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
                    className="grid min-h-[420px] place-items-center text-center"
                  >
                    <div>
                      <div className="font-mono text-[10px] tracking-[0.3em] text-[var(--uft-yellow)] uppercase">
                        Recibido
                      </div>
                      <h3 className="mt-3 font-display text-3xl leading-tight font-extrabold text-[var(--uft-cream)] sm:text-4xl">
                        Te escribiremos pronto.
                      </h3>
                      <p className="mt-3 max-w-sm text-sm text-[var(--uft-cream)]/70">
                        Gracias por querer reventar Urban en tu ciudad.
                      </p>
                      <button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-8 inline-flex items-center gap-2 border border-[var(--uft-cream)]/40 px-5 py-3 font-mono text-xs font-bold tracking-widest text-[var(--uft-cream)] uppercase transition-colors hover:border-[var(--uft-yellow)] hover:text-[var(--uft-yellow)]"
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
                    className="space-y-6"
                    noValidate
                  >
                    <Field
                      label="Nombre"
                      id="name"
                      error={errors.name?.message}
                      input={
                        <input
                          id="name"
                          {...register("name")}
                          autoComplete="name"
                          className="uft-input"
                          placeholder="Tu nombre"
                        />
                      }
                    />
                    <Field
                      label="Email"
                      id="email"
                      error={errors.email?.message}
                      input={
                        <input
                          id="email"
                          type="email"
                          {...register("email")}
                          autoComplete="email"
                          className="uft-input"
                          placeholder="tu@email.com"
                        />
                      }
                    />
                    <Field
                      label="Ciudad"
                      id="city"
                      error={errors.city?.message}
                      input={
                        <input
                          id="city"
                          {...register("city")}
                          autoComplete="address-level2"
                          className="uft-input"
                          placeholder="¿Dónde quieres abrir?"
                        />
                      }
                    />
                    <Field
                      label="Mensaje"
                      id="message"
                      error={errors.message?.message}
                      input={
                        <textarea
                          id="message"
                          {...register("message")}
                          rows={4}
                          className="uft-input resize-none"
                          placeholder="Cuéntanos un poco sobre ti y tu proyecto."
                        />
                      }
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-fill group inline-flex w-full items-center justify-center gap-2 border border-[var(--uft-yellow)] bg-[var(--uft-yellow)] px-6 py-4 font-mono text-xs font-bold tracking-widest text-[var(--uft-purple-deep)] uppercase disabled:opacity-60"
                      data-cursor="ENVIAR"
                    >
                      <span className="relative z-10">
                        {isSubmitting ? "Enviando…" : "Quiero saber más"}
                      </span>
                      <span className="relative z-10 transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </button>

                    <p className="font-mono text-[10px] tracking-wide text-[var(--uft-cream)]/50">
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
          border-bottom: 1px solid rgba(255,248,231,0.25);
          padding: 0.85rem 0 0.85rem 0;
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--uft-cream);
          outline: none;
          transition: border-color 0.2s ease;
        }
        .uft-input::placeholder { color: rgba(255,248,231,0.35); }
        .uft-input:focus { border-color: var(--uft-yellow); }
      `}</style>
    </section>
  );
}

function Field({
  label,
  id,
  input,
  error,
}: {
  label: string;
  id: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-mono text-[10px] tracking-[0.3em] text-[var(--uft-yellow)] uppercase"
      >
        {label}
      </label>
      {input}
      {error ? (
        <p className="mt-1 font-mono text-[11px] text-[var(--uft-yellow-warm)]">{error}</p>
      ) : null}
    </div>
  );
}
