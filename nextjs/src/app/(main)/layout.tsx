import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
            <Navbar />
            <main className="w-full flex-1 mx-auto">
                {children}
            </main>
            <Footer />
        </div>
    );
}
