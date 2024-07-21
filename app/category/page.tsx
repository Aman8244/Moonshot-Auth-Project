"use client"
import Navbar from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from '@/components/ui/button'

interface Categories {
  id: number;
  title: string;
}
interface User {
  id: number;
  name: string;
  categories: Categories[];
}
const Category = () => {
  const router = useRouter();
  const query = useSearchParams();
  const pageNo = query.get("page");
  const [categories, setCategories] = useState<Array<Categories>>();
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
    const fetchData = async () => {
      await axios.get("/api/getUser", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        setUser(res.data.user)
        console.log(res.data.user)
      })
      await axios.get(`/api/categories?page=${pageNo}`).then(res => {
        console.log(res.data)
        setCategories(res.data.categories)
      })

    }
    fetchData();
  }, [])

  const updateCategory = async (target: any, id: number, title: string) => {
    const token = localStorage.getItem("token");
    if (target.checked) {
      await axios.put("/api/categories", {
        id: id,
        title: title,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(prevUser => ({
        ...prevUser!,
        categories: [...(prevUser?.categories || []), { id, title }]
      }));
    }
    else {
      console.log("here")
      await axios.delete(`/api/categories?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(prevUser => ({
        ...prevUser!,
        categories: (prevUser?.categories || []).filter(cat => cat.id !== id)
      }));
    }

  }
  const isChecked = (categoryId: number) => {
    return user?.categories.some(cat => cat.id === categoryId) || false;
  };


  return (
    <main>
      <header>
        <Navbar />
      </header>
      <section>
        <div className='flex flex-row my-2'>
          <div className='w-4/5 md:w-11/12'>
            <h1 className='text-xl font-semibold px-4'>
              Hi {user && user.name} !!
            </h1>
          </div>
          <div>
            <Button onClick={() => {
              localStorage.removeItem("token");
              router.push("/")
            }}>Logout</Button>
          </div>

        </div>
      </section>
      <section>
        <div>
          <div className='flex justify-center items-center'>
            <Card className='md:w-2/6'>
              <CardHeader>
                <CardTitle>
                  Please Mark your interest!
                </CardTitle>
                <CardDescription>
                  We will keep you notified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <div>
                    <p>
                      My saved interests!
                    </p>
                  </div>
                  <div>
                    {categories?.map((el) => {
                      return <div>
                        <div className='flex space-x-3 my-2'>
                          <input type='checkbox' onChange={(e) => updateCategory(e.target, el.id, el.title)} id={`${el.id}`}
                            checked={isChecked(el.id)}
                          />

                          <label htmlFor={`${el.id}`}>{el.title}</label>
                        </div>
                      </div>
                    })}
                  </div>
                  <div>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href={(pageNo !== "1") ? `/category?page=${parseInt(pageNo!) - 1}` : `#`} />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href={(parseInt(pageNo!) !== 1) ? `/category?page=${parseInt(pageNo!) - 1}` : `#`}>{parseInt(pageNo!) - 1}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            {pageNo}
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href={(parseInt(pageNo!) <= 16) ? `/category?page=${parseInt(pageNo!) + 1}` : `#`}>{parseInt(pageNo!) + 1}</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href={(parseInt(pageNo!) <= 16) ? `/category?page=${parseInt(pageNo!) + 1}` : `#`} />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>

                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Category