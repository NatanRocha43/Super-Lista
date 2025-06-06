'use client'

import { useState, useEffect } from 'react'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.includes('@')) {
      setError('E-mail inválido. Verifique o endereço digitado.')
      return
    }

    // Simula envio
    setTimeout(() => {
      setShowPopup(true)
      setError('')
      setEmail('')
    }, 1000)
  }

  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(false)
      }, 3000)
      return () => clearTimeout(timeout)
    }
  }, [showPopup])

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full mx-auto mt-10"
      >
        <h1 className="text-center text-3xl font-bold text-[#0d141c]">
          Esqueceu a senha?
        </h1>
        <p className="text-center text-base text-[#0d141c]">
          Insira seu e-mail para receber o link de redefinição.
        </p>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-14 px-4 border border-[#cedae8] rounded-lg text-[#0d141c] placeholder:text-[#49709c] bg-slate-50"
          required
        />

        <button
          type="submit"
          className="h-10 bg-[#0c77f2] text-white rounded-lg font-bold cursor-pointer"
        >
          Enviar link
        </button>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div className="text-center mt-4">
          <a href="/" className="text-sm text-[#49709c] underline">
            Voltar ao login
          </a>
        </div>
      </form>

      {/* Toast Popup */}
      {showPopup && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-out z-50">
          Link de redefinição enviado para seu e-mail!
        </div>
      )}
    </>
  )
}
