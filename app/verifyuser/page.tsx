"use client"
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button'
import axios from 'axios'


const VerifyUser = () => {
    const params = useSearchParams()
    const length = params.get("email")?.length;
    const [otpVal, setOtpVal] = useState("");
    const router = useRouter();
    const [warning,setWarning] = useState("");

    useEffect(() => {
        
    }, [])
    
    const ValidateOTP = async()=>{
        console.log(otpVal);
        await axios.post("/api/verifyOtp",{
            email:params.get("email"),
            otp:otpVal
        }).then(res=>{
            console.log(res.data)
            if(res.data.auth){
                router.push("/category?page=1")
            }
            else{
                setWarning("Wrong OTP please try again")
            }
        })
    }


    if(length===undefined){
        return <main>
            <header>
                <Navbar/>
            </header>
            <section>
                <div>
                    Access restricted !!
                </div>
                <div>
                    <Button onClick={()=>router.push("/")}>Go To Home</Button>
                </div>
            </section>
        </main>
    }


    return (
        <main>
            <header>
                <Navbar />
            </header>
            <section>
                <div>
                    <div className='flex justify-center items-center'>
                        <Card className='md:w-2/6 mt-8  border border-gray-400'>
                            <CardHeader className='text-center'>
                                <CardTitle>
                                    <h1 className='mb-4 text-2xl font-semibold'>
                                        Verify your email
                                    </h1>
                                </CardTitle>
                                <CardDescription className='text-black'>
                                    <p>
                                        Enter the 8 digit code you received on
                                    </p>
                                    <p>
                                        {params.get("email")?.slice(0, 3)}{"*****"}
                                        {params.get("email")?.slice(length! - 10,)}
                                    </p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col justify-center items-center'>
                                    <p className='capitalize my-2'>
                                        code
                                    </p>
                                    <div>
                                        <InputOTP value={otpVal}
                                            onChange={(value) => {
                                                setOtpVal(value)
                                                setWarning("")
                                            }} maxLength={8}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                            </InputOTPGroup>
                                            <InputOTPSeparator />
                                            <InputOTPGroup>
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                                <InputOTPSlot index={6} />
                                                <InputOTPSlot index={7} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                </div>
                                <div>
                                    <p className='text-red-700 font-semibold text-center'>
                                        {warning}
                                    </p>
                                </div>
                                <div>
                                    <Button onClick={ValidateOTP} className='w-full my-6'>Verify</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default VerifyUser