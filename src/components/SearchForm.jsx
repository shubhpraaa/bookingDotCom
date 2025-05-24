import React from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import * as z from 'zod'
import { cn } from '@/lib/utils';
import { BedDoubleIcon } from 'lucide-react';
import  {Popover,PopoverContent,PopoverTrigger} from './ui/popover'
import { CalendarIcon } from '@heroicons/react/24/solid';
import {format} from 'date-fns'
import { Calendar } from './ui/calendar';
import { useNavigate } from 'react-router-dom';

export const formSchema = z.object({
    location: z.string().min(2).max(50),
    /*
        TODO: Learn about this refine method.
    */
    dates: z.object({
        from: z.date().optional(),
        to: z.date().optional(),
    })
    .refine(data => data.from && data.to, {
        message: "Please select both a start and end date.",
    })
    .refine(data => {
        if (data.from && data.to) {
            return data.to >= data.from;
        }
        return true;
    }, {
        message: "End date cannot be earlier than start date.",
    }),
    adults:z.coerce.number().min(1,{message:"Please select at least 1 addult",}).max(12,{message:"Max 12 adults Occupancy"}),
    children:z.coerce.number().min(0).max(12,{message:"Max 12 Children Occupancy"}),
    rooms: z.coerce.number().min(1,{
        message:"Please select at least 1 room",
    }),
});

function SearchForm() {
    const navigate = useNavigate()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            location:"",
            dates:{
                from: undefined,
                to:undefined,
            },
            adults:"1",
            children:"0",
            rooms:"1",
        },
    });

    function onSubmit(values){
        console.log(values)
        const checkin_day = values.dates.from.getDate().toString()
        const checkin_month = (values.dates.from.getMonth()+1).toString()
        const checkin_year = values.dates.from.getYear().toString()
        const checkout_day = values.dates.to.getDate().toString()
        const checkout_month = (values.dates.to.getMonth()+1).toString()
        const checkout_year = values.dates.to.getYear().toString()

        const checkin = `${checkin_year}-${checkin_month}-${checkin_day}`
        const checkout = `${checkout_year}-${checkout_month}-${checkout_day}`

        const url = new URL('https://www.booking.com/searchresults.html')
        url.searchParams.set("ss",values.location)
        url.searchParams.set("checkin",checkin)
        url.searchParams.set("checkout",checkout)
        url.searchParams.set("group_adults",values.adults)
        url.searchParams.set("no_rooms",values.rooms)
        url.searchParams.set("group_children",values.children)
        const encodedUrl = encodeURIComponent(url.toString());
        navigate(`/search?url=${encodedUrl}`);
    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg'>
            <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
                <FormField
                control={form.control}
                name="location"
                render={({field})=>(
                    <FormItem>
                        <FormLabel className="text-white flex">Location <BedDoubleIcon className='ml-2 h-4 w-4'/></FormLabel>
                        <FormMessage />
                        <FormControl>
                            <Input placeholder="New Delhi, India" className="bg-white" {...field}/>
                        </FormControl>
                    </FormItem>
                )}
                >

                </FormField>
            </div>
            <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
                <FormField 
                control={form.control}
                name="dates"
                render={({field})=>(
                    <FormItem className="flex flex-col">
                        <FormLabel className="text-white">Dates</FormLabel>
                        <FormMessage />
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                    id="date"
                                    name="dates"
                                    variant={"outline"}
                                    className={cn("w-full lg:w-[300px] justify-start text-left font-normal",!field.value.from && "text-muted-foreground")}
                                    >
                                        <CalendarIcon className='mr-3 h-4 w-4 opacity-50'/>
                                        {
                                            field.value?.from ? (
                                                field.value?.to ?(
                                                    <>
                                                    {format(field.value?.from,"LLL dd, y")} - {" "}
                                                    {format(field.value?.to, "LLL dd, y")}
                                                    </>
                                                ):(
                                                    format(field.value?.from,"LLL dd,y")
                                                )
                                            ):(
                                                <span>Select your dates</span>
                                            )
                                        }
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0" align='start'
                            >
                                <Calendar 
                                    initalFocus
                                    mode='range'
                                    selected={field.value}
                                    defaultMonth={field.value.from}
                                    onSelect={field.onChange}
                                    numberOfMonths={2}
                                    disabled={(date)=>date < new Date(new Date().setHours(0,0,0,0))}
                                />
                            </PopoverContent>
                        </Popover>
                    </FormItem>
                )}>      
                </FormField>
            </div>
            <div className='flex w-full items-center space-x-2'>
                <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
                    <FormField
                    control={form.control}
                    name="adults"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className="text-white">Adults</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input placeholder="Adults" className="bg-white" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                    >

                    </FormField>
                </div>
                <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
                    <FormField
                    control={form.control}
                    name="children"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className="text-white">Children</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input placeholder="Children" className="bg-white" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                    >

                    </FormField>
                </div>
                <div className='grid w-full lg:max-w-sm items-center gap-1.5'>
                    <FormField
                    control={form.control}
                    name="rooms"
                    render={({field})=>(
                        <FormItem>
                            <FormLabel className="text-white">Rooms</FormLabel>
                            <FormMessage />
                            <FormControl>
                                <Input placeholder="Adults" className="bg-white" {...field}/>
                            </FormControl>
                        </FormItem>
                    )}
                    >

                    </FormField>
                </div>
                <div className='mt-auto'>
                    <Button type="submit" className="bg-blue-500 text-base">Search</Button>
                </div>
            </div>
        </form>
    </Form>
  )
}

export default SearchForm