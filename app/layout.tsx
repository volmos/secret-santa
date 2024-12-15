import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ReactNode} from "react";
import H1 from "@/components/H1";

const monserrat = localFont({
    src: "./fonts/Montserrat-VariableFont_wght.ttf",
    variable: "--font-monserrat",
    weight: "100 900",
});
const yeseva = localFont({
    src: "./fonts/YesevaOne-Regular.ttf",
    variable: "--font-yeseva",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Secret Santa",
    description: "Organiza tu amigo invisible de forma sencilla",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
        <body
            className={`${monserrat.variable} ${yeseva.variable}  font-[family-name:var(--font-monserrat)] antialiased text-primary`}
        >
        <div
            className="max-w-3xl mx-auto min-h-full md:min-h-[calc(100vh-1rem)] bg-[url('/background.svg')] bg-contain flex flex-col md:border-8 border-white md:rounded-3xl shadow-2xl md:my-2 bg-background overflow-hidden">
            <header className="w-full bg-[url('/socks.svg')] bg-no-repeat bg-contain bg-top">
                <H1 className="text-center mt-[46%] mb-4">Amigo invisible</H1>
            </header>
            <div className="px-6 flex-grow flex flex-col">
                {children}
            </div>
            <footer className="w-full bg-[url('/sled.svg')] bg-no-repeat bg-cover bg-top mt-8">
                <div className="text-center uppercase mt-[78%]">Víctor Olmos &copy; {new Date().getFullYear()}</div>
            </footer>
        </div>
        </body>
        </html>
    );
}
