"use client"
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '@/components/ui/button'


const VerifyUser = () => {
    const params = useSearchParams()
    const length = params.get("email")?.length;


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
                                        <InputOTP maxLength={8}>
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
                                    <Button className='w-full my-6'>Verify</Button>
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