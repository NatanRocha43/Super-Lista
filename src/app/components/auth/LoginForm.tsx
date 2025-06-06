"use client"
import { useState } from "react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // lógica de login, ex: Firebase auth ou API
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full mx-auto">
      <h1 className="text-center text-3xl font-bold text-[#0d141c]">Boas vindas</h1>
      <p className="text-center text-xl text-[#0d141c]">Faça login para continuar</p>

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
        className="h-10 bg-[#0c77f2] text-white rounded-lg font-bold cursor-pointer"
      >
        Login
      </button>
      <ul className="flex flex-col gap-2 m-auto text-center">
        <li>
          <a className="text-center text-sm text-[#49709c] underline cursor-pointer " href="/forgot-password">Esqueceu a senha?</a>
        </li>
        <li>
          <a className="text-center text-sm text-[#49709c] underline cursor-pointer" href="/registration">Ainda não possui uma conta?</a>
        </li>
      </ul>


    </form>
  )
}
