"use client";

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase"; // ajuste o caminho conforme seu projeto

type Toast = {
  message: string;
  type: "success" | "error";
};

export function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      showToast("As senhas não coincidem.", "error");
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
      }

      showToast("Conta criada com sucesso!", "success");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "string"
      ) {
        const err = error as { code: string; message: string };

        switch (err.code) {
          case "auth/email-already-in-use":
            showToast("Este e-mail já está em uso.", "error");
            break;
          case "auth/invalid-email":
            showToast("E-mail inválido.", "error");
            break;
          case "auth/weak-password":
            showToast("Senha muito fraca. Use no mínimo 6 caracteres.", "error");
            break;
          default:
            showToast("Erro ao criar conta: " + err.message, "error");
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
          Criar conta
        </h1>
        <p className="text-center text-xl text-[#0d141c]">
          Preencha os dados abaixo
        </p>

        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-14 px-4 border border-[#cedae8] rounded-lg text-[#0d141c] placeholder:text-[#49709c] bg-slate-50"
          required
        />
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-14 px-4 border border-[#cedae8] rounded-lg text-[#0d141c] placeholder:text-[#49709c] bg-slate-50"
          required
        />
        <input
          type="password"
          placeholder="Crie uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-14 px-4 border border-[#cedae8] rounded-lg text-[#0d141c] placeholder:text-[#49709c] bg-slate-50"
          required
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="h-14 px-4 border border-[#cedae8] rounded-lg text-[#0d141c] placeholder:text-[#49709c] bg-slate-50"
          required
        />

        <button
          type="submit"
          className="h-10 bg-[#0c77f2] text-white rounded-lg font-bold cursor-pointer disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Criando conta..." : "Criar conta"}
        </button>

        <ul className="flex flex-col gap-2 m-auto text-center">
          <li>
            <a
              className="text-center text-sm text-[#49709c] underline cursor-pointer"
              href="/login"
            >
              Já possui uma conta?
            </a>
          </li>
        </ul>
      </form>

      {/* Popup / Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-opacity duration-500 ${
            toast.type === "success"
              ? "bg-green-600"
              : "bg-red-600"
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
