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
        <html lang="en">
        <body
            className={`${monserrat.variable} ${yeseva.variable}  font-[family-name:var(--font-monserrat)] antialiased text-primary`}
        >
        <div className="max-w-2xl mx-auto h-screen flex flex-col">
            <div className="w-full aspect-video bg-[url('/socks.svg')] bg-no-repeat bg-cover"></div>
            <div className="px-6 flex-grow flex flex-col">
                <H1 className="text-center mb-4">Amigo invisible</H1>
                {children}
            </div>
            <footer className="text-center p-8 text-xs">
                Víctor Olmos &copy; {new Date().getFullYear()}
            </footer>
        </div>
        </body>
        </html>
    );
}
