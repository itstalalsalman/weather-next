"use client";
import Image from "next/image";
import UnitDropdown from "./UnitDropdown";

export default function Navbar() {
    return (
        <section
            className="w-full flex items-center justify-between mb-5"
        >
            <div
                className="flex items-center space-x-2.5"
            >
                <Image
                    src="/images/Icon.svg"
                    width={40}
                    height={40}
                    alt="Weather Application Icon"
                    priority
                />
                <h1 className="text-xl font-bold text-neutral-0">Nimbus</h1>
            </div>
            <UnitDropdown />
        </section>
    );
}