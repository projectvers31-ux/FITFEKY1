"use client"

import React, { useState, useEffect } from "react"

import Image from "next/image"

export interface TeamMember {
  id: string | number
  name: string
  role: string
  avatar: string
}

export interface ContactSection {
  id: string | number
  location: string
  address?: string[]
  phone?: string
  email?: string
  linkText?: string
  linkUrl?: string
  info?: string
}

export interface CollectiveMatrixTeamProps {
  members: TeamMember[]
  contacts: ContactSection[]
  projectsTitle?: string
  infoTitle?: string
  logoText?: string
  className?: string
}

export function CollectiveMatrixTeam({
  members,
  contacts,
  projectsTitle = "Projecten",
  infoTitle = "Informatie",
  logoText = "BR",
  className = "",
}: CollectiveMatrixTeamProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredMember, setHoveredMember] = useState<string | number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`min-h-screen w-full bg-white font-sans ${className}`}>
      <div className="flex h-screen w-full flex-col overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 px-5 pt-5 md:px-8 md:pt-6 lg:px-10">
          <div className="flex items-end justify-between">
            <h1
              className="cursor-default text-[32px] font-medium leading-none tracking-tight text-black transition-all duration-700 ease-out hover:tracking-wide md:text-[40px]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-30px)",
              }}
            >
              {projectsTitle}
            </h1>
            <h2
              className="cursor-default text-[32px] font-medium leading-none tracking-tight text-[#4169E1] transition-all duration-700 ease-out hover:tracking-wide md:text-[40px]"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(30px)",
                transitionDelay: "100ms",
              }}
            >
              {infoTitle}
            </h2>
          </div>
          <div
            className="mt-1.5 h-px w-full origin-left bg-black transition-transform duration-700 ease-out md:mt-2"
            style={{
              transform: isVisible ? "scaleX(1)" : "scaleX(0)",
              transitionDelay: "200ms",
            }}
          />
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          {/* Left Column - 73% */}
          <div className="flex w-full flex-col overflow-hidden pl-5 pr-5 pt-2 md:pl-8 md:pr-8 md:pt-2.5 lg:w-[73%] lg:pl-10">
            <div className="grid flex-1 content-start grid-cols-2 gap-x-3 gap-y-3 overflow-y-auto md:grid-cols-4 md:gap-x-4 md:gap-y-4">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="group flex cursor-pointer flex-col"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                    transitionDelay: `${300 + index * 50}ms`,
                  }}
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div
                    className="relative mb-1.5 w-full overflow-hidden bg-gray-100"
                    style={{ aspectRatio: "4/5" }}
                  >
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className={`object-cover transition-all duration-500 ease-out ${
                        hoveredMember === member.id
                          ? "scale-105 grayscale-0"
                          : "grayscale"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-[10px] font-semibold leading-tight transition-colors duration-300 md:text-[11px] ${
                      hoveredMember === member.id ? "text-[#4169E1]" : "text-black"
                    }`}
                  >
                    {member.name}
                  </p>
                  <p
                    className={`mt-0.5 text-[9px] font-normal leading-tight transition-colors duration-300 md:text-[10px] ${
                      hoveredMember === member.id ? "text-gray-600" : "text-black"
                    }`}
                  >
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 27% */}
          <div className="flex h-full w-full flex-col pb-5 pl-5 pr-5 pt-2 md:pb-6 md:pl-8 md:pr-8 md:pt-2.5 lg:w-[27%] lg:pr-10">
            {/* BR Monogram */}
            <div
              className="flex-shrink-0 w-full"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(-20px)",
                transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
                transitionDelay: "400ms",
              }}
            >
              <div
                className="flex w-full cursor-default justify-between leading-none tracking-[-0.02em] text-black"
                style={{
                  fontSize: "clamp(202px, 25vw, 315px)",
                  lineHeight: "0.82",
                  fontWeight: 600,
                }}
              >
                <span className="transition-all duration-300 hover:text-[#4169E1]">
                  {logoText?.[0] || "B"}
                </span>
                <span className="transition-all duration-300 hover:text-[#4169E1]">
                  {logoText?.[1] || "R"}
                </span>
              </div>
            </div>

            <div className="flex-1" />

            {/* Contact Information */}
            <div className="w-full flex-shrink-0">
              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className="group py-1"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(20px)",
                    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                    transitionDelay: `${600 + index * 100}ms`,
                  }}
                >
                  <div className="mb-1 h-px w-full bg-black transition-all duration-300 group-hover:bg-[#4169E1]" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-shrink-0">
                      {contact.linkUrl ? (
                        <a
                          href={contact.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-normal text-black transition-colors duration-300 hover:text-[#4169E1] md:text-[11px]"
                        >
                          {contact.location}
                        </a>
                      ) : (
                        <span className="text-[10px] font-normal text-black transition-colors duration-300 group-hover:text-[#4169E1] md:text-[11px]">
                          {contact.location}
                        </span>
                      )}
                      {contact.address && contact.address.length > 0 && (
                        <div className="mt-0.5">
                          {contact.address.map((line, i) => (
                            <p
                              key={i}
                              className="text-[10px] font-normal leading-snug text-black transition-colors duration-300 group-hover:text-gray-600 md:text-[11px]"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      )}
                      {contact.info && (
                        <p className="mt-0.5 text-[9px] font-normal text-gray-500 md:text-[10px]">
                          {contact.info}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0 text-right">
                      {contact.phone && (
                        <p className="text-[10px] font-normal text-black transition-colors duration-300 group-hover:text-gray-600 md:text-[11px]">
                          {contact.phone}
                        </p>
                      )}
                      {contact.email && (
                        <a
                          href={`mailto:${contact.email}`}
                          className="block text-[10px] font-normal text-black transition-colors duration-300 hover:text-[#4169E1] md:text-[11px]"
                        >
                          {contact.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
