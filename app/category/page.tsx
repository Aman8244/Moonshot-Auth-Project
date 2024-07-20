"use client"
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const Category = () => {
  const router = useRouter();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      router.push("/");
    }
  },[])
  return (
    <main>
        <header>
            <Navbar/>
        </header>
        <section>
            Protected Route
            <div>
              <button onClick={()=>{
                localStorage.removeItem("token");
                router.push("/")
              }}>Logout</button>
            </div>
        </section>
    </main>
  )
}

export default Category