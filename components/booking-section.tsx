"use client"

import React from "react"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
]

const sessionTypes = [
  "Wedding Consultation",
  "Engagement Session",
  "Elopement Planning",
  "Portrait Session",
  "Other Inquiry",
]

export function BookingSection() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [sessionType, setSessionType] = useState<string>()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
      setDate(undefined)
      setTime(undefined)
      setSessionType(undefined)
    }, 3000)
  }

  return (
    <section id="booking" className="py-24 px-6 bg-accent">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-muted-foreground tracking-[0.3em] uppercase text-sm mb-4">
            Schedule a Session
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6">
            Book a Consultation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I would love to hear about your celebration or project. Schedule a consultation
            to discuss your vision and explore how we might work together.
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="bg-card p-8 md:p-12 border border-border">
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Check className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-light text-foreground mb-4">
                Thank You
              </h3>
              <p className="text-muted-foreground">
                Your consultation request has been received. I will be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm tracking-wider uppercase text-muted-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="border-border focus:border-primary bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm tracking-wider uppercase text-muted-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="border-border focus:border-primary bg-background"
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm tracking-wider uppercase text-muted-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="border-border focus:border-primary bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm tracking-wider uppercase text-muted-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-border focus:border-primary bg-background"
                  />
                </div>
              </div>

              {/* Session Type */}
              <div className="space-y-2">
                <Label className="text-sm tracking-wider uppercase text-muted-foreground">
                  Session Type
                </Label>
                <Select value={sessionType} onValueChange={setSessionType}>
                  <SelectTrigger className="border-border focus:border-primary bg-background">
                    <SelectValue placeholder="Select a session type" />
                  </SelectTrigger>
                  <SelectContent>
                    {sessionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Date and Time */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm tracking-wider uppercase text-muted-foreground">
                    Preferred Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-border bg-background",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm tracking-wider uppercase text-muted-foreground">
                    Preferred Time
                  </Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger className="border-border focus:border-primary bg-background">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm tracking-wider uppercase text-muted-foreground">
                  Tell Me About Your Event
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Share your event date, venue, and any details you'd like me to know..."
                  className="border-border focus:border-primary bg-background resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 tracking-widest uppercase text-sm py-6"
              >
                Request Consultation
              </Button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
