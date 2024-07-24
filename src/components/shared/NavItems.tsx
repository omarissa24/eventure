"use client";

import { organizerHeaderLinks, customerHeaderLinks } from "../../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useUser } from "@clerk/nextjs";

const NavItems = () => {
  const pathname = usePathname();

  const { user } = useUser();

  const headerLinks =
    user?.publicMetadata.role === "organizer"
      ? organizerHeaderLinks
      : customerHeaderLinks;

  return (
    <ul className='md:flex-between flex w-full flex-col items-start gap-5 md:flex-row'>
      {headerLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <li
            key={link.route}
            className={`${
              isActive && "text-primary-500"
            } flex-center p-medium-16 whitespace-nowrap`}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
