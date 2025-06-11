'use client'

export async function fetchIp() {
  const res = await fetch('https://api.ipify.org?format=json')

  if (!res.ok) throw new Error('Erro ao buscar IP')

  return res.json()
}
