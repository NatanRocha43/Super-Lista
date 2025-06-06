"use client";

import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

type Toast = {
  message: string;
  type: "success" | "error";
};

export function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Limpa o toast automaticamente após 5 segundos
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  function showToast(message: string, type: Toast["type"]) {
    setToast({ message, type });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);

      showToast(
        "E-mail de redefinição de senha enviado com sucesso! Verifique sua caixa de entrada (ou spam).",
        "success"
      );

      setEmail("");
    } catch (error: unknown) {
      console.error("Erro no envio do e-mail de redefinição:", error);

      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "string"
      ) {
        const err = error as { code: string; message: string };

        switch (err.code) {
          case "auth/user-not-found":
            showToast("E-mail não encontrado. Verifique o endereço digitado.", "error");
            break;
          case "auth/invalid-email":
            showToast("E-mail inválido.", "error");
            break;
          default:
            showToast("Erro ao enviar e-mail: " + err.message, "error");
        }
      } else {
        showToast("Erro desconhecido.", "error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full mx-auto"
      >
        <h1 className="text-center text-3xl font-bold text-[#0d141c]">
          Redefinir senha
        </h1>
        <p className="text-center text-xl text-[#0d141c]">
          Informe seu e-mail para receber o link de redefinição.
        </p>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-14 px-4 border border-[#cedae8] rounded-lg text-[#0d141c] placeholder:text-[#49709c] bg-slate-50"
          required
          disabled={loading}
        />

        <button
          type="submit"
          className="h-10 bg-[#0c77f2] text-white rounded-lg font-bold cursor-pointer disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Enviar link de redefinição"}
        </button>

        <ul className="flex flex-col gap-2 m-auto text-center">
          <li>
            <a
              className="text-center text-sm text-[#49709c] underline cursor-pointer"
              href="/login"
            >
              Login
            </a>
          </li>
        </ul>
      </form>

      {/* Popup / Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-opacity duration-500 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
          role="alert"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      )}
    </>
  );
}
