"use client";

import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type Toast = {
  message: string;
  type: "success" | "error";
};

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const router = useRouter();

  // Limpa o toast automaticamente após 5 segundos
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Checa se o usuário já está logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/dashboard"); // redireciona automaticamente
      }
    });

    return () => unsubscribe();
  }, [router]);

  function showToast(message: string, type: Toast["type"]) {
    setToast({ message, type });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Login realizado com sucesso!", "success");
      router.push("/dashboard");
    } catch (error: unknown) {
      setLoading(false);
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as { code: unknown }).code === "string"
      ) {
        const err = error as { code: string };

        switch (err.code) {
          case "auth/user-not-found":
            showToast("Usuário não encontrado.", "error");
            break;
          case "auth/wrong-password":
            showToast("Senha incorreta.", "error");
            break;
          case "auth/invalid-email":
            showToast("E-mail inválido.", "error");
            break;
          default:
            showToast("Erro ao fazer login.", "error");
        }
      } else {
        showToast("Erro desconhecido.", "error");
      }
    }
  }

  return (
    <>
      {/* Toast popup no topo do formulário */}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-md text-white font-semibold shadow-lg transition-opacity duration-500 z-50 ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
          role="alert"
          aria-live="assertive"
        >
          {toast.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full mx-auto mt-20"
      >
        <h1 className="text-center text-3xl font-bold text-[#0d141c]">
          Boas vindas
        </h1>
        <p className="text-center text-xl text-[#0d141c]">
          Faça login para continuar
        </p>

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
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-14 px-4 border border-[#cedae8] rounded-lg text-[#0d141c] placeholder:text-[#49709c] bg-slate-50"
          required
        />
        <button
          type="submit"
          className="h-10 bg-[#0c77f2] text-white rounded-lg font-bold cursor-pointer disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Login"}
        </button>

        <ul className="flex flex-col gap-2 m-auto text-center">
          <li>
            <a
              className="text-center text-sm text-[#49709c] underline cursor-pointer"
              href="/forgot-password"
            >
              Esqueceu a senha?
            </a>
          </li>
          <li>
            <a
              className="text-center text-sm text-[#49709c] underline cursor-pointer"
              href="/registration"
            >
              Ainda não possui uma conta?
            </a>
          </li>
        </ul>
      </form>
    </>
  );
}
