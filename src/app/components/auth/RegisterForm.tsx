"use client"

import { useState } from "react"

export function RegisterForm() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.")
      return
    }

    // lógica de cadastro, ex: Firebase Auth
    console.log({ username, email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full mx-auto">
      <h1 className="text-center text-3xl font-bold text-[#0d141c]">Criar conta</h1>
      <p className="text-center text-xl text-[#0d141c]">Preencha os dados abaixo</p>

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
        className="h-10 bg-[#0c77f2] text-white rounded-lg font-bold cursor-pointer"
      >
        Criar conta
      </button>
      <ul className="flex flex-col gap-2 m-auto text-center">
        <li>
          <a className="text-center text-sm text-[#49709c] underline cursor-pointer" href="/login">
            Já possui uma conta?
          </a>
        </li>
      </ul>
    </form>
  )
}
